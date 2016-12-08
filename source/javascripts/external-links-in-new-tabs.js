(function(document) {
  function makeExternalLinksOpenInNewTabPleaseThanks() {
    for(var links = document.getElementsByTagName("a"), i = 0; i < links.length; i++) {
      var link = links[i];

      if(link.getAttribute("href") && link.hostname !== location.hostname) {
        link.target = "_blank";
      }
    }
  }

  makeExternalLinksOpenInNewTabPleaseThanks();
})(document);