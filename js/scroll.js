var myApp = new Framework7(); 
 
var $$ = Dom7;
 
// Loading flag
var loading = false;
 
// Last loaded index
var lastIndex = $$('.list-block ul.features_list_detailed li').length;
 
// Max items to load
var maxItems = 60;
 
// Append items per load
var itemsPerLoad = 20;
 
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
 
  // Exit, if loading in progress
  if (loading) return;
 
  // Set loading flag
  loading = true;
 
  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }
 
    // Generate new items HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html += '<li> ' + i + '</li>';
    }
 
    // Append new items
    $$('.list-block ulul.features_list_detailed ').append(html);
 
    // Update last loaded index
    lastIndex = $$('.list-block ul.features_list_detailed  li').length;
  }, 1000);
});