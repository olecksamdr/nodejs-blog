define(function (require) {
	window.addEventListener('load', documentLoaded, false);

	var ajax = require('jsmodules/ajax/ajax');
	
	function documentLoaded() {
		// елемент для відображення анімації загрузки
		var fullScreen = document.querySelectorAll('.fullScreen')[0];

		// кнопки для видаоення і редагування статтей
		var removeBtn = document.querySelectorAll('.remove');
		var editBtn = document.querySelectorAll('.edit');

		for (var i = 0; i < removeBtn.length; i++) {
			removeBtn[i].addEventListener('click', remove, false);
		}

		for (var i = 0; i < editBtn.length; i++) {
			editBtn[i].addEventListener('click', edit, false);
		}

		function remove (e) {
			var id = e.target.getAttribute('data-id'),
				parent = e.target.parentNode;

			fullScreen.style.display = 'block';
			fullScreen.className = 'fullScreen appear';

			parent.className += ' disappear';
			setTimeout(function () {
				parent.style.display = 'none';
				parent.parentNode.removeChild(parent);
			},390);

			ajax.removeArticle(id, fullScreen);
		}

		function edit(e) {
			var id = e.target.getAttribute('data-id');

			window.location = '/editArticle/' + id;
		}
	}
});