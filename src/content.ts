// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "seekToTimestamp") {
    const timestamp = message.timestamp
    seekToTimestamp(timestamp)
  }
})

function seekToTimestamp(timestamp: number) {
  console.log("called function")
  //   const timeArray = timestamp.split(/h|m|s/).filter(Boolean)

  //   const totalSeconds = timeArray.reduce((acc, value, index) => {
  //     const multiplier = [3600, 60, 1][index]
  //     return acc + parseInt(value) * multiplier
  //   }, 0)

  const player = document.querySelector("video")
  if (player) {
    player.currentTime = timestamp
  }
}
