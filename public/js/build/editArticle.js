define("jsmodules/utils",[],function(){function e(e,t){var n=t.parentNode,a=t.nextSibling;return a?n.insertBefore(e,a):n.appendChild(e)}function t(e,t){if("string"==typeof t){var n=e.ownerDocument.createRange();n.setStartBefore(e),t=n.createContextualFragment(t);var a=e.cloneNode();a.innerHTML=e.innerHTML,t.firstElementChild.appendChild(a);var o=e.parentNode;o.replaceChild(t,e)}else{var a=e.cloneNode();a.innerHTML=e.innerHTML,t.appendChild(a);var o=e.parentNode;o.replaceChild(t,e)}}function n(e){var t=e.getBoundingClientRect(),n=document.body,a=document.documentElement,o=window.pageYOffset||a.scrollTop||n.scrollTop,r=window.pageXOffset||a.scrollLeft||n.scrollLeft,s=a.clientTop||n.clientTop||0,i=a.clientLeft||n.clientLeft||0,l=t.top+o-s,d=t.left+r-i;return{top:l,left:d}}function a(e,t){return e.className&&new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)}function o(){for(var e=document.querySelectorAll(".rm"),t=0;t<e.length;t++)e[t].style.display="none"}function r(){for(var e=document.querySelectorAll(".rm"),t=0;t<e.length-1;t++)e[t].className+=" appear",e[t].style.display="block"}return"undefined"==typeof HTMLElement||HTMLElement.prototype.insertAdjacentElement||(HTMLElement.prototype.insertAdjacentElement=function(e,t){switch(e){case"beforeBegin":this.parentNode.insertBefore(t,this);break;case"afterBegin":this.insertBefore(t,this.firstChild);break;case"beforeEnd":this.appendChild(t);break;case"afterEnd":this.nextSibling?this.parentNode.insertBefore(t,this.nextSibling):this.parentNode.appendChild(t)}},HTMLElement.prototype.insertAdjacentHTML=function(e,t){var n=this.ownerDocument.createRange();n.setStartBefore(this);var a=n.createContextualFragment(t);this.insertAdjacentElement(e,a)},HTMLElement.prototype.insertAdjacentText=function(e,t){var n=document.createTextNode(t);this.insertAdjacentElement(e,n)}),{insertAfter:e,wrap:t,getOffset:n,hasClass:a,delControls:o,showControls:r}}),define("jsmodules/elements/loadImageInput",[],function(){var e=document.getElementById("add-image");return e}),define("jsmodules/imgFunc/addImage",["../elements/loadImageInput"],function(e){function t(t,n){e.click(),e.onchange=function(e){var a=e.target.files,o=a[0],r=new FileReader;r.onload=function(e){t.setAttribute("data-name",o.name),t.setAttribute("src",e.target.result),console.log(t),console.log(e.target.result),n&&n(t,600)},r.readAsDataURL(o)}}return t}),define("jsmodules/subMenu",["./elements/loadImageInput","./imgFunc/addImage"],function(e,t){function n(){function n(n){var o=n.target.parentNode.parentNode.parentNode,r=o.nextSibling,s=d();r?r.insertBefore(s.cont,r.firstChild):insertAfter(s.cont,o),t(e,s.img),a.hide()}function o(e){var t=e.target.parentNode.parentNode.parentNode,n=t.nextSibling,o=c();n?t.parentNode.insertBefore(o.cont,n):insertAfter(o.cont,t),a.hide()}function r(e){var t=e.target.parentNode.parentNode.parentNode,n=t.nextSibling,o=c();o.p.className="selected",n?t.parentNode.insertBefore(o.cont,n):insertAfter(o.cont,t),a.hide}function s(e){var t=e.target.parentNode.parentNode.parentNode,n=t.nextSibling,o=u();n?t.parentNode.insertBefore(o,n):insertAfter(o,t),a.hide}function i(e){var t=e.target.parentNode.parentNode.parentNode,n=t.nextSibling;N.onclick=function(e){y.className="pop-up pop-up-disappear",setTimeout(function(){y.style.display="none"},380);var a=l(E.value),o=m(a);n?t.parentNode.insertBefore(o,n):insertAfter(vide,t)},a.hide(),y.style.display="block",y.className="pop-up pop-up-appear"}function l(e){return e.replace("watch?v=","embed/").replace("&","?")}function d(){var e=document.createElement("div");e.className="img-container left";var t=e.cloneNode();t.className="arrLeft rm";var n=e.cloneNode();n.className="arrCenter rm";var a=e.cloneNode();a.className="arrRight rm";var o=document.createElement("img"),r=e.cloneNode();r.className="resize rm";var s=e.cloneNode();s.className="add rm";var i=e.cloneNode();return i.className="delete rm",e.appendChild(t),e.appendChild(n),e.appendChild(a),e.appendChild(o),e.appendChild(r),e.appendChild(s),e.appendChild(i),{cont:e,img:o}}function c(){var e=document.createElement("div");e.className="container";var t=document.createElement("p");t.innerHTML="Новий параграф";var n=e.cloneNode();n.className="delete rm";var a=e.cloneNode();return a.className="plusA rm",e.appendChild(t),e.appendChild(n),e.appendChild(a),{cont:e,p:t}}function u(){var e=document.createElement("div");e.className="container";var t=document.createElement("pre"),n=document.createElement("code");n.className="language-html",n.setAttribute("contenteditable",!0),n.innerHTML="// html\nпишіть свій код тут";var a=document.createElement("button");a.className="colorize rm",a.innerHTML="готово";var o=e.cloneNode();o.className="delete rm";var r=e.cloneNode();return r.className="plusA rm",t.appendChild(n),t.appendChild(a),e.appendChild(t),e.appendChild(o),e.appendChild(r),a.addEventListener("click",function(e){var t=e.target.previousElementSibling,n=t.textContent.match(/\/\/\s*(css|html|js)/)[1];switch(console.log(n),n){case"css":t.className="language-css";break;case"js":t.className="language-js";break;default:t.className="language-html"}var a=t.innerHTML.replace(/<br><\/br>/gi,"\r\n");console.log(a),t.innerHTML=a,Prism.highlightAll()},!1),e}function m(e){var t=document.createElement("div");t.className="container";var n=document.createElement("iframe");n.width=640,n.height=480,n.src=e,n.setAttribute("allowfullscreen",!0);var a=t.cloneNode();a.className="delete rm";var o=t.cloneNode();return o.className="plusA rm",t.appendChild(n),t.appendChild(a),t.appendChild(o),t}var p=document.getElementById("img"),g=document.getElementById("p"),h=document.getElementById("p-selected"),f=document.getElementById("code"),v=document.getElementById("video"),y=document.querySelectorAll(".pop-up")[0],N=document.querySelectorAll(".close-popup")[0],E=document.getElementById("urlInput");p.addEventListener("click",n,!1),g.addEventListener("click",o,!1),h.addEventListener("click",r,!1),f.addEventListener("click",s,!1),v.addEventListener("click",i,!1),a.show=function(){a.style.display="block",a.className="sub-menu appear"},a.hide=function(){a.className="sub-menu disappear",setTimeout(function(){a.style.display="none"},390)}}var a=document.querySelectorAll(".sub-menu")[0];return{init:n,elem:a}}),define("jsmodules/elements/pop-up-url",[],function(){var e=document.querySelectorAll(".pop-up")[0],t=document.querySelectorAll(".close-popup")[0];return{elem:e,ok:t}}),define("jsmodules/selectMenu",["require","./elements/pop-up-url","./elements/pop-up-url"],function(e){function t(){function t(e){if(window.getSelection)if(""!=window.getSelection().toString()){var t=window.getSelection().getRangeAt(0),a=n(t);l.style.top=a.y-66+"px",l.style.left=a.x+Math.round(a.width/2)-Math.round(d/2)+"px",l.show()}else l.hide()}function n(e){var t=e.getBoundingClientRect(),n=Math.round(t.left),a=Math.round(t.top),o=Math.round(t.right-n),r=Math.round(t.bottom-a);return{x:n,y:a,width:o,height:r}}function a(){document.execCommand("bold",!1),l.hide()}function o(){document.execCommand("italic",!1),l.hide()}function r(){var e=document.getSelection().getRangeAt(0);i.style.display="block",i.className="pop-up pop-up-appear";var t=document.getElementById("urlInput");t.focus(),l.hide(),s.onclick=function(t){i.className="pop-up pop-up-disappear",setTimeout(function(){i.style.display="none"},380);var n=urlInput.value,a=document.createElement("a");a.href=n,e.surroundContents(a)}}var s=e("./elements/pop-up-url").ok,i=e("./elements/pop-up-url").elem;console.dir(i);var l=document.getElementById("select-menu"),d=l.offsetWidth;l.style.display="none";for(var c=document.getElementsByTagName("p"),u=0;u<c.length;u++)c[u].addEventListener("mouseup",t,!1),c[u].addEventListener("keyup",t,!1),c[u].addEventListener("dblclick",t,!1);l.show=function(){l.style.display="block",l.className="appear"},l.hide=function(){l.className="disappear",setTimeout(function(){l.style.display="none"},190)};var m=document.getElementById("bold");m.addEventListener("click",a,!1);var p=document.getElementById("italic");p.addEventListener("click",o,!1);var g=document.getElementById("link");g.addEventListener("click",r,!1)}return t}),define("jsmodules/imgFunc/resizeImg",[],function(){function e(e,n){var a=new Image;a.src=e.src;var o=n/a.width*a.height;t.width=n,t.height=o,t.getContext("2d").drawImage(a,0,0,n,o);var r=t.toDataURL("image/jpeg",1);return e.setAttribute("src",r),r}var t=document.createElement("canvas");return e}),define("jsmodules/imgFunc/resize",["require","../utils","../utils"],function(e){function t(t,o){var r,s,i,l,d,c=new Image,u={},m=!1,p=60,g=60,h=800,f=900,v=function(){c.src=t.src,console.log("image"),console.log(c.src);var n=t.parentNode;s=document.createElement("div"),s.className="resize-handle resize-handle-nw",n.insertBefore(s,t),i=s.cloneNode(),s.className="resize-handle resize-handle-ne",n.insertBefore(i,s);var a=e("../utils").insertAfter;l=s.cloneNode(),l.className="resize-handle resize-handle-se",a(l,t),d=s.cloneNode(),d.className="resize-handle resize-handle-sw",a(d,l),r=n,console.log("container"),console.log(r),s.addEventListener("mousedown",startResize,!1),i.addEventListener("mousedown",startResize,!1),l.addEventListener("mousedown",startResize,!1),d.addEventListener("mousedown",startResize,!1)};startResize=function(e){e.preventDefault(),e.stopPropagation(),saveEventState(e),document.addEventListener("mousemove",resizing),document.addEventListener("mouseup",endResize)},endResize=function(e){e.preventDefault(),document.removeEventListener("mousemove",resizing);try{r.removeChild(s),r.removeChild(i),r.removeChild(l),r.removeChild(d)}catch(e){}o.style.display="block",o.nextElementSibling.style.display="block",o.previousElementSibling.previousElementSibling.style.display="block",o.previousElementSibling.previousElementSibling.previousElementSibling.style.display="block",o.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display="block"},saveEventState=function(e){u.containerWidth=r.offsetWidth,u.containerHeight=r.offsetHeight;var t=a(r);u.containerLeft=t.left,u.containerTop=t.top,u.mouseX=(e.clientX||e.pageX||e.originalEvent.touches[0].clientX)+window.pageXOffset,u.mouseY=(e.clientY||e.pageY||e.originalEvent.touches[0].clientY)+window.pageYOffset,"undefined"!=typeof e.touches&&(u.touches=[],$.each(e.originalEvent.touches,function(e,t){u.touches[e]={},u.touches[e].clientX=0+t.clientX,u.touches[e].clientY=0+t.clientY})),u.evnt=e},resizing=function(e){var t,n,o,s,i={};a(r);i.x=(e.clientX||e.pageX||e.originalEvent.touches[0].clientX)+window.pageXOffset,i.y=(e.clientY||e.pageY||e.originalEvent.touches[0].clientY)+window.pageYOffset,/resize-handle-se/.test(u.evnt.target.className)?(t=i.x-u.containerLeft,n=i.y-u.containerTop,o=u.containerLeft,s=u.containerTop):/resize-handle-sw/.test(u.evnt.target.className)?(t=u.containerWidth-(i.x-u.containerLeft),n=i.y-u.containerTop,o=i.x,s=u.containerTop):/resize-handle-nw/.test(u.evnt.target.className)?(t=u.containerWidth-(i.x-u.containerLeft),n=u.containerHeight-(i.y-u.containerTop),o=i.x,s=i.y,(m||e.shiftKey)&&(s=i.y-(t/orig_src.width*orig_src.height-n))):/resize-handle-ne/.test(u.evnt.target.className)&&(t=i.x-u.containerLeft,n=u.containerHeight-(i.y-u.containerTop),o=u.containerLeft,s=i.y,(m||e.shiftKey)&&(s=i.y-(t/c.width*c.height-n))),(m||e.shiftKey)&&(n=t/c.width*c.height),t>p&&n>g&&h>t&&f>n&&resizeImage(t,n)},resizeImage=function(e,a){n.width=e,n.height=a,n.getContext("2d").drawImage(c,0,0,e,a),t.setAttribute("src",n.toDataURL("image/jpeg",1))},v()}var n=document.createElement("canvas"),a=e("../utils").getOffset;return t}),define("jsmodules/ajax/ajax",[],function(){function e(e,t){o++,xhr=new XMLHttpRequest,xhr.open("POST","/newArticle",!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-type","application/json; charset=utf-8"),e=JSON.stringify(e),xhr.send(e),xhr.onreadystatechange=function(){return 4==xhr.readyState?200==xhr.status?(console.log(xhr.responseText),r.push(1),console.log("sended html data"),!0):void console.log(xhr.status+": "+xhr.statusText):void 0}}function t(e,t){o++,xhr=new XMLHttpRequest,xhr.open("POST","/updateArticle",!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-type","application/json; charset=utf-8"),e=JSON.stringify(e),xhr.send(e),xhr.onreadystatechange=function(){return 4==xhr.readyState?200==xhr.status?(console.log(xhr.responseText),r.push(1),console.log("updateHTML"),!0):void console.log(xhr.status+": "+xhr.statusText):void 0}}function n(e,t,n){o++,xhr=new XMLHttpRequest;var a=t;xhr.open("POST","/base64",!0),console.log("sending: "+a),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-type","application/json; charset=utf-8"),e=JSON.stringify({image:e,name:t}),xhr.send(e),xhr.onload=xhr.onerror=function(){200==this.status?(console.log(xhr.responseText),r.push(1)):console.log(xhr.status+": "+xhr.statusText)}}function a(e,t){xhr=new XMLHttpRequest,xhr.open("POST","/removeArticle/"+e,!0),xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),xhr.setRequestHeader("Content-type","application/json; charset=utf-8"),xhr.send(),xhr.onreadystatechange=function(){return 4==xhr.readyState?200==xhr.status?(console.log(xhr.responseText),t.className="fullScreen disappear",setTimeout(function(){t.style.display="none"},390),!0):void console.log(xhr.status+": "+xhr.statusText):void 0}}var o=0,r=[];return{sendHTML:e,updateHTML:t,sendBase64:n,removeArticle:a,numOfcall:o,ok:r}});var numOfcall=0,ok=[];define("editArticle",["require","jsmodules/utils","./jsmodules/subMenu","./jsmodules/subMenu","jsmodules/selectMenu","jsmodules/utils","jsmodules/imgFunc/addImage","jsmodules/imgFunc/resizeImg","jsmodules/imgFunc/resize","jsmodules/utils","jsmodules/ajax/ajax"],function(e){function t(){function t(t){var n=t.target;if(t.preventDefault(),"code"==n.tagName.toLowerCase()&&n.setAttribute("contenteditable","true"),"p"!=n.tagName.toLowerCase()&&"h1"!=n.tagName.toLowerCase()||(n.setAttribute("contenteditable","true"),n.focus(),n.onkeydown=function(e){return 13==e.keyCode?!1:void 0},n.onkeyup=function(e){return 13==e.keyCode?!1:void 0}),"p"!=n.tagName.toLowerCase()&&"h1"!=n.tagName.toLowerCase()||(n.setAttribute("contenteditable","true"),n.focus(),n.onkeydown=function(e){return 13==e.keyCode?!1:void 0},n.onkeyup=function(e){return 13==e.keyCode?!1:void 0}),l(n,"addBanner")){var a=n.previousElementSibling,o=n.parentNode;d(a,c)}if(l(n,"arrLeft")){var o=n.parentNode;o.className="img-container left"}if(l(n,"arrCenter")){var o=n.parentNode,i=o.parentNode;r.insertBefore(o,i)}if(l(n,"arrRight")){var o=n.parentNode;o.className="img-container right"}if(l(n,"add")){var a=n.previousElementSibling.previousElementSibling;d(a)}if(l(n,"resize")){n.style.display="none",n.nextElementSibling.style.display="none",n.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display="none",n.previousElementSibling.previousElementSibling.previousElementSibling.style.display="none",n.previousElementSibling.previousElementSibling.style.display="none";var u=e("jsmodules/imgFunc/resize");u(n.previousElementSibling,n)}if(l(n,"delete")){var o=n.parentNode;o.parentNode.removeChild(o)}l(n,"plusA")&&(!n.firstChild||/disappear/.test(s.className)?(n.appendChild(s),s.show()):/appear/.test(s.className)&&s.hide())}var n=e("jsmodules/utils").showControls;n();for(var a=document.querySelectorAll(".colorize"),o=0;a>o;o++)a[o].addEventListener("click",function(e){var t=e.target.previousElementSibling;console.log(t);var n=t.textContent.match(/\/\/\s*(css|html|js)/)[1];switch(console.log(n),n){case"css":t.className="language-css";break;case"js":t.className="language-js";break;default:t.className="language-html"}Prism.highlightAll()},!1);var r=document.querySelectorAll(".flex-wrapper")[0];r.addEventListener("click",t,!1);var s=e("./jsmodules/subMenu").elem;e("./jsmodules/subMenu").init();var i=e("jsmodules/selectMenu");i();var l=e("jsmodules/utils").hasClass,d=e("jsmodules/imgFunc/addImage"),c=e("jsmodules/imgFunc/resizeImg");document.getElementById("save");save.onclick=function(){e("jsmodules/utils").delControls();var t=e("jsmodules/ajax/ajax"),n=window.location.href.match(/editArticle\/(.+)/)[1];console.log(n);var a=(document.getElementById("prog"),document.querySelectorAll(".fullScreen")[0]);a.style.display="block",a.className="fullScreen appear";var o=document.getElementById("bn");if(o)if(/^data:image\/jpeg;base64/.test(o.src)){var s=o.src,i=c(o,300),l="small"+o.getAttribute("data-name");o.src=s,t.sendBase64(i,l,a)}else l="small"+o.getAttribute("data-name");var d=document.getElementsByTagName("img");if(d)for(var u=0;u<d.length;u++){var m=d[u].src;if(/^data:image\/jpeg;base64/.test(m)){var p=d[u].getAttribute("data-name");d[u].src="/loaded/"+p,t.sendBase64(m,p,a)}}var g=document.getElementsByTagName("h1")[0];g.removeAttribute("contenteditable");for(var h=document.getElementsByTagName("p"),u=0;u<h.length;u++)h[u].hasAttribute("contenteditable")&&h[u].removeAttribute("contenteditable");for(var f=document.getElementsByTagName("code"),u=0;u<f.length;u++)f[u].hasAttribute("contenteditable")&&f[u].removeAttribute("contenteditable");var v=document.getElementsByTagName("h1")[0].innerHTML,y=r.innerHTML,N=document.getElementsByTagName("p")[0].innerHTML;t.updateHTML({title:v,body:y,desc:N,banner:l,id:n},a),console.log(ok),console.log(numOfcall);var E=setInterval(function(){ok.length==numOfcall&&(clearInterval(E),a.className="fullScreen disappear",setTimeout(function(){a.style.display="none",window.location="/"},390))},1e3)}}window.addEventListener("load",t,!1),document.execCommand("insertBrOnReturn",!1,!1)});