chrome.tabs.onUpdated.addListener(function(id, changes, tab) {
  console.log( changes )
  if ( ! changes.url || changes.url === '' || changes.url === 'chrome://newtab/' ) {
    return;
  }

  var tabs = chrome.tabs.query({
    url: changes.url,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  }, function( tabs ) {
    if ( tabs.length && tabs[0].id !== id ) {
      chrome.tabs.remove( id );
      chrome.tabs.update( tabs[0].id, { active: true } );
    }
  });
});
