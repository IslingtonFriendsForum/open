jQuery(document).ready(function($){var szUseLocalData=false; 
 $(function(){/* var docElm = document.documentElement;
if (docElm.requestFullscreen) {docElm.requestFullscreen();}
else if (docElm.mozRequestFullScreen) {docElm.mozRequestFullScreen();}
else if (docElm.webkitRequestFullScreen) {docElm.webkitRequestFullScreen();}
else if (docElm.msRequestFullscreen) {docElm.msRequestFullscreen();} */
	 
	 
	// var vid = document.getElementById("myRank"); vid.webkitEnterFullscreen();
/*
            // hide video and button until we know they're loaded
            $("#myRank").css({'visibility' : 'hidden', 'display' : 'none'});
            $("#fs").css({'visibility' : 'hidden'});

            // when video is loaded // show button to launch video
            // $("#myRank").bind('loadedmetadata', function () { $("#fs").css({'visibility' : 'visible'}); });
		
			// extend button functionality
            $('#fs').bind('click', function() {
                // display the video
                $("#myRank").css({'visibility' : 'visible', 'display' : 'block'});

                // launch the video fullscreen
                var vid = document.getElementById("myRank"); vid.webkitEnterFullscreen();
            });*/
				
			
        });
/*
if (szUseLocalData==false) {	
var url='https://www.brianbridge.net/cgi-bin/briancurrankxml.cgi?callback=?';
$.ajax({url:url,type:'POST',cache:false,dataType:'text',data:'ned',processData:false,crossDomain:true,contentType:'text/plain'})
.done (function(data) {szProcXML(data);})
.fail (function(jqxhr, textStatus, errorThrown)  {console.log("Error: " , textStatus , " : " + errorThrown) ; }); }

else {szProcXML(szData());} */
}); 

function szProcXML(data) {var xmlDoc=$.parseXML(data); szSectionN(xmlDoc);console.log('xml=',xmlDoc);
var szpb=$(data).find('root').attr('pb'); var sztb=$(data).find('root').attr('tb');
console.log('szpb=',sztb,'sztb=',sztb);
var x =xmlDoc.getElementsByTagName('item');// console.log('data=',data);

var szTable="<caption>Current Rankings</caption>"+"<thead><tr><th>Score</th><th>Names</th>"+ "</tr></thead><tbody>";
for (i = 0; i <x.length; i++) {
	var szsc=x[i].getElementsByTagName("sc")[0].childNodes[0].nodeValue,
	szra=x[i].getElementsByTagName("ra")[0].childNodes[0].nodeValue,
	szna=x[i].getElementsByTagName("na")[0].childNodes[0].nodeValue,	  
	szno=x[i].getElementsByTagName("no")[0].childNodes[0].nodeValue;
	if (szra.slice(-1)== '=') {szra ="&nbsp;"+szra}
	if (szra.length ==1 ) {szra =szra + "&nbsp;&nbsp;&nbsp;&nbsp;";}
	if (szra.length ==2 ) {szra =szra + "&nbsp;&nbsp;&nbsp;";}
	if (szra.length ==3 ) {szra =szra + "&nbsp;&nbsp;";}
	if (szra.length ==4 ) {szra =szra + "&nbsp;";}									
	szra ='<span id="rak">'+szra+'</span>';
	szTable += "<tr>";	szTable += '<td data-heading="Score">' + szsc + "</td>";
	szTable += '<td data-heading="Names">' + szra + " " + szna + " (" +	szno + ")";	szTable += "</td></tr>";
}
document.getElementById("szrankings22").innerHTML = "</tbody>"+szTable;}

function szSectionN(document){var sx=$(document).find("section").attr('n');console.log('attn=',sx);}


function szData() {return `<?xml version="1.0" encoding="ISO-8859-1"?>
<root sf="s" pb="192" tb="192" gt="PS">
 <section n="All pairs">
  <item>
   <ra>1</ra>
   <no>4</no>
   <na>Rosemary Vase &amp; Mary Webster</na>
   <sc>62.67</sc>
  </item>
  <item>
   <ra>2</ra>
   <no>5</no>
   <na>Pauline Finn &amp; Carol Clisby</na>
   <sc>61.95</sc>
  </item>
  <item>
   <ra>3</ra>
   <no>13</no>
   <na>Martin Samuel &amp; Asad Ansari</na>
   <sc>61.86</sc>
  </item>
  <item>
   <ra>4</ra>
   <no>2</no>
   <na>Gordon Brook &amp; Simon Flower</na>
   <sc>55.57</sc>
  </item>
  <item>
   <ra>5</ra>
   <no>9</no>
   <na>Grette Elliott &amp; Gesa Coleman</na>
   <sc>53.91</sc>
  </item>
  <item>
   <ra>6</ra>
   <no>1</no>
   <na>Mike Shaw &amp; Libby Lodh</na>
   <sc>51.11</sc>
  </item>
  <item>
   <ra>7</ra>
   <no>11</no>
   <na>David Wooldridge &amp; Jenny Meier</na>
   <sc>50.53</sc>
  </item>
  <item>
   <ra>8</ra>
   <no>12</no>
   <na>Belkise Ismail &amp; Doug Thornes</na>
   <sc>49.90</sc>
  </item>
  <item>
   <ra>9</ra>
   <no>8</no>
   <na>Pat O'Sullivan &amp; Val O'Sullivan</na>
   <sc>49.87</sc>
  </item>
  <item>
   <ra>10</ra>
   <no>3</no>
   <na>Colin Jones &amp; Jax Lewis</na>
   <sc>48.30</sc>
  </item>
  <item>
   <ra>11</ra>
   <no>17</no>
   <na>Emma Forbes &amp; Loulou van Geuns</na>
   <sc>46.36</sc>
  </item>
  <item>
   <ra>12</ra>
   <no>6</no>
   <na>Sue Perin &amp; Dee Jones</na>
   <sc>44.26</sc>
  </item>
  <item>
   <ra>13</ra>
   <no>14</no>
   <na>Chas Crellin &amp; Bill Breeden</na>
   <sc>43.73</sc>
  </item>
  <item>
   <ra>14</ra>
   <no>15</no>
   <na>Claus Werner &amp; Sue Matthews</na>
   <sc>43.68</sc>
  </item>
  <item>
   <ra>15</ra>
   <no>16</no>
   <na>Nan Williams &amp; Susy Viney</na>
   <sc>43.34</sc>
  </item>
  <item>
   <ra>16</ra>
   <no>18</no>
   <na>Sue Warren &amp; Julie Allman</na>
   <sc>41.16</sc>
  </item>
  <item>
   <ra>17</ra>
   <no>19</no>
   <na>Penny Rickard &amp; Geoff Prevett</na>
   <sc>39.12</sc>
  </item>
 </section>
</root>`	
}