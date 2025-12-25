// 1. Select Elements
const tabHeaders = document.getElementById('tab-headers');
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
const tabsContainer = document.getElementById('tabs-container');

/**
 * Core Logic to Switch Tabs
 * @param {string} tabId - The data-tab value to activate
 */
function switchToTab(tabId) {
  // a. Remove active class from all buttons and contents
  tabs.forEach((tab) => tab.classList.remove('active'));
  contents.forEach((content) => content.classList.remove('active'));

  // b. Add active class to the selected tab button and content
  const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const activeContent = document.querySelector(`.content[data-tab="${tabId}"]`);

  if (activeTab && activeContent) {
    activeTab.classList.add('active');
    activeContent.classList.add('active');

    // c. Custom Event Broadcasting
    const tabName = activeTab.textContent;
    const changeEvent = new CustomEvent('tabChanged', {
      detail: { tabId, tabName },
    });
    tabsContainer.dispatchEvent(changeEvent);
  }
}

// 2. Event Delegation for Tab Clicks
tabHeaders.addEventListener('click', (e) => {
  // Only trigger if a button with class 'tab' was clicked
  const clickedTab = e.target.closest('.tab');

  if (clickedTab) {
    // Advanced Control: stopPropagation()
    // Prevents the click from bubbling further up to document if needed
    e.stopPropagation();

    const tabId = clickedTab.getAttribute('data-tab');
    switchToTab(tabId);
  }
});

// 3. Keyboard Shortcuts (1, 2, 3)
document.addEventListener('keydown', (e) => {
  const keyMap = {
    1: '1',
    2: '2',
    3: '3',
  };

  if (keyMap[e.key]) {
    switchToTab(keyMap[e.key]);
  }
});

// 4. Custom Event Listener (Logging the broadcast)
tabsContainer.addEventListener('tabChanged', (e) => {
  console.log(`📡 Broadcast: Tab changed to ${e.detail.tabName} (ID: ${e.detail.tabId})`);
});
