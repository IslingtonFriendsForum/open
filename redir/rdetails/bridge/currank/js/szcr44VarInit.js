var gV={};gV['out']={};gP=[];//global array of vars and params
gP['Package']='Free Brian';gP['dbSvr']='http://sz.tld/data/datastore/xml';
var szUrl22=gP['dbSvr']+"/cebcNSEW1.xml",szUrl33=gP['dbSvr']+"/cebcNSEW2.xml";
var szdb,szdbRef,szScreenData,szul,szUrl, szData2, szPromise,szXUrl; 
szXUrl=szUrl22;
var szDBname='reviews',szUrlroot='cebcNSEW',szDataType='xml',szPostType='GET',szOut='';
//szXUrl='http://wp-extern.rhcloud.com/pub/cebcNSEW2.xml';
//szXUrl='https://httpbin.org/xml';'http://sz.tld/data/datastore/xml/nedAP101.xml'
//szXUrl='https://www.brianbridge.net/cgi-bin/briancurrankxml.cgi?callback=?';
// szUrl=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; console.log('B4 AjaxLoop=',szLoop,'szUrl=',szUrl);
var szLoop=1,szLoopMax=4,szLoopgVp=1*1000,szDelay=2*1000,szCnt=0;var szPromData=[];
var szUseLocalData=false;var szEventNameSW=false;var szNewData=false; var szAllResultsIn=false; 
var szHeatNames=['North/South','East/West'];var szHeatName;var szHeatCSS=['heat0','heat1'];
var szNS=0,szEW=1; var szHeat=szNS; var szEWHeat=false;
var szEventName,szPairs,szFinalSetofResults,szPromise22,szPromise33;
var szSec=[],szRoot=[];szRoot[0]=[];szRoot[1]=[];
	szSec[0]=[];szSec[0][szNS]=[];szSec[0][szEW]=[];szSec[1]=[];szSec[1][szNS]=[];szSec[1][szEW]=[];
	gV['out'][szNS]={};gV['out'][szEW]={};
	gV['out'][szNS]['EventName']=[];gV['out'][szEW]['EventName']=[];
	gV['out'][szNS]={};gV['out'][szEW]={};
	gV['out'][szNS]['totResults']={};gV['out'][szEW]['totResults']={};var szResultsIn;
	gV['out'][szNS]['ResultsSoFar']=[];gV['out'][szEW]['ResultsSoFar']=[];var szResultsIn;
	gV['out'][szNS]['Rank']=[];gV['out'][szNS]['PairName']=[];gV['out'][szNS]['Score']=[];	
	gV['out'][szEW]['Rank']=[];gV['out'][szEW]['PairName']=[];gV['out'][szEW]['Score']=[];	
var szXml={	"root"	:[{	"name":"played",	"bcode":"pb"},	{"name":"total",	"bcode":"tb"},
					{	"name":"type",		"bcode":"gt"}	],
			"sItem"	:[{	"name":"PairName",	"bcode":"na"},	{"name":"PairNum",	"bcode":"no"},
					{	"name":"Rank",		"bcode":"ra"},	{"name":"Score",	"bcode":"sc"}	]};
// var d = $.Deferred();
/* C:\dev22\sz.tld\!demos\gui\layout\cssgrids uses https://github.com/sylvainpolletvillard/postcss-grid-kiss
"All pairs" means there is no concept of an NS pair or an EW pair, since no pair plays only NS or only EW. 
This can be because the movement is a Howell, or it could be because there is an arrow-switch. */
//var totalNodes = $('*',xmlData).length; console.log("This XML file has ",totalNodes, ' nodes');
// var totalNodes = $('section',xmlData).length; console.log("This XML file has ",totalNodes, ' section nodes');
// var szRootVal=xmlData.getElementsByTagName("root")[0];console.log('pb',szRootVal.getAttribute('pb')); */

/*
while (!szAllResultsIn) {
	szUrl22=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; 
	szUrl33=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; console.log('1st=',szUrl22,'2nd=',szUrl33);
	$.when(sz2Ajax(szUrl22), sz2Ajax(szUrl33)).done(function(szPromData22, szPromData33) {
		szProc(szPromData22,0);
		if (szAllResultsIn==false) {setTimeout(function() {	szProc(szPromData33,1);	}, szDelay);} 
	});
} 
} ); */	

//szXUrl='http://wp-extern.rhcloud.com/pub/cebcNSEW2.xml';
//szXUrl='https://httpbin.org/xml';'http://dev22.tld/sites/redir/rdetails/bridge/currank/nedAP101.xml'
// szUrl=szUrlroot+szRandIntFromInterval(1,3)+'.'+szDataType; console.log('B4 AjaxLoop=',szLoop,'szUrl=',szUrl);