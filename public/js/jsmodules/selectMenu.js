define(function (require) {
	function init() {
		var popUpOk = require('./elements/pop-up-url').ok;
		var popUp = require('./elements/pop-up-url').elem;
		console.dir(popUp);

		var selectMenu = document.getElementById('select-menu');
		var menuWidth = selectMenu.offsetWidth;
		selectMenu.style.display = 'none';

		var ps = document.getElementsByTagName('p');

		for (var i = 0; i < ps.length; i++) {
			ps[i].addEventListener('mouseup', isSelected, false);
			ps[i].addEventListener('keyup', isSelected, false);
			ps[i].addEventListener('dblclick', isSelected, false);
		}

		selectMenu.show = function () {
			selectMenu.style.display = 'block';
			selectMenu.className = 'appear';
		}

		selectMenu.hide = function () {
			selectMenu.className = 'disappear';
			setTimeout(function () {selectMenu.style.display = 'none';},190);
		}

		function isSelected(e) {
			if (window.getSelection) 
				if (window.getSelection().toString() != '') {
					var rng = window.getSelection().getRangeAt(0);
					var position = getPosition(rng);

					selectMenu.style.top = position.y - 66 + 'px';
					selectMenu.style.left = position.x + Math.round(position.width / 2) - Math.round(menuWidth / 2) + 'px';
					selectMenu.show();
					} else {
						selectMenu.hide();
					}
			}

		function getPosition(elem) {
			var box = elem.getBoundingClientRect();
			var x = Math.round(box.left);
			var y = Math.round(box.top);
			var width = Math.round(box.right - x);
			var height = Math.round(box.bottom - y);
			return {x : x, y : y, width : width, height: height}
		}

		var bold = document.getElementById('bold');
		bold.addEventListener('click', makeBold, false);

		function makeBold() {
			document.execCommand('bold', false);
			selectMenu.hide();
		}

		var italic = document.getElementById('italic');
		italic.addEventListener('click', makeItalic, false);

		function makeItalic() {
			document.execCommand('italic', false);
			selectMenu.hide();
		}

		var link = document.getElementById('link');
		link.addEventListener('click', makeLink, false);

		function makeLink() {
			var rng = document.getSelection().getRangeAt(0);

			popUp.style.display = 'block';
			popUp.className = 'pop-up pop-up-appear';

			var input = document.getElementById('urlInput');
			input.focus();

			selectMenu.hide();

			popUpOk.onclick =  function (e) {
				popUp.className = 'pop-up pop-up-disappear';
				setTimeout(function () {popUp.style.display = 'none';}, 380);
				var url = urlInput.value;

				var a = document.createElement('a');
				a.href = url;
				rng.surroundContents(a);
				// document.execCommand('createLink', false, url);
			};
		}
	}

	return init;
});