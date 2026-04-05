/**
 * Nested Checkbox Logic - Expert Edition
 *
 * --- INTERVIEW DEEP DIVE: KEY CONCEPTS USED ---
 *
 * 1. DOMContentLoaded vs window.onload:
 *    - DOMContentLoaded: Fires when the HTML is fully parsed and the DOM tree is built.
 *      It does NOT wait for images, scripts, or subframes. This is the best time to init UI.
 *    - onload: Waits for EVERYTHING (images, CSS, etc.) to finish. Too slow for UI logic.
 *
 * 2. The 'this' Keyword in Event Listeners:
 *    - Regular Function: treeRoot.addEventListener('change', function(e) { ... })
 *      Inside here, 'this' would refer to treeRoot (the element the listener is ATTACHED to).
 *    - Arrow Function: treeRoot.addEventListener('change', (e) => { ... })
 *      Inside here, 'this' is lexically scoped (it refers to the outer 'window' object).
 *    - WHY e.target? e.target refers to the ACTUAL element that was clicked (the checkbox),
 *      which is what we need for Event Delegation.
 */

const treeRoot = document.getElementById('checkbox-tree');
const btnGet = document.getElementById('get-selected');
const btnReset = document.getElementById('reset-tree');

// --- 1. Event Delegation (Main Logic) ---
treeRoot.addEventListener('change', (e) => {
  // We use e.target because 'this' in an arrow function refers to 'window'
  if (e.target.type !== 'checkbox') return;

  // Step A: Downwards (Check/uncheck all children)
  toggleChildren(e.target);

  // Step B: Upwards (Recalculate parent states)
  updateParents(e.target);
});

// --- 2. Downward Sync: Parent -> Children ---
function toggleChildren(parent) {
  const parentLi = parent.closest('li');

  /**
   * SELECTOR BREAKDOWN:
   * 'ul input[type="checkbox"]' -> Find all checkboxes inside nested lists
   * ':not(:disabled)'          -> EXCLUDE those that the user cannot interact with
   */
  const children = parentLi.querySelectorAll('ul input[type="checkbox"]:not(:disabled)');

  children.forEach((child) => {
    child.checked = parent.checked;
    child.indeterminate = false; // Reset indeterminate if explicitly checked/unchecked
  });
}

// --- 3. Upward Sync: Child -> Parent ---
function updateParents(child) {
  const parentUl = child.closest('ul');
  if (!parentUl || parentUl.classList.contains('tree-root')) return;

  const parentLi = parentUl.closest('li');
  const parentCheckbox = parentLi.querySelector('input[type="checkbox"]');

  /**
   * SELECTOR BREAKDOWN:
   * ':scope'       -> Start searching exactly from 'parentUl' (not the whole document)
   * '> li > input' -> Only pick the immediate children checkboxes at this specific level
   * Array.from     -> Convert NodeList to Array so we can use .every(), .some(), etc.
   */
  const siblings = Array.from(parentUl.querySelectorAll(':scope > li > input[type="checkbox"]'));

  const total = siblings.length;
  const checkedCount = siblings.filter((s) => s.checked).length;
  const isSomeIndeterminate = siblings.some((s) => s.indeterminate);

  if (checkedCount === total) {
    // ALL checked
    parentCheckbox.checked = true;
    parentCheckbox.indeterminate = false;
  } else if (checkedCount > 0 || isSomeIndeterminate) {
    // SOME checked (Indeterminate state)
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = true;
  } else {
    // NONE checked
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = false;
  }

  // Recursively move up to the root
  updateParents(parentCheckbox);
}

// --- 4. Get Selected Leaves (Interview Question!) ---
/**
 * Leaf nodes are checkboxes that DO NOT have a nested <ul> sibling.
 */
function getSelectedLeaves() {
  /**
   * SELECTOR BREAKDOWN:
   * ':checked'        -> Only those that are active
   * ':not(:disabled)' -> Exclude system-disabled items
   */
  const allChecked = Array.from(treeRoot.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)'));

  const leaves = allChecked.filter((cb) => {
    const parentLi = cb.closest('li');
    return !parentLi.querySelector('ul'); // It's a leaf if it has no child list
  });

  const values = leaves.map((l) => l.id); // Or use l.value
  console.log('Selected Leaves:', values);
  alert('Selected: ' + (values.join(', ') || 'None'));
}

// --- 5. Initial Sync on Page Load ---
// This handles cases where the HTML might already have checkboxes checked.
function initSync() {
  /**
   * SELECTOR BREAKDOWN:
   * 'li:not(:has(ul))' -> Find <li> elements that do NOT contain a nested <ul> (these are the 'leaves')
   * 'input'            -> Get the checkbox inside those leaf-level items
   */
  const allLeaves = Array.from(treeRoot.querySelectorAll('li:not(:has(ul)) input[type="checkbox"]'));
  allLeaves.forEach((leaf) => {
    if (leaf.checked) updateParents(leaf);
  });
}

// --- Button Listeners ---
btnGet.addEventListener('click', getSelectedLeaves);
btnReset.addEventListener('click', () => {
  // Basic selector to grab EVERY checkbox in the tree for a full reset
  treeRoot.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
    cb.indeterminate = false;
  });
  console.clear();
});

// Run initial sync when the DOM is ready
document.addEventListener('DOMContentLoaded', initSync);
