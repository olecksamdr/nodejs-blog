// відсилати дані про сесію користувача, щоб не кожен міг передавати дані
define(function () {
var numOfcall = 0;
var ok = [];
function sendHTML(data, fullScreen) {
    numOfcall++;

    xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/newArticle', true);
    
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    data = JSON.stringify(data);

    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
        
      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        console.log(xhr.responseText);
        ok.push(1);

        // elem.parentNode.parentNode.className = 'fullScreen disappear';
        // setTimeout(function () {elem.parentNode.parentNode.style.display = 'none';},390);
        console.log('sended html data');
        return true;
      }
   }
}

// відсилати дані про сесію користувача, щоб не кожен міг передавати дані
function updateHTML(data, fullScreen) {
    numOfcall++;
    xhr = new XMLHttpRequest();
    
    xhr.open('POST', '/updateArticle', true);
    
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    data = JSON.stringify(data);

    xhr.send(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
        
      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        console.log(xhr.responseText);
        ok.push(1);

        // elem.parentNode.parentNode.className = 'fullScreen disappear';
        // setTimeout(function () {elem.parentNode.parentNode.style.display = 'none';},390);
        console.log('updateHTML');
        return true;
      }
   }
}

function sendBase64(data, imageName, fullScreen) {
    numOfcall++;

    xhr = new XMLHttpRequest();

    var name = imageName;

    xhr.open('POST', '/base64' , true);
    console.log('sending: '+ name);

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    data = JSON.stringify({image: data, name: imageName});

    xhr.send(data);

    xhr.onload = xhr.onerror = function() {
    if (this.status == 200) {
      console.log(xhr.responseText);
      ok.push(1);
    } else {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
  };
}

function removeArticle (id, fullScreen) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', '/removeArticle/' + id, true);

  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  xhr.send();
    // console.log(data);
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
        
      if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        console.log(xhr.responseText);

        fullScreen.className = 'fullScreen disappear';
        setTimeout(function () {fullScreen.style.display = 'none';},390);

        return true;
      }
   }
}

return {
  sendHTML: sendHTML,
  updateHTML: updateHTML,
  sendBase64: sendBase64,
  removeArticle: removeArticle,
  numOfcall: numOfcall,
  ok: ok
}

});
