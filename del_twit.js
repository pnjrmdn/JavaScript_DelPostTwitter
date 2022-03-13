// This is a hack, a quick and dirty console script for RT/tweets (with replies) removal w/o API
// To be used in: https://twitter.com/Username/with_replies
// Set your username (without @) below (case-sensitive) to correctly trigger the right Menu
const tweetUser = 'Username'

// BUG, With above we still trigger Menu on some replies but relatively harmless.

// @Hack Implement simple has() for querySelector
const querySelectorHas = function( parent, child ){
  return [].filter.call( document.querySelectorAll( parent ), function( elem ){
    if(elem.querySelector( child ) !== null ) {
      return true        
    }
    else {
      return false
    }
  });
}

// @Hack Implement xpath text() selector returning matching holder element
// equiv XPath //find[text()='inner']
const querySelectorInner = function( parent, inner ){
  return [].filter.call( document.querySelectorAll( parent ), function( elem ){
    if(elem.innerHTML == inner ) {
      return true
    }
    else {
      return false
    }
  });
}


setInterval(() => {

  console.log('--- Twitter Removal Clicks Round')

  // For Old RT's may need (?) to RT and then Unretweet - Just watch for the UI rate limits
  var unretweets = 0
  for (const d of document.querySelectorAll('div[data-testid="unretweet"]')) {
    unretweets++
    d.click()
  }
  var unretweetconfirms = 0
  for (const r of document.querySelectorAll('div[data-testid="unretweetConfirm"]')) {
    unretweetconfirms++
    r.click()
  }
  console.log('Unretweets: ' + unretweets + ', Confirms: ' + unretweetconfirms)

  var clicks = 0
  for(const d of querySelectorHas("div[data-testid='tweet']", "a[href='/" + tweetUser + "']")) {
   const moreButton = d.querySelector("div[aria-label='More']")
   clicks++
   moreButton.click()
  }
  var clickDeletes = 0
  for(const deleteButton of querySelectorInner("span", 'Delete')) {
    deleteButton.click()
    clickDeletes++
  }
  var clickConfirms = 0
  for(const deleteConfirm of document.querySelectorAll("div[data-testid='confirmationSheetConfirm']")) {
    deleteConfirm.click()
    clickConfirms++
  }
  console.log('Menu: ' + clicks + ', Deletes: ' + clickDeletes + ', Confirms: ' + clickConfirms)

  // Scrolling is more involved/difficult as twitter does not hide rest of the thread if reply deleted
  // As work-around scroll yourself when removals hit zero. API would be best option but this solution is WEB UI driven.
  window.scrollTo(0, document.body.scrollHeight)

}, 3000) // Run every 3s
