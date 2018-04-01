function f2Svr(ffxmlData) {szInnerIntervalLoop($.parseXML(ffxmlData))}
function szOuterIntervalLoop(ffIntervalLoopCnt,ffConf) {ffIntervalLoopCnt += 1; console.log('iteration number: ' + ffIntervalLoopCnt);	s2RestCall(ffConf);	return ffIntervalLoopCnt;}
function szInnerIntervalLoop(xmlData,ffGlobConsts,ffGlobVars){let ffLoops2Date=ffGlobVars.Loops2Date;console.group('name'+ffLoops2Date);
	let ffNS=0,ffEW=1,ffFinalSetofResults,ffEventName='UnNamed';let ffMaybeEr=false;
	try {ffEventName=xmlData.getElementsByTagName("eventname")[0].childNodes[0].nodeValue;} catch (e) {console.log('no event name'); }
	try {ffMaybeEr=$(xmlData).find('root').attr('sf');} catch (e) {console.log('sf error'); } //<root sf="f">noslotgiven ="s"=success?
// only once per event
	if (typeof ffEventName=="undefined") {ffEventName='Unnamed Event';}
	let ffPlayedSoFar=$(xmlData).find('root').attr('pb'); let ffTotBoards=$(xmlData).find('root').attr('tb');
	if (ffGlobConsts.Production) {ffFinalSetofResults=ffTotBoards;} else {ffFinalSetofResults=ffGlobConsts.FinalSetofResultsDev;}
	ffGlobVars.BoardsPlayed[ffLoops2Date]=ffPlayedSoFar; ffGlobVars.BoardsTotal[ffLoops2Date]=ffTotBoards;
	ffResultsIn=ffPlayedSoFar+"/"+ffTotBoards+" ("+	Number(100*(ffPlayedSoFar/ffTotBoards)).toFixed(2)+"%)"; 
	console.log('now processing',xmlData, 'ffLoops2Date=',ffLoops2Date);
	let ffXML={"root"	:[{	"name":"played",	"bcode":"pb"},	{"name":"total",	"bcode":"tb"},
					{		"name":"type",		"bcode":"gt"}	],
			   "sItem"	:[{	"name":"PairName",	"bcode":"na"},	{"name":"PairNum",	"bcode":"no"},
					{		"name":"Rank",		"bcode":"ra"},	{"name":"Score",	"bcode":"sc"}	]};
	ffGlobVars.Item[ffLoops2Date]=[];ffNumHeats=1;let fgHeat=ffNS;ffGlobVars.NSheatBool=false;ffGlobVars.EWheatBool=false; // AllPair, NS or EW
	$(xmlData).find('section').each(function(idx,item) {// fill out each section // console.log('idx=',idx, 'attrib=',item.getAttribute('n'));
		if (item.getAttribute('n')==ffGlobConsts.HeatCodeNS) {fgHeat=ffNS;ffGlobVars.NSheatBool=true;} 
		if (item.getAttribute('n')==ffGlobConsts.HeatCodeEW) {fgHeat=ffEW;ffGlobVars.EWheatBool=true;}
		ffGlobVars.Item[ffLoops2Date][fgHeat]=[];
		$(this).children().each(function(i,tmp) {let ffThis=this,faFld=[];ffGlobVars.Item[ffLoops2Date][fgHeat][i]=[];
			ffXML.sItem.forEach(function(xItem) {faFld[xItem.name]=$.trim($(xItem.bcode,ffThis).text()); });
			ffGlobVars.Item[ffLoops2Date][fgHeat][i]['PairName']=faFld['PairName'];ffGlobVars.Item[ffLoops2Date][fgHeat][i]['Rank']= faFld['Rank'];
			ffGlobVars.Item[ffLoops2Date][fgHeat][i]['PairNum']= faFld['PairNum']; ffGlobVars.Item[ffLoops2Date][fgHeat][i]['Score']=faFld['Score'];
		});		
	});  
	ffGlobVars.BoardsPlayed[ffLoops2Date]=ffPlayedSoFar;var ffNewData=true;
	if (ffLoops2Date>0) {let ffPrev=ffLoops2Date-1;console.log('ffPrev=',ffPrev);//tmp='';// not the very first time around
		try {
		ffGlobVars.Item[ffLoops2Date][fgHeat].forEach(function(xItem,i) {//console.log('fgi=',i);
			ffGlobVars.Item[ffLoops2Date].forEach(function(yItem,jgheat) {//console.log('fgj=',j);
					// console.log('new pname=',	ffGlobVars.Item[ffLoops2Date][jgheat][i]['PairName'],'old pname=',ffGlobVars.Item[ffPrev][jgheat][i]['PairName']);
					if ( ffGlobVars.Item[ffLoops2Date][jgheat][i]['PairName']	!=ffGlobVars.Item[ffPrev][jgheat][i]['PairName'])	{ffNewData=false;}
				else if (ffGlobVars.Item[ffLoops2Date][jgheat][i]['Rank'] 		!=ffGlobVars.Item[ffPrev][jgheat][i]['Rank'])		{ffNewData=false;}
				else if (ffGlobVars.Item[ffLoops2Date][jgheat][i]['PairNum'] 	!=ffGlobVars.Item[ffPrev][jgheat][i]['PairNum'])	{ffNewData=false;}
				else if (ffGlobVars.Item[ffLoops2Date][jgheat][i]['Score']		!=ffGlobVars.Item[ffPrev][jgheat][i]['Score']) 		{ffNewData=false;}	
			});
		});}
		catch (e) {console.log('no ffGlobVars.Item');return false; }
		if (ffNewData==false) {console.log('data unchanged from last time. Loops2date=: '+ ffLoops2Date);ffGlobVars.NoChange=true;}
		else {if (ffGlobVars.BoardsPlayed[ffLoops2Date] != ffGlobVars.BoardsPlayed[ffPrev]) {console.log('samenum of boards played as last time. Loops2date=: ');}
			if (ffPlayedSoFar != ffGlobVars.BoardsLast) {ffGlobVars.BoardsLast=ffPlayedSoFar; console.log(ffPlayedSoFar+'BoardsLast, different: ' + ffLoops2Date);} // todo email this diff
		}
	}  let ffmsg='';
	if ((ffGlobVars.NSheatBool==true) && (ffGlobVars.EWheatBool==true)) {ffNumHeats++;} else {console.log('ERROR! Not enough heats found!!!!!!!!!!!!!');}
	if (ffGlobVars.NoChange==false) {let ffDetail='',ffmsg='-------complete------';// return;// this and previous file contents are the same so go no further
		ffGlobVars.Item[ffLoops2Date].forEach(function(elm,idx) {ffDetail +=s2OutPutOnePaneOfData(ffLoops2Date,idx,ffNumHeats,ffGlobConsts,ffGlobVars);}); // both panes
		if (ffPlayedSoFar == ffFinalSetofResults) {ffGlobVars.AllResultsIn=true; ffmsg +='++++all results in++++';	}
		$('.szhead').empty();$('.szhead').append(s2Header(ffEventName,ffResultsIn,ffGlobConsts.PACKAGE));$('.panes').empty();$('.panes').append(ffDetail);
		console.log(ffmsg);} else {ffmsg +=' NO NEW DATA!!!!!';} console.log(ffmsg);
return {ffLoops2Date,ffGlobVars};}
function s2Header(ffEventName,ffResultsIn,ffPACKAGE) {return '<div class="headings">'+szBrk("\n")+'<div id="szHdrFBr">'+ffPACKAGE+'</div>'+szBrk("\n")+
	'<div id="szHdrRankings">Rankings</div>'+szBrk("\n")+'<div id="szHdrEventName"><em>'+ffEventName+'</em></div>'+szBrk("\n")+
		'<div id="hd">'+szBrk("\n")+'<div id="szResults">Results in:'+ffResultsIn+'</div>'+szBrk("\n")+'</div></div>'+szBrk("\n"); }
