let reloaded = false;
let url = '';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.state === 'request') {
    sendResponse(reloaded)
  } else if (msg.state === 'disable') {
    reloaded = false;
  } else if (msg.state === 'enable') {
    reloaded = true;
  }

  if (msg.url) url = msg.url + '?t=';
  if (msg.timestamp !== '00:00:00') {
    let temp = msg.timestamp.replace(/:/, 'h').replace(/:/, 'm') + 's'
    console.log(temp);
    url += temp
    sendResponse(url)
  }

  if (msg.text === 'reload') {
    console.log('attempting reload');
    if (url !== '') {
      chrome.tabs.update(sender.tab.id, { url: url })
    } else {
      chrome.tabs.reload(sender.tab.id)
    }
  }
})