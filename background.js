chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "getAnswers",
    title: "Get Answers",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "toggleAnswers",
    title: "Show/Hide Answers",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "eraseAnswers",
    title: "Erase Answers",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, { action: info.menuItemId });
});

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: command });
  });
});