function s2OutPutOnePaneOfData(ffLoops2Date,ffHeat,ffNumHeats,ffGlobConsts,ffGlobVars) {let fftmp='',ffZeb='',ffB=false;/* ---- Ranking -------*/ 
	let ffHeatName=(ffNumHeats>1)?ffGlobConsts.HeatNames[ffHeat]:ffGlobConsts.HeatCodeAP;
	let ffOutDetail = '<div class="szPane'+ffHeat+'">'+'<div class="HeatName">Heat: '+ffHeatName+'</div>'+szBrk("\n")+ 
	'<section>' +szBrk("\n")+'<div class="column">Rank&nbsp;</div>'+szBrk("\n")+'<div class="column">Name'+'</div>'+szBrk("\n")+'<div class="column">'+'&nbsp;&nbsp;&nbsp;&nbsp;%'+'</div>'+szBrk("\n")+'</section>'+szBrk("\n");
	for (let i=0;i<ffGlobVars.Item[ffLoops2Date][ffHeat].length; i++) {ffB=!ffB;ffZeb=ffB?'':' style="background:#333333"';
		ffOutDetail +='<div class="szColumn">'+szBrk("\n");
		ffOutDetail +='<section>'+'<div class="column">'+ffGlobVars.Item[ffLoops2Date][ffHeat][i]['Rank']    +'</div>'+szBrk("\n")+'<div class="column"'+ffZeb+'>'+ffGlobVars.Item[ffLoops2Date][ffHeat][i]['PairName']+'</div>'+szBrk("\n");
				fftmp=ffGlobVars.Item[ffLoops2Date][ffHeat][i]['Score'];fftmp=parseFloat(fftmp).toFixed(2).toString();
		ffOutDetail +='<div class="column"'+ffZeb+'>'+fftmp +'</div>'+szBrk("\n")+'</section></div>'+szBrk("\n");
	} 
ffOutDetail +='</div>' +szBrk("\n");return ffOutDetail;}
