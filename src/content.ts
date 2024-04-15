// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "seekToTimestamp") {
    const timestamp = message.timestamp
    seekToTimestamp(timestamp)
  }
})

const seekToTimestamp = (timestamp: number) => {
  const player = document.querySelector("video")
  if (player) {
    player.currentTime = timestamp
  }
}
