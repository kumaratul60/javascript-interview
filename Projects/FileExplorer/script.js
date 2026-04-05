/**
 * File Explorer Tree - Professional Architect Edition
 *
 * --- EXPERT GRIND POINTS ADDED ---
 * 1. PERSISTENCE: Data is loaded from/saved to LocalStorage.
 * 2. SEARCH: Search function that recursively finds nodes and AUTO-EXPANDS parents to show them.
 * 3. IMMUTABILITY (Sort of): Data is always rendered from the latest `fileData`.
 * 4. ERROR PREVENTION: Prevents duplicate names in the same folder.
 */

/**
  1. Performance: The "Re-render" Problem
  The Grind: "Every time I add a file, you call renderTree(fileData). If I have 5,000 files, you are destroying 5,000 DOM nodes and recreating them. How do you fix
  this?"
   * The Answer: Use Partial Updates. Instead of re-rendering the whole tree, only render the node-children div of the parent that changed. Or, use a Virtual DOM
     approach (like React) where only the difference is applied.

  2. Search & Filtering
  The Grind: "How would you find a file named 'App.js' if it is buried 10 folders deep?"
   * The Answer: You need a Flattening Algorithm or a Recursive Search. For performance, you could maintain a "Flat Map" of id -> node so searching is $O(1)$
     instead of $O(N)$.

  3. Persistence (The "Refresh" Test)
  The Grind: "If I refresh the page, my new files are gone. How do you keep them?"
   * The Answer: Integrate localStorage. Load the tree from storage on DOMContentLoaded and save it every time fileData changes.

  4. Accessibility (a11y)
  The Grind: "Can a user navigate this tree using only a keyboard?"
   * The Answer: You need to add tabindex="0", role="tree", and role="treeitem", and listen for keydown (ArrowUp, ArrowDown, Enter).
 */

// 1. Initial Data (Fallback if LocalStorage is empty)
const DEFAULT_DATA = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      { id: '2', name: 'index.js', type: 'file' },
      { id: '3', name: 'styles.css', type: 'file' },
      {
        id: '4',
        name: 'components',
        type: 'folder',
        isOpen: false,
        children: [{ id: '5', name: 'App.js', type: 'file' }],
      },
    ],
  },
  { id: '6', name: 'package.json', type: 'file' },
];

// Load from LocalStorage or use Default
let fileData = JSON.parse(localStorage.getItem('explorer_data')) || DEFAULT_DATA;

const treeContainer = document.getElementById('file-tree');
const searchInput = document.getElementById('tree-search');
let draggedId = null;

// Save to LocalStorage helper
const saveState = () => localStorage.setItem('explorer_data', JSON.stringify(fileData));

// --- 2. Rendering Engine (Recursive) ---
function renderTree(data, container, searchTerm = '') {
  container.innerHTML = '';

  if (data.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'folder-empty';
    empty.textContent = 'Empty';
    container.appendChild(empty);
    return;
  }

  data.forEach((node) => {
    // --- 2.1 Search Highlighting & Auto-Expand Logic ---
    const matchesSearch = searchTerm && node.name.toLowerCase().includes(searchTerm.toLowerCase());

    const nodeDiv = document.createElement('div');
    nodeDiv.className = `tree-node ${matchesSearch ? 'search-match' : ''}`;
    nodeDiv.dataset.id = node.id;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'node-content';
    contentDiv.draggable = true;

    const icon = node.type === 'folder' ? (node.isOpen ? '📂' : '📁') : '📄';
    contentDiv.innerHTML = `
            <span class="node-icon">${icon}</span>
            <span class="node-name" style="${matchesSearch ? 'color: #0078d4; font-weight: bold;' : ''}">${node.name}</span>
            <div class="node-actions">
                ${node.type === 'folder' ? `<button onclick="handleAdd('${node.id}', 'folder')" title="Add Folder">📁+</button>` : ''}
                ${node.type === 'folder' ? `<button onclick="handleAdd('${node.id}', 'file')" title="Add File">📄+</button>` : ''}
                <button class="rename" onclick="handleRename('${node.id}')" title="Rename">✏️</button>
                <button class="delete" onclick="handleDelete('${node.id}')" title="Delete">🗑️</button>
            </div>
        `;

    if (node.type === 'folder') {
      contentDiv.onclick = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        node.isOpen = !node.isOpen;
        saveState();
        renderTree(fileData, treeContainer, searchInput.value);
      };
    }

    // --- 3. Drag and Drop Handlers ---
    contentDiv.ondragstart = (e) => {
      draggedId = node.id;
      e.dataTransfer.setData('text/plain', node.id);
      contentDiv.style.opacity = '0.4';
    };
    contentDiv.ondragend = () => (contentDiv.style.opacity = '1');
    contentDiv.ondragover = (e) => {
      e.preventDefault();
      if (node.type === 'folder') contentDiv.classList.add('drag-over');
    };
    contentDiv.ondragleave = () => contentDiv.classList.remove('drag-over');
    contentDiv.ondrop = (e) => {
      e.preventDefault();
      contentDiv.classList.remove('drag-over');
      if (node.type === 'folder' && draggedId !== node.id) moveNode(draggedId, node.id);
    };

    nodeDiv.appendChild(contentDiv);

    if (node.type === 'folder' && node.isOpen) {
      const childrenDiv = document.createElement('div');
      childrenDiv.className = 'node-children';
      renderTree(node.children, childrenDiv, searchTerm);
      nodeDiv.appendChild(childrenDiv);
    }

    container.appendChild(nodeDiv);
  });
}

