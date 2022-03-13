// Go to: https://twitter.com/{username}/likes
//Open the console and run the following JavaScript code:

setInterval(() => {
  for (const d of document.querySelectorAll('div[data-testid="unlike"]')) {
    d.click()
  }
  window.scrollTo(0, document.body.scrollHeight)
}, 1000)
