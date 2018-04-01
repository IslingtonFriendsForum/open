var node = "szyt-player";  var youtube = document.createElement('script');  youtube.src = "https://www.youtube.com/iframe_api"; youtube.type = "text/javascript";  
var firstScriptTag = document.getElementsByTagName('script')[0];  firstScriptTag.parentNode.insertBefore(youtube, firstScriptTag);  
var player;  var params = document.getElementById(node); // Read all the parameter of the DIV tag
var startTime = params.getAttribute("startTime");  var endTime = params.getAttribute("endTime");  var videoID = params.getAttribute("videoID");  
var playerHeight = params.getAttribute("height");  var playerWidth = params.getAttribute("width");
// Prepare YouTube Player.Set rel=0 and showinfo=1 to hide related videos & info bar
function onYouTubeIframeAPIReady() {player = new YT.Player(node, 
  {height: playerHeight,  width: playerWidth,  playerVars: {'rel': 0, 'showinfo': 0, 'hidecontrols': 1 }, events: {'onReady': loadVideo}  }
  ); }
// When the player is ready, load the video. Using cueVideoById. as loadVideoById will not autoplay.  
function loadVideo(e) {e.target.cueVideoById({videoId: videoID, startSeconds: startTime, endSeconds: endTime });  }