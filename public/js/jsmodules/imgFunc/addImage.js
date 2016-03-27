// *************************************
// Ф-ції для додавання нового зображення
// *************************************

// В якості параметру передається <input type=file >
define(['../elements/loadImageInput'], function (input) {
	function addImage(img, callback) {
		input.click();

		input.onchange = function(e) {
			var files = e.target.files;
			var f = files[0];
			var reader = new FileReader();

			reader.onload = function (e) {
				img.setAttribute('data-name', f.name);
				img.setAttribute('src', e.target.result);

				console.log(img);
				console.log(e.target.result);

				if (callback)
					callback(img, 600); // 800
				};
			reader.readAsDataURL(f);
		};
	}

return addImage;
});


