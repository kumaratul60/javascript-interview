import { loadTodosFromDB, saveTodosToDB } from './indexedDB.js';

/* ---------- DOM ---------- */
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const filters = document.querySelector('.filters');
const clearBtn = document.getElementById('clear-completed');

/* ---------- State ---------- */
let todos = [];
let filter = 'all';

/* ---------- Utils ---------- */
function escapeHTML(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[m])
  );
}

function formatTime(ts) {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

/* ---------- Filters ---------- */
function getFilteredTodos() {
  if (filter === 'active') return todos.filter((t) => !t.completed);
  if (filter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

/* ---------- Persistence ---------- */
async function init() {
  todos = await loadTodosFromDB();
  render();
}

async function saveAndRender() {
  await saveTodosToDB(todos);
  render();
}

/* ---------- Render ---------- */
function render() {
  list.innerHTML = '';

  getFilteredTodos().forEach((todo) => {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.className = todo.completed ? 'completed' : '';

    li.innerHTML = `
      <div class="todo-main">
        <span class="todo-text">${escapeHTML(todo.text)}</span>
        <small class="todo-time">${formatTime(todo.createdAt)}</small>
      </div>
      <div class="todo-actions">
        <button class="done-btn">Done</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    list.appendChild(li);
  });
}

/* ---------- Add Todo ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  input.value = '';
  saveAndRender();
});

/* ---------- List Actions ---------- */
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.matches('.done-btn')) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    todo.completed = true;
    saveAndRender();
    return;
  }

  if (e.target.matches('.remove-btn')) {
    todos = todos.filter((t) => t.id !== id);
    saveAndRender();
  }
});

/* ---------- Filters ---------- */
filters.addEventListener('click', (e) => {
  if (!e.target.dataset.filter) return;

  filter = e.target.dataset.filter;
  [...filters.children].forEach((btn) => btn.classList.toggle('active', btn === e.target));

  render();
});

/* ---------- Clear Completed ---------- */
clearBtn.addEventListener('click', () => {
  todos = todos.filter((t) => !t.completed);
  saveAndRender();
});

/* ---------- Init ---------- */
init();
