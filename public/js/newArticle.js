// змінні потрбні для коректної роботи загрузки
var numOfcall = 0;
var ok = [];

define(function (require) {
	
window.addEventListener('load', docLoaded, false);

document.execCommand("insertBrOnReturn", false, false);

function docLoaded () {
	var flexWrapper = document.querySelectorAll('.flex-wrapper')[0];
	flexWrapper.addEventListener('click', contentClick, false);

	// модуль під-меню для додавання нового контенту
	var subMenu = require('jsmodules/subMenu').elem;
	require('jsmodules/subMenu').init();

	//===== модуль для меню що зявляється при виділенні тесту
	var selectMenuinit = require('jsmodules/selectMenu');
	selectMenuinit();

	// допоміжні ф-ції
	var hasClass = require('jsmodules/utils').hasClass;

	// ф-ції для роботи з картинками
	var addImage = require('jsmodules/imgFunc/addImage');
	var resizeImg = require('jsmodules/imgFunc/resizeImg');

	// щоб не задавати обробники подій всім елементам flex-контейнера
	// використаємо цю ф-цію
	function contentClick (e) {
		// target - елемент в межах flex-контейнера по якому клікнули
		var target = e.target;
		e.preventDefault();

		// Якщо ми клікнули по параграфу з текстом чи заголовку, то додаємо можливість редагування
		if (target.tagName.toLowerCase() == 'p' || target.tagName.toLowerCase() == 'h1') {
			target.setAttribute('contenteditable', 'true');
			target.focus();

			// більшість браузерів при натисканні клавіші enter вставляють 
			// тег <br>. Нам така поведінка не потрібна 
			target.onkeydown = function (e) {
				if (e.keyCode == 13)
					return false;
			}
			target.onkeyup = function (e) {
				if (e.keyCode == 13)
					return false;
				}
			}

		// додаємо новий банер
		if (hasClass(target, 'addBanner') ) {
			var img = target.previousElementSibling;
			var parent = target.parentNode;

			// завантажує картинку, змінюючи її розмір
			addImage(img, resizeImg);
		}

		// =====================================================
		// КОД ДЛЯ КНОПОК ЩО ЗЯВЛЯЮТЬСЯ ПРИ НАВЕДЕННІ НА КАРТИНКУ

		if (hasClass(target, 'arrLeft')) {
			var parent = target.parentNode;
			parent.className = 'img-container left'
		}

		if (hasClass(target, 'arrCenter')) {
			var parent = target.parentNode;
			var container = parent.parentNode;

			flexWrapper.insertBefore(parent, container);
		}

		if (hasClass(target, 'arrRight')) {
			var parent = target.parentNode;
			parent.className = 'img-container right'
		}

		if (hasClass(target, 'add')) {
			var img = target.previousElementSibling.previousElementSibling;
			addImage(img);
		}

		// коли натискаємо но кнопку змміни розміру зображення
		if (hasClass(target, 'resize')) {
			// при ресайзі приховуємо всі кнопки
			target.style.display = 'none';
			target.nextElementSibling.style.display = 'none';
			target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'none';
			target.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'none';
			target.previousElementSibling.previousElementSibling.style.display = 'none';

			// ф-ція що відповідає за resize
			var resizeableImage = require('jsmodules/imgFunc/resize');
			resizeableImage(target.previousElementSibling, target);
		}

		// З КАРТИНКАМИ ВСЬО
		// ==========================================================

		// видаляємо елементи при кліку на хрестик
		if (hasClass(target, 'delete')) {
			var parent = target.parentNode;
			parent.parentNode.removeChild(parent);
		}

		// коли має з'являтися під-меню
		if (hasClass(target, 'plusA')) {
			if (!target.firstChild || /disappear/.test(subMenu.className)) {
				target.appendChild(subMenu);
				subMenu.show();
			} else if (/appear/.test(subMenu.className)){
				subMenu.hide();
			}
		}
	}

	// ===========================================================
	// ВІДПРАВЛЯЄМО ВСЕ НА СЕРВЕР

	var btnSave = document.getElementById('save');
	save.onclick = function () {
		// набір ф-цій для ідправки даних на сервер
		var ajax = require('jsmodules/ajax/ajax');

		var delControls = require('jsmodules/utils').delControls;
		delControls();

		// для німації загрузки
		var progress = document.getElementById('prog');
		var fullScreen = document.querySelectorAll('.fullScreen')[0];

		fullScreen.style.display = 'block';
		fullScreen.className = 'fullScreen appear';

		var images = document.getElementsByTagName('img');

		var img = document.getElementById('bn');
		if (img) {
			var orig = img.src;
			var banner = resizeImg(img, 300);
			var bannerName = 'small' + img.getAttribute('data-name');
			img.src = orig;

			ajax.sendBase64(banner, bannerName, fullScreen);
		}

		if (images) {
			for (var i = 0; i < images.length; i++) {
				var src = images[i].src;
				var name = images[i].getAttribute('data-name');

				images[i].src = '/loaded/' + name;
				ajax.sendBase64(src, name, fullScreen);
			}
		}

		var h1 = document.getElementsByTagName('h1')[0];
		h1.removeAttribute('contenteditable');

		var p = document.getElementsByTagName('p');
		for (var i = 0; i < p.length; i++) {
			if (p[i].hasAttribute('contenteditable'))
				p[i].removeAttribute('contenteditable');
		}

		var code = document.getElementsByTagName('code');
		for (var i = 0; i < code.length; i++) {
			if (code[i].hasAttribute('contenteditable'))
				code[i].removeAttribute('contenteditable');
		}

		var title = document.getElementsByTagName('h1')[0].innerHTML;
		var html = flexWrapper.innerHTML;
		var description = document.getElementsByTagName('p')[0].innerHTML;

		ajax.sendHTML({title: title, body: html, desc: description, banner: bannerName}, fullScreen);

		console.log(ok);
		console.log(numOfcall);
		var t = setInterval(function (){
			if (ok.length == numOfcall) {
				clearInterval(t);

				fullScreen.className = 'fullScreen disappear';
				setTimeout(
					function () {
						fullScreen.style.display = 'none';
						window.location = '/';
					},390);
			}
		}, 1000);

	};
}

});
