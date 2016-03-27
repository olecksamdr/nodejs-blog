// Код для меню яке дозволяє додавати нові параграфи та інший контент
//

define(['./elements/loadImageInput', './imgFunc/addImage'], function (loadImageInput, addImage) {
		// елементи під-меню яке з'являється при додаванні нових елементів
		
		// контейнер під-меню
		var subMenu = document.querySelectorAll('.sub-menu')[0];
		
		function subMenuInit() {
			var

				// кнопки для меню
				btnImg = document.getElementById('img'),
				btnP = document.getElementById('p'),
				btnPSelected = document.getElementById('p-selected'),
				btnCode = document.getElementById('code'),
				btnVideo = document.getElementById('video'),

				// елементи для вставки відео
				popUp = document.querySelectorAll('.pop-up')[0],
				popUpOk = document.querySelectorAll('.close-popup')[0],
				urlInput = document.getElementById('urlInput');

				// додаємо обробники подій но кнопки під-меню
				btnImg.addEventListener('click', insImg, false);
				btnP.addEventListener('click', insP, false);
				btnPSelected.addEventListener('click', insPSelected, false);
				btnCode.addEventListener('click', insCode, false);

				btnVideo.addEventListener('click', insVideo, false);

				// показати меню
				subMenu.show = function () {
					subMenu.style.display = 'block';
					subMenu.className = 'sub-menu appear';
				}
				// сховати меню
				subMenu.hide = function () {
					subMenu.className = 'sub-menu disappear';
					setTimeout(function () {subMenu.style.display = 'none';},390);
				}

			 function insImg(e) {
				var cont = e.target.parentNode.parentNode.parentNode,
					sibling = cont.nextSibling,
					imgCont = createImgCont(); // створює розмітку для вставки забраження

				if (sibling) {
					sibling.insertBefore(imgCont.cont, sibling.firstChild);
				} else {
					insertAfter(imgCont.cont, cont);
				}
				addImage(loadImageInput, imgCont.img);
				subMenu.hide();
			};

			function insP(e) {
				var cont = e.target.parentNode.parentNode.parentNode,
					sibling = cont.nextSibling,
					p = createPCont();

				if (sibling) {
					cont.parentNode.insertBefore(p.cont, sibling);
				} else {
					insertAfter(p.cont, cont);
				}
				subMenu.hide();
			}

			function insPSelected(e) {
				var cont = e.target.parentNode.parentNode.parentNode,
					sibling = cont.nextSibling,
					p = createPCont();
					p.p.className = 'selected';

				if (sibling) {
					cont.parentNode.insertBefore(p.cont, sibling);
				} else {
					insertAfter(p.cont, cont);
				}
				subMenu.hide;
			}

			function insCode(e) {
				var cont = e.target.parentNode.parentNode.parentNode,
					sibling = cont.nextSibling,
					cod = createCodeCont();

				if (sibling) {
					cont.parentNode.insertBefore(cod, sibling);
				} else {
					insertAfter(cod, cont);
				}
				subMenu.hide;
			}

			 function insVideo(e) {
				var cont = e.target.parentNode.parentNode.parentNode,
					sibling = cont.nextSibling;


				popUpOk.onclick = function (e)  {
					popUp.className = 'pop-up pop-up-disappear';
					setTimeout(function () {popUp.style.display = 'none';}, 380);
					
					var url = youtube(urlInput.value);
					var video = createVideCont(url);
					
					if (sibling) {
						cont.parentNode.insertBefore(video, sibling);
					} else {
						insertAfter(vide, cont);
					}
				}

				subMenu.hide();
				popUp.style.display = 'block';
				popUp.className = 'pop-up pop-up-appear';
			}

		//*********************
		//		UTILS
		//*********************
		function youtube (url) {
			return url.replace('watch?v=', 'embed/').replace('&', '?');
		}

		function createImgCont () {
			var div = document.createElement('div');
			div.className = 'img-container left';

			var arrLeft = div.cloneNode();
			arrLeft.className = 'arrLeft rm';

			var arrCenter = div.cloneNode();
			arrCenter.className = 'arrCenter rm';

			var arrRight = div.cloneNode();
			arrRight.className = 'arrRight rm';

			var img = document.createElement('img');
			// addImage(loadImageInput, img);

			var resize = div.cloneNode();
			resize.className = 'resize rm';

			var add = div.cloneNode();
			add.className = 'add rm';

			var del = div.cloneNode();
			del.className = 'delete rm';

			div.appendChild(arrLeft);
			div.appendChild(arrCenter);
			div.appendChild(arrRight);
			div.appendChild(img);
			div.appendChild(resize);
			div.appendChild(add);
			div.appendChild(del);

			return {cont: div, img: img};
		}

		function createPCont() {
			var container = document.createElement('div');
			container.className = 'container';

			var p = document.createElement('p');
			p.innerHTML = 'Новий параграф';

			var del = container.cloneNode();
			del.className = 'delete rm';

			var plusA = container.cloneNode();
			plusA.className = 'plusA rm';

			container.appendChild(p);
			container.appendChild(del);
			container.appendChild(plusA);

			return {cont: container, p: p};
		}

		function createCodeCont () {
			var container = document.createElement('div');
			container.className = 'container';

			var pre = document.createElement('pre');

			var code = document.createElement('code');
			code.className = 'language-html';
			code.setAttribute('contenteditable', true);
			code.innerHTML = '// html\nпишіть свій код тут';

			var button = document.createElement('button');
			button.className = 'colorize rm';
			button.innerHTML = 'готово';

			var del = container.cloneNode();
			del.className = 'delete rm';

			var plusA = container.cloneNode();
			plusA.className = 'plusA rm';

			pre.appendChild(code);
			pre.appendChild(button);
			container.appendChild(pre);
			container.appendChild(del);
			container.appendChild(plusA);

			button.addEventListener('click', function (e) {
				var code = e.target.previousElementSibling;

				var lang = code.textContent.match(/\/\/\s*(css|html|js)/)[1];
				console.log(lang);

				switch (lang) {
					case 'css': code.className = 'language-css';
					break;
					case 'js': code.className = 'language-js';
					break;
					default : code.className = 'language-html'
				}

				var replaced = code.innerHTML.replace(/<br><\/br>/gi,'\r\n');
				console.log(replaced);
				code.innerHTML = replaced;
				Prism.highlightAll()
			}, false)

			return container;
		}

		function createVideCont(src) {
			var container = document.createElement('div');
			container.className = 'container';

			var iframe = document.createElement('iframe');
			iframe.width = 640;
			iframe.height = 480;
			iframe.src = src;
			iframe.setAttribute('allowfullscreen', true);

			var del = container.cloneNode();
			del.className = 'delete rm';

			var plusA = container.cloneNode();
			plusA.className = 'plusA rm';

			container.appendChild(iframe);
			container.appendChild(del);
			container.appendChild(plusA);

			return container;
		}
	}

	return {init: subMenuInit, elem: subMenu};
});