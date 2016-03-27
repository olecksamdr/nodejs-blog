define(function () {
	var resizeCanvas = document.createElement('canvas');

	function resizeImg(img, width) {
		var image = new Image();
		image.src = img.src;

		var height = width / image.width * image.height;
		// console.log(width);

		resizeCanvas.width = width;
		resizeCanvas.height = height;
		resizeCanvas.getContext('2d').drawImage(image, 0, 0, width, height);
		
		var data = resizeCanvas.toDataURL('image/jpeg', 1);
		
		// console.log(data);

		img.setAttribute('src', data);
		return data;
	}
	return resizeImg;

});