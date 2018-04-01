function szclog(ffmsg,ffvar) {console.log(ffmsg,ffvar);}
function s2RestCall(ffConf,ffLoops2Date) {console.log('url=',ffConf.url,'ffLoops2Date=',ffLoops2Date);
	let ffPromise=Promise.resolve($.ajax({type:ffConf.typeReq, dataType:ffConf.typeData, 
		data:ffConf.req, contentType:ffConf.typeContent, url:ffConf.url,
		cache:false, processData:false, timeout: ffConf.timeout, crossDomain:true }));
	ffPromise.then(function(response) {f2Svr(response);},function(xhrObj) {f2SvrErr(xhrObj);}); //
}

function szPromPureAjax(url, method, data) {return new Promise(function(resolve, reject) {var request = new XMLHttpRequest(); request.responseType = 'text';
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {resolve(request.responseText);} else { reject(Error(request.statusText));}
      }
    };
    request.onerror = function() {reject(Error("Network Error"));}; request.open(method, url, true); request.send(data);  });
} // szPromPureAjax('/', 'GET').then(function(result) { console.log(result);});

function f2SvrErr(szxhrObj) {
if (szxhrObj.statusText=='timeout') {console.warn('SZ Error:Server not responding');} else 
	{console.log('Error=',szxhrObj.status,'statusText=',szxhrObj.statusText);console.log('xhrObj=',szxhrObj);}}

function sz2Ajax(ffUrl) {var ffRes; $.ajax({async: false, cache:false, type: gP['AJAXreqType'], url: ffUrl, dataType: gP['AJAXDataType']}) 
	.done (function(xmlData) {ffRes=xmlData;}); return ffRes;} 
	
function szXMLvalid(xmlDataIn) {var xmlData;try {xmlData=$.parseXML(xmlDataIn); } catch (e) {// todo email
    if (e instanceof TypeError) {console.log('line=1');s2LogMyErrors(0,'TypeError',e);
    } else if (e instanceof RangeError) {console.log('line=2');s2LogMyErrors(1,'RangeError',e);
    } else if (e instanceof EvalError) {console.log('line=3');s2LogMyErrors(2,'EvalError',e);
    } else {s2LogMyErrors(3,'unspecified',e);}} 	// todo if error 'failure' console.log (xmlDataIn); return;
	finally{}  // s2LogMyErrors(9,'Regardless of the outcome above','none');
return xmlData;}
	
function s2QuerySt(ffKey,ffDefaultQS,ffValidQstrings) {
let url = window.location.href,faKeysValues = url.split(/[\?&]+/);
for (let i = 0; i < faKeysValues.length; i++) {KeyValue = faKeysValues[i].split("="); 
	if ((KeyValue[0] == ffKey) && (KeyValue[1].length>0)) {
		if (ffValidQstrings.indexOf(KeyValue[1])) {return KeyValue[1];}
	} 
}
return ffDefaultQS;}

function szDelay(milliseconds) {return function(result) {// szDelay(1000)('hello').then(function(result) {console.log(result);}); 
    return new Promise(function(resolve, reject) {setTimeout(function() { resolve(result); }, milliseconds); });    };
} // somePromise.then(szDelay(1000)).then(function() {console.log('1 second after somePromise!');});

function szRandIntFromInterval(min,max) {return Math.floor(Math.random()*(max-min+1)+min);}
function s2LogMyErrors(fferrnum, fferrtype,fferr) {console.log('s2LogMyErrors=',fferrnum,'type=',fferrtype,'err=',fferr);}
function szBrk(ffarg) {return ffarg;}
/* working promise
function delay(ffvar) {
  // `delay` returns a promise
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function() {
      resolve(ffvar+'=ers='+42); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}

delay(szGlobVars.Loops2Date).then(function(v) { // `delay` returns a promise
  console.log(v); // Log the value once it is resolved
}).catch(function(v) {
  // Or do something else if it is rejected 
  // (it would not happen in this example, since `reject` is not called).
});
*/
