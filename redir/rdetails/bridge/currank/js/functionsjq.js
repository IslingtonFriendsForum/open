function s2ProcJQ(appName,xml,ffdbFlds) {
if (xml.length < ('<?xml version="1.0" encoding="ISO-8859-1"?>failure'.length + 5) ) {return s2ProcErr(xml,{ErrCode:4,Emsg:'Server response too short'});}
let targ,XMLitems=brXML2Array(xml,ffdbFlds);if (XMLitems.ErrCode) {return XMLitems;}
let eventinfo=XMLitems.EvtInf,ttlResult; if (eventinfo.PB==eventinfo.TB) {ttlResult="all ("+eventinfo.TB+")"} 
else {ttlResult=eventinfo.PB+"/"+eventinfo.TB+" ("+ Number(100*(eventinfo.PB/eventinfo.TB)).toFixed(2)+"%)"} ;
let eventheats=XMLitems.HeatResults; let NumHeats=eventheats.length,HeatScores=[],HeatNames=[],HeatResults=[]; // console.log('NumHeats='+NumHeats);
eventheats.forEach(function(elm,idx) {	HeatScores[idx]=elm; HeatNames[idx]=HeatScores[idx].HeatName;HeatResults[idx]=HeatScores[idx].Results; } );
targ=document.getElementsByClassName("titles");targ[0].innerHTML=s2Titles(appName,eventinfo.EventName,ttlResult)+brk();
targ=document.getElementsByClassName("wrapper"); targ[0].innerHTML=s2Detail(HeatResults);return {Error:false};}

function s2Titles(ffappName,ffEventName,ttlResult) {let ffout='<div id="AppName">'+ffappName+'</div>'+brk()+Indent(2)+
	'<h1>Rankings</h1>'+brk()+Indent(2); if (ffEventName.length) {ffout+='<h2><em>'+ffEventName+'</em></h2>'+brk()+Indent(2);}
ffout+='<h3>Results in:&nbsp;'+ttlResult+'</h3>'+brk()+Indent(2);return ffout;
}
function s2Detail(ffResults) {let faHeatNames=['All Pairs','North/South','East/West'], faHcode=['AP','NS','EW'];
	let ffNumHeats=ffResults.length,ffHeatNum=0,ffHeatInc=(ffResults.length>1)?1:0,ff='<ul class="flex cards">';
	ffResults.forEach(function(item,idx) {
		ff +=brk()+Indent(2)+'<li><h4>Heat: '+faHeatNames[idx+ffHeatInc]+'</h4>'+brk()+ 
				Indent(4)+'<div class="rows">'+brk()+Indent(5)+'<div class="cols">Rank&nbsp;'+'</div>'+brk()+
					  Indent(5)+'<div class="cols">Name'                            +'</div>'+brk()+
					  Indent(5)+'<div class="cols">'+'&#37;'+'&nbsp;&nbsp;'         +'</div>'+brk()+Indent(4)+'</div>'+brk();		
		for (i=0;i<item.length; i++) {ff +=
				Indent(4)+'<div class="rows">'+brk();	ff +=
					Indent(8)+'<div class="cols">'+item[i].Rank               +'</div>'+brk()+
					   Indent(12)+'<div class="cols">'+item[i].PairName  +'</div>'+brk()+
					   Indent(12)+'<div class="cols">'+item[i].PairScore +'</div>'+brk()+Indent(8)+brk()+
				Indent(4)+'</div>'+brk();
		}
		ff +=Indent(2)+'</div></li>'+'<!-- end of pane '+idx+' -->'+brk();
	});
return ff+'</ul>'+brk()+'</div>';
}

