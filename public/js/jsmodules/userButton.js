// відповідає за анімацію меню користувача
var userBtn = document.querySelector('.user');
var usrControl = document.querySelector('.wrap-cnt');

var clk = true;
userBtn.onclick = function (e) {
  if (clk) {
    clk = false;
    usrControl.style.display = 'block';
    setTimeout(function () {usrControl.style.opacity = 1;} ,15)
  } else {
    clk = true;
    usrControl.className = "wrap-cnt"; 
    usrControl.style.opacity = 0;
    setTimeout(function () {usrControl.style.display = 'none';} ,400);
  }
}