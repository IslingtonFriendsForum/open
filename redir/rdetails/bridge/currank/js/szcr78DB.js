function szScreenDataTemplate({fullName, message}) {return `
<div class='fullName'>${fullName}</div><div class='message'>${message}</div><button class='delete'>Delete123</button>`};

function szRenderListItem(ffElm, index, arr) {li=document.createElement('li'); li.setAttribute('class','szItem'); 
li.innerHTML='Item Number'+'&nbsp;'+index+'<br>'+li.innerHTML + ffElm;
szul.appendChild(li);}

function szdbprep(ffDBname){ffDB=firebase.database(); ffDBref=ffDB.ref('/'+ffDBname);
if (12==14){
ffDBref.on('child_added', (data) => {szul=document.createElement('ul'); var li=document.createElement('li'); li.id=data.key;
  li.innerHTML=szScreenDataTemplate(data.val()); szData2.appendChild(li);}); // console.log('asd=',data.key);
ffDBref.on('child_changed', (data) => {var szData2 = document.getElementById(data.key);
  szData2.innerHTML = szScreenDataTemplate(data.val());});
ffDBref.on('child_removed', (data) => {var szData2 = document.getElementById(data.key);
  szData2.parentNode.removeChild(szData2);});
szData2.addEventListener('click', (e) => {var szData2=e.target.parentNode
	if (e.target.classList.contains('edit')) {hiddenId.value=szData2.id; // UPDATE Record
    fullName.value=szData2.querySelector('.fullName').innerText;
    message.value=szData2.querySelector('.message').innerText;}
	if (e.target.classList.contains('delete')) {ffDB.ref(gP['FBDBname']+'/'+szData2.id).remove();} // DELETE Record
}); } // if (12==14)
}

function s2dbAddRec(ffDB, ffDBname){// CREATE Record
var id=Date.now(); var fullName='s2dbAddRec '+id+ ' xx'; var message=JSON.stringify(gA['out']);
console.log('id=',id,'message=',message);szObjRec={fullName: fullName, message: message};
szArrRec=[fullName, message]; ffDB.ref(ffDBname+'/'+id).set(szObjRec);

szul = document.createElement('ul'); szul.setAttribute('id','szList');
document.getElementById('szData2').appendChild(szul); szArrRec.forEach(szRenderListItem);

//szul=document.createElement('ul'); li=document.createElement('li'); 
//li.innerHTML=szScreenDataTemplate({fullName: fullName, message: message}); 	
console.log('----------------------------','szProc2 ended');fullName='';  message='';  
}

function szReadRecA(ffparm){//gP['AJAXurl']=''https://www.brianbridge.net/cgi-bin/briancurrankxml.cgi?callback=?';
	$.ajax({url:gP['AJAXurl'],type:'POST',cache:false,dataType:'text',data:'ned',processData:false,crossDomain:true,contentType:'text/plain'}).done(function(p){d.resolve(p);}).fail(d.reject); return d.promise();}

function szReadRecB(ffparm){//gP['AJAXurl']=''https://www.brianbridge.net/cgi-bin/briancurrankxml.cgi?callback=?';
    return $.ajax({url:gP['AJAXurl'],type:'POST',cache:false,dataType:'text',data:'ned',processData:false,crossDomain:true,contentType:'text/plain'}).pipe(function(p){ return p.address;});}
