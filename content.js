window.onload = () => {
  console.log('%cTTV-Reloader [ ' + '%clooking for errors' + '%c ]', 'color: #00b4eb', 'color: white', 'color: #00b4eb');
  setInterval(async () => {
    const errorMsg = document.querySelectorAll('.video-player p[data-test-selector="content-overlay-gate__text"]')

    if (!errorMsg.length > 0) {
      const timestamp = document.querySelector('.video-player p[data-a-target="player-seekbar-current-time"]').textContent
      console.log(timestamp);
      while (!timestamp) {
        document.querySelector('.video-player p[data-a-target="player-seekbar-current-time"]').textContent
      }
      await chrome.runtime.sendMessage({ url: window.location.href, timestamp: timestamp })
    }

    let reloaded = await chrome.runtime.sendMessage({ state: 'request' })

    if (reloaded && !(errorMsg.length > 0)) {
      await chrome.runtime.sendMessage({ state: 'disable' })
      reloaded = false;
      setTimeout(() => {
        const theatreBtn = document.querySelector('.video-player button[data-a-target="player-theatre-mode-button"]')
        theatreBtn.click()
      }, 5000)
    }

    if (errorMsg.length > 0) {
      if (errorMsg[0].outerHTML.match(/(#[0-9]000)/)) {
        console.log('%cTTV-Reloader [ ' + '%cerror detected' + '%c ]', 'color: #00b4eb', 'color: white', 'color: #00b4eb');
        await hrome.runtime.sendMessage({ text: 'reload', state: 'enable' })
      }
    }
  }, 5000)
}