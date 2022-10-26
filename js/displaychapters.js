/* 
JS has to be loaded before the HTML to work. Put it in the <head> of your website.

This is a rewrite of the tutorials found here:
http://thenewcode.com/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters
https://hacks.mozilla.org/2014/08/building-interactive-html5-videos/

They work mostly, but I needed a solution that worked on all videos on my site and for multiple videos on the same page.

Now we activate the displayChapters function when the chapters track is loaded for each video.
I've rewritten the code so it should work better for multiple videos with chapters on the same page.

Everything is relative to the current video track.
*/

function displayChapters(trackElement){
    if ((trackElement) && (textTrack = trackElement.track)){
        if (textTrack.kind === "chapters"){
            textTrack.mode = 'hidden';
            for (var i = 0; i < textTrack.cues.length; ++i) {
              // we've made sure we have a good, loaded chapters file, now we build out the chapters into HTML
              locationList = trackElement.closest('figure').querySelector(".chapters"),
              video = trackElement.closest("video");
              console.dir(locationList);
                cue = textTrack.cues[i],
                chapterName = cue.text,
                start = cue.startTime,
                newLocale = document.createElement("li");
                var location =  document.createElement("a");
        location.setAttribute('rel', start);
        location.setAttribute('id', start);
        location.setAttribute('tabindex', '0');
        //the next line converts the plaintext from the chapter file into HTML
                var localeDescription = stringToHTML(chapterName);
                location.innerHTML = localeDescription;
                newLocale.appendChild(location);
                locationList.appendChild(newLocale);
                location.addEventListener("click",
                function() {
                    this.closest('figure').querySelector("video").currentTime = this.id;
                },false);
            }
          textTrack.addEventListener("cuechange",function() {
              //fire this whenever the user changes chapters
                var currentLocation  = this.activeCues[0].startTime,
                    cueMatch         = this.activeCues[0].text,
                    matchingCueArray = document.querySelectorAll('[rel="'+currentLocation+'"]');
                    
                //.dataset.uuid
                
                console.log(cueMatch);
                console.dir(matchingCueArray.length);
                for (var i = 0; i < matchingCueArray.length; ++i) {
                    console.log("you loop me right round baby "+i);
                    thisChapter = matchingCueArray[i];
                    if (thisChapter.innerHTML == cueMatch){
                      console.log("winner winner chicken dinner");
                      console.log(thisChapter);
                      
                      if (chapter = thisChapter) {
                  
                        //get the chapter LI elements based on the currentLocation, it's not perfect,
                        // but I doubt a lot of chapters will have the same timecodes
                        
                            var locations = [].slice.call(chapter.closest('figure').querySelectorAll("figcaption .chapters li"));
                            //chapter = element.querySelector("figcaption").querySelector(".chapters").querySelector("currentli").querySelector("a");
                            var counter = 0; //counter is for detecting the current item.
                            for (var z = 0; z < locations.length; ++z) {
                              //remove current classes from all items to refresh the display.
                                locations[z].classList.remove("currentli");
                                locations[z].querySelector('a').classList.remove("current");
                            }
                            //add current classes to active item
                            chapter.parentNode.classList.add("currentli"); 
                            chapter.classList.add("current");
                            
                            for (var x = 0; x < locations.length; ++x) {
                              if (locations[x].classList.contains("currentli")){
                                counter++; //iterate counter when active chapter is reached
                              }
                              if (counter < 1){
                                  //add watched class to everything before the current chapter to show progress
                                  locations[x].classList.add("watched"); 
                              } else {
                                //remove watched on all other items
                                locations[x].classList.remove("watched");
                              }
                            }
                          
                          //locationList.style.top = "-"+chapter.parentNode.offsetTop+"px"; 
                          /* this doesn't enable the scrollbar when it starts moving the list upward It mostly does the right thing by 
                          putting the current chapter at the top of the chapter container, but without a scroll bar to pull everything 
                          back down, it's useless and I didn't need it for this project.*/
                          
                          //chapter.scrollIntoView(); 
                          // This moves the whole window to the link. totally useless
                      }
                      
                    }
                }
                
                // DO A FOR LOOP TO COMPARE THE MATCHING ELEMENTS AGAINST THEIR TEXT and then target the one that matches.
                
                
            },false);
            
        }
    }
}
/* Bad practice, but my client wanted to include HTML in their Chapters files with <small> tags. 
So we need to interpret the chapter content from plain text to HTML
the file looks like this:
WEBVTT

1
00:00:00.000 --> 00:00:39.824
Welcome

2
00:00:39.825 --> 00:03:31.441
Logging in and Account Creation <small>This also includes resetting your password</small>

*/

var support = (function () {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    } catch(err) {
        return false;
    }
    return true;
})();
var stringToHTML= function (str) {
    // check for DOMParser support
    if (support) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.innerHTML;
    }
    // Otherwise, create div and append HTML
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
};

