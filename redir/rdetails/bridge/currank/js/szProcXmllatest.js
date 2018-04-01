function szProc(xmlData, ff2Loop){//console.log('success getting',szUrl);//,'got=',JSON.stringify(xmlData)
console.log('ajxml=',xmlData);// console.log('response=',response);
	szEventName='Main Duplicate';// <eventname><![CDATA[Main Duplicate]]></eventname>
	// xmlData.getElementsByTagName("eventname")[0].childNodes[0].nodeValue;//,='Unnamed event'
	/* ------------------ Collect Root Info -----------------------------*/
	var szff=$(xmlData).find('root').attr('pb');console.log('szff=',szff);
	szRoot[ff2Loop]['pb']=$(xmlData).find('root').attr('pb'); szRoot[ff2Loop]['tb']=$(xmlData).find('root').attr('tb');
	console.log('pb1=',szRoot[ff2Loop]['pb'],'tb=',szRoot[ff2Loop]['tb']);
	if (szProduction) {szFinalSetofResults=szRoot[ff2Loop]['tb'];} else {szFinalSetofResults='103';}
	gA['ResultsIn']=szRoot[ff2Loop]['pb']+"/"+szRoot[ff2Loop]['tb']+" ("+
		Number(100*(szRoot[ff2Loop]['pb']/szRoot[ff2Loop]['tb'])).toFixed(2)+"%)";
	console.log('ResultsIn=',gA['ResultsIn']);
	/* --------------------------- Collect NS and any EW Section info -------------------------*/
	$(xmlData).find('section').each(function(idx,item) {szHeat=szNS; // fill out each section
		if (item.getAttribute('n')=='EW') {szHeat=szEW;szEWHeat=true;}; // AllPair, NS or EW
		$(this).children().each(function(i,sz5) {var szth=this;	var ffArr=[];
			szXml.sItem.forEach(function(xItem) {ffArr[xItem.name]=$.trim($(xItem.bcode,szth).text()); });
			szSec[ff2Loop][szHeat][i]=[];
			szSec[ff2Loop][szHeat][i]['PairName']=ffArr['PairName'];szSec[ff2Loop][szHeat][i]['Rank'] =ffArr['Rank'];
			szSec[ff2Loop][szHeat][i]['PairNum']=ffArr['PairNum'];	szSec[ff2Loop][szHeat][i]['Score']=ffArr['Score'];
		});
	}); 	
	/* --------------------------- Heading -----------------------------*/ var ffNewData=false; 
	if (!ff2Loop)	{szUpdate(ff2Loop);}
	if (ff2Loop)	{if (szRoot[ff2Loop]['pb'] !== szRoot[ff2Loop-1]['pb']) {ffNewData=true;}}
	if (ffNewData)	{szUpdate(ff2Loop); console.log('pb has changed',szRoot[ff2Loop]['pb']);	}
	else 			{console.log('pb NO change',szRoot[ff2Loop]['pb']);}
	if (ff2Loop)	{szRoot[ff2Loop-1]['pb']=szRoot[ff2Loop]['pb'];}
	if (szRoot[ff2Loop]['pb'] == szFinalSetofResults) {szAllResultsIn=true;	console.log('all results in');}
	console.log('----------------------------','complete');
}
function szUpdate(ff3Loop){$('header').nextAll().remove(); szHeader(); 
	//szHeat=szNS; szDetail(ff3Loop); if (szEWHeat==true) {szHeat=szEW; szDetail(ff3Loop);console.log('szHeat=',szHeat);}
}
function szHeader() {ffOut='';/* <div class="szBlock'+szHeat+' headings">
	$(	'<div id="r1">Free Briany</div>'+
	'<div id="r2">Rankings</div>'+ '<div id="r3"><em>'+szEventName+'</em></div>'+
		'<div id="hd"><div id="r4">Results in:'+gA['ResultsIn']+'</div>').appendTo( "body" );*/
	ffOut='<div class="szBlock0 headings"></div>'+'<div id="r1">Free Brian</div>'+
	'<div id="r2">Rankings</div>'+ '<div id="r3"><em>'+szEventName+'</em></div>'+
		'<div id="hd"><div id="r4">Results in:'+gA['ResultsIn']+'</div>';
	// $(ffOut).insertAfter($('[class^="szBlock'+szHeat+'"]').last());	
	// $(ffOut).insertAfter($('main').last());
//	$(ffOut).appendTo( "main" );
 $(ffOut+'</div>').appendTo( "body" );
}
function szDetail(ff4Loop) {ffOut='',ffZeb='',ffB=false;console.log('szEWHeat',szEWHeat);
	/* --------------------------- Ranking -----------------------------*/
	ffHeatName=(szEWHeat==true)?szHeatNames[szHeat]:'All Pairs';ffHeatCSS='heat'+szHeat;
	ffOut='<div class="r5">Heat: '+ffHeatName+'</div></div>'+ 
	'<section>' +'<div class="column">Rank&nbsp;</div>'+'<div class="column">Name'+'</div>'+
											'<div class="column">'+'%&nbsp;&nbsp;'+'</div>'+'</section>';		
	for (i=0;i<szSec[ff4Loop][szHeat].length; i++) {ffB=!ffB;ffZeb=ffB?'':' style="background:#333333"';
		ffOut +='<div class="table-row szColumn">';
		ffOut +='<section>'+'<div class="column">'+szSec[ff4Loop][szHeat][i]['Rank']    +'</div>'+
				'<div class="column"'+ffZeb+'>'+szSec[ff4Loop][szHeat][i]['PairName']+'</div>'+
				'<div class="column"'+ffZeb+'>'+szSec[ff4Loop][szHeat][i]['Score']   +'</div></section>';}
	var ffDe=[];ffDe[szNS]='body';ffDe[szEW]='.EW';				
	// if (szHeat==szNS) {ffEnd +='<div class="EW"></div>';} 
	$(ffOut).insertAfter($('[class^="szBlock'+szHeat+'"]').last());	
	// $(ffBeg+ffEnd).appendTo(ffDe[szHeat]);
}
function szRandIntFromInterval(min,max) {return Math.floor(Math.random()*(max-min+1)+min);}
/* C:\dev22\sz.tld\!demos\gui\layout\cssgrids uses https://github.com/sylvainpolletvillard/postcss-grid-kiss
"All pairs" means there is no concept of an NS pair or an EW pair, since no pair plays only NS or only EW. 
This can be because the movement is a Howell, or it could be because there is an arrow-switch. */
//var totalNodes = $('*',xmlData).length; console.log("This XML file has ",totalNodes, ' nodes');
// var totalNodes = $('section',xmlData).length; console.log("This XML file has ",totalNodes, ' section nodes');
// var szRootVal=xmlData.getElementsByTagName("root")[0];console.log('pb',szRootVal.getAttribute('pb'));
/*	
while (!szAllResultsIn) {
	szUrl22=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; 
	szUrl33=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; console.log('1st=',szUrl22,'2nd=',szUrl33);
	$.when(sz2Ajax(szUrl22), sz2Ajax(szUrl33)).done(function(szPromData22, szPromData33) {
		szProc(szPromData22,0);
		if (szAllResultsIn==false) {setTimeout(function() {	szProc(szPromData33,1);	}, szDelay);} 
	});
}
} );
function sz2Ajax(ffUrl) {var ffRes; $.ajax({async: false, cache:false, type: szPostType, url: ffUrl, dataType: 'xml'}) 
	.done (function(xmlData) {ffRes=xmlData;}); return ffRes;} */