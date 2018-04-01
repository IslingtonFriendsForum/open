let UDEBUG=false; let dbFldNum={Rank:0,PairNum:1,PairName:2,PairScore:3}; let dbFldName=Object.getOwnPropertyNames(dbFldNum);
let dbFlds={dbFldNum:dbFldNum,dbFldName:dbFldName}; let szConfCH=[],szConf;
let szGlobVars={NumHeats :1, IntervalDelay:20*1000,ValidQSreceived:false, contentType:'text/plain', dataType:'text', /* 'text/xml' */dbSvr:'http://sz.tld/data/datastore/xml', FBDBname :'reviews'};

szConfCH['brian']={type:'POST', contentType:szGlobVars.contentType, dataType:szGlobVars.dataType, cache:false, processData:false, crossDomain:true,	
		timeout:szGlobVars.IntervalDelay, url:'https://www.brianbridge.net/cgi-bin/briancurrankxml.cgi?callback=?' };
szConfCH['local']={type:'GET',  contentType:szGlobVars.contentType, dataType:szGlobVars.dataType, cache:false, processData:false, crossDomain:true, 
		timeout:szGlobVars.IntervalDelay, url:'http://sz.tld:3000/szAPI/posts/1' };
