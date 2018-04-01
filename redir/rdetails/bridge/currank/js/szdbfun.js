function szdbprep(ffDBname){szdb=firebase.database(); szdbRef=szdb.ref('/'+ffDBname);
if (12==14){
szdbRef.on('child_added', (data) => {szul=document.createElement('ul'); var li=document.createElement('li'); li.id=data.key;
  li.innerHTML=szScreenDataTemplate(data.val()); szData2.appendChild(li);}); // console.log('asd=',data.key);
szdbRef.on('child_changed', (data) => {var szData2 = document.getElementById(data.key);
  szData2.innerHTML = szScreenDataTemplate(data.val());});
szdbRef.on('child_removed', (data) => {var szData2 = document.getElementById(data.key);
  szData2.parentNode.removeChild(szData2);});
szData2.addEventListener('click', (e) => {var szData2=e.target.parentNode
	if (e.target.classList.contains('edit')) {hiddenId.value=szData2.id; // UPDATE Record
    fullName.value=szData2.querySelector('.fullName').innerText;
    message.value=szData2.querySelector('.message').innerText;}
	if (e.target.classList.contains('delete')) {szdb.ref(szDBname+'/'+szData2.id).remove();} // DELETE Record
}); } // if (12==14)
}

function szScreenDataTemplate({fullName, message}) {return `
<div class='fullName'>${fullName}</div><div class='message'>${message}</div><button class='delete'>Delete123</button>`};

function szRenderListItem(ffElm, index, arr) {li=document.createElement('li'); li.setAttribute('class','szItem'); 
li.innerHTML='Item Number'+'&nbsp;'+index+'<br>'+li.innerHTML + ffElm;
szul.appendChild(li);}

	
function szdbAddRec(ffDBname){// CREATE Record
var id=Date.now(); var fullName='szdbAddRec '+id+ ' xx'; var message=JSON.stringify(gA['out']);
console.log('id=',id,'message=',message);szObjRec={fullName: fullName, message: message};
szArrRec=[fullName, message]; szdb.ref(ffDBname+'/'+id).set(szObjRec);

szul = document.createElement('ul'); szul.setAttribute('id','szList');
document.getElementById('szData2').appendChild(szul); szArrRec.forEach(szRenderListItem);

//szul=document.createElement('ul'); li=document.createElement('li'); 
//li.innerHTML=szScreenDataTemplate({fullName: fullName, message: message}); 	
console.log('----------------------------','szProc2 ended');fullName='';  message='';  
}

function szRandIntFromInterval(min,max) {return Math.floor(Math.random()*(max-min+1)+min);}

function sz2Ajax(ffUrl) {var ffRes; $.ajax({async: false, cache:false, type: szPostType, url: ffUrl, dataType: 'xml'}) 
	.done (function(xmlData) {ffRes=xmlData;}); return ffRes;} 