function brXML2Array(xml,ffdbFlds) {let Arow,RootItemBeginsAtPos,ffNumHeats, ffHeatNums=[],ArrSplitSection=[],SectionBodyBeginsAtPos=[],ErrObj={};
let EvtInf={EventName:'',SF:'',PB:'',TB:'',GT:''};ArrSplitSection=xml.split('</section>');
if (ArrSplitSection.length <2) {ErrObj={ErrCode:1,Emsg:'No results section'}; return s2ProcErr(xml,ErrObj);} //failure code
ArrSplitSection.pop();SectionBodyBeginsAtPos[0]='';
ffNumHeats=ArrSplitSection.length; SectionBodyBeginsAtPos[0]= ArrSplitSection[0].indexOf('<section');
if (ffNumHeats>1) {ffHeatNums=[0,1];SectionBodyBeginsAtPos[1]=ArrSplitSection[1].indexOf('<section');} else {ffHeatNums=[0];};
RootItemBeginsAtPos=ArrSplitSection[0].indexOf('<root');
let XRoot=ArrSplitSection[0].substr(RootItemBeginsAtPos,SectionBodyBeginsAtPos[0] - RootItemBeginsAtPos); 
let ffRootSF=XRoot.indexOf('sf='); EvtInf.SF=s2ExtractStr('"','"',XRoot,ffRootSF);
if (EvtInf.SF=='f') {ErrObj={ErrCode:2,Emsg:'Server returned Fail Code'}; return s2ProcErr(xml,ErrObj);}
let ffRootPB=XRoot.indexOf('pb='); EvtInf.PB=s2ExtractStr('"','"',XRoot,ffRootPB);
let ffRootTB=XRoot.indexOf('tb='); EvtInf.TB=s2ExtractStr('"','"',XRoot,ffRootTB);
let ffRootGT=XRoot.indexOf('gt='); EvtInf.GT=s2ExtractStr('"','"',XRoot,ffRootGT);
EvtInf.EventName=s2ExtractStr('<eventname><![CDATA[',']',XRoot); let HeatResults=[];
ffHeatNums.forEach(function(elm,HeatIDX) {Arow=s2ProcSections(ArrSplitSection[elm].substr(SectionBodyBeginsAtPos[HeatIDX]),ffdbFlds); HeatResults[HeatIDX]=Arow;	});
return {ErrCode:false, EvtInf:EvtInf, HeatResults:HeatResults};
}

function s2ProcSections(ffXMLitems,ffdbFlds) {let ffEnd=ffXMLitems.indexOf('>'); // extract section name and contents of items
let ffSectionName=ffXMLitems.substr(0,ffEnd+1); let ffXMLitemsCleaned=ffXMLitems.substr(ffSectionName.length); 
let rawItemArray=ffXMLitemsCleaned.split('<item>'); rawItemArray.shift(); 
let Results=[];let OneRowOfFields; let dbFieldNames=ffdbFlds.dbFldName; 
rawItemArray.forEach(function(rawItem,rawIDX) {Results[rawIDX]=[];
	OneRowOfFields=rawItem.split('</'); OneRowOfFields.pop(); let OneCleanFld='';
	OneRowOfFields.forEach(function(OneRawItem,idxB) {
		if (idxB<dbFieldNames.length) {OneCleanFld=OneRawItem.substr(OneRawItem.lastIndexOf('>')+1); 
			let fldName=dbFieldNames[idxB];	Results[rawIDX][fldName]=OneCleanFld;} 
	}); 
});
return {HeatName:s2ExtractStr('"','"',ffSectionName),Results:Results};
}
function s2ExtractStr(ff22,ff33,ffstr,ffOff=0) {let ffA=ffstr.indexOf(ff22,ffOff)+ff22.length,ffB=ffstr.indexOf(ff33,ffA+ff33.length); return ffstr.substr(ffA,ffB - ffA) }
function brk() {if (!UDEBUG) {return "\n";}} 
function Indent(ct) {if (!UDEBUG) {return " ".repeat(ct);}} 

function s2RandomIntFromInterval(min,max) {return Math.floor(Math.random()*(max-min+1)+min);}

function s2ProcErr(ffXML,ffErrObj) {let extm,extrpos,errmsg='App alert - Code:'+ffErrObj.ErrCode +"\n";
switch (ffErrObj.ErrCode) {case 1: errmsg +=ffErrObj.Emsg; break;case 2: errmsg +=ffErrObj.Emsg; break; default:break;}
extrpos=ffXML.indexOf('<root sf="f">')+'<root sf="f">'.length;
if (extrpos !== '<root sf="f">'.length)
	{extm=ffXML.substr(extrpos);extrpos=extm.indexOf('</root>');extm=extm.substr(0,extrpos);
	if (extm.length>0) {errmsg += "\n"+' Server Error:'+extm +"\n";}  
}
console.log('Message=:'+errmsg);return ffErrObj;}

function s2QuerySt(ffKey,ffDefaultQS,ffValidQstrings) { let url = window.location.href,faKeysValues = url.split(/[\?&]+/);
for (let i=0; i < faKeysValues.length; i++) {KeyValue=faKeysValues[i].split("="); 
	if ((KeyValue[0] == ffKey) && (KeyValue[1].length>0)) { //if (ffValidQstrings.indexOf(KeyValue[1])) {
		return KeyValue[1];//		}	
		} 
}
return ffDefaultQS;}

function szDelay(milliseconds) {return function(result) {// szDelay(1000)('hello').then(function(result) {console.log(result);}); 
    return new Promise(function(resolve, reject) {setTimeout(function() { resolve(result); }, milliseconds); });    };
} // somePromise.then(szDelay(1000)).then(function() {console.log('1 second after somePromise!');});

function szDispArgs () {console.log('args='+arguments.length);}