// --- 4. Search Implementation ---
searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  if (term) expandToMatches(fileData, term);
  renderTree(fileData, treeContainer, term);
});

// Auto-expand logic: If a child matches the search, open the parent.
function expandToMatches(data, term) {
  let foundInThisBranch = false;
  for (let node of data) {
    if (node.type === 'folder') {
      const foundInChildren = expandToMatches(node.children, term);
      if (foundInChildren) {
        node.isOpen = true;
        foundInThisBranch = true;
      }
    }
    if (node.name.toLowerCase().includes(term)) {
      foundInThisBranch = true;
    }
  }
  return foundInThisBranch;
}

// --- 5. Logic Handlers ---

function handleAdd(parentId, type) {
  const name = prompt(`Enter ${type} name:`);
  if (!name) return;

  // Check for duplicates in the current folder
  const targetArray = parentId === 'root' ? fileData : findNode(fileData, parentId).children;
  if (targetArray.some((n) => n.name === name)) {
    alert('A file/folder with that name already exists in this folder.');
    return;
  }

  const newNode = { id: Date.now().toString(), name, type, isOpen: true, children: [] };
  if (parentId === 'root') fileData.push(newNode);
  else findNode(fileData, parentId).children.push(newNode);

  saveState();
  renderTree(fileData, treeContainer, searchInput.value);
}

function handleDelete(id) {
  if (!confirm('Are you sure?')) return;
  fileData = removeNode(fileData, id);
  saveState();
  renderTree(fileData, treeContainer, searchInput.value);
}

function handleRename(id) {
  const node = findNode(fileData, id);
  const newName = prompt('Rename to:', node.name);
  if (newName) {
    node.name = newName;
    saveState();
    renderTree(fileData, treeContainer, searchInput.value);
  }
}

// --- Helper Functions ---
function findNode(data, id) {
  for (let node of data) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function removeNode(data, id) {
  return data.filter((node) => {
    if (node.id === id) return false;
    if (node.children) node.children = removeNode(node.children, id);
    return true;
  });
}

function moveNode(sourceId, targetId) {
  const nodeToMove = findNode(fileData, sourceId);
  if (isDescendant(nodeToMove, targetId)) return alert('Infinite Loop detected!');

  fileData = removeNode(fileData, sourceId);
  findNode(fileData, targetId).children.push(nodeToMove);
  saveState();
  renderTree(fileData, treeContainer, searchInput.value);
}

function isDescendant(parent, childId) {
  if (!parent.children) return false;
  for (let child of parent.children) {
    if (child.id === childId || isDescendant(child, childId)) return true;
  }
  return false;
}

// Final Entry Point
document.addEventListener('DOMContentLoaded', () => {
  renderTree(fileData, treeContainer);
});
