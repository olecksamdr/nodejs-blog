
// *************************************
// Ф-ції для зміни розміру забраження
// *************************************
define(function (require) {
var resizeCanvas = document.createElement('canvas');
var getOffset = require('../utils').getOffset;

	function resizeableImage (imageTarget, control) {
		var container,
		origSrc = new Image(),
		eventState = {},
		constrain = false,
		minWidth = 60,
		minHeight = 60,
		maxWidth = 800,
		maxHeight = 900,

		div, div2, div3, div4;

	var init = function () {
			// Create a new image with a copy of the original src
			// When resizing, we will always use this original copy as the base
			origSrc.src = imageTarget.src;
			console.log('image');
			console.log(origSrc.src);

			// Add resize handles
			var parent = imageTarget.parentNode;

			div = document.createElement('div');
			div.className = 'resize-handle resize-handle-nw';
			parent.insertBefore(div, imageTarget);

			div2 = div.cloneNode();
			div.className = 'resize-handle resize-handle-ne';
			parent.insertBefore(div2, div);


			var insertAfter = require('../utils').insertAfter;

			div3 = div.cloneNode();
			div3.className = 'resize-handle resize-handle-se';
			insertAfter(div3, imageTarget);


			div4 = div.cloneNode();
			div4.className = 'resize-handle resize-handle-sw';
			insertAfter(div4, div3);

			container = parent;

			console.log('container');
			console.log(container);
			
			div.addEventListener('mousedown', startResize, false);
			div2.addEventListener('mousedown', startResize, false);
			div3.addEventListener('mousedown', startResize, false);
			div4.addEventListener('mousedown', startResize, false);
		};

		startResize = function(e){
			e.preventDefault();
			e.stopPropagation();
			saveEventState(e);
			document.addEventListener('mousemove', resizing);
			document.addEventListener('mouseup', endResize);
		};

		endResize = function(e){
			e.preventDefault();
			document.removeEventListener('mousemove', resizing);

		try {
			container.removeChild(div);
			container.removeChild(div2);
			container.removeChild(div3);
			container.removeChild(div4);
		} catch(e){}

			control.style.display = 'block';
			control.nextElementSibling.style.display = 'block';
			control.previousElementSibling.previousElementSibling.style.display = 'block';
			control.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'block';
			control.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display = 'block';
			// document.removeEventListener('');
			// document.addEventListener('mouseup touchend', endResize);
			// document.addEventListener('mousemove touchmove', resizing);
		};

		saveEventState = function (e) {
		// Save the initial event details and container state
		eventState.containerWidth = container.offsetWidth;
		eventState.containerHeight = container.offsetHeight;
		var offset = getOffset(container);

		eventState.containerLeft = offset.left; 
		eventState.containerTop = offset.top;

		// ?
		eventState.mouseX = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + window.pageXOffset; 
		eventState.mouseY = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + window.pageYOffset;

		// This is a fix for mobile safari
		// For some reason it does not allow a direct copy of the touches property
		if(typeof e.touches !== 'undefined'){
			eventState.touches = [];
			$.each(e.originalEvent.touches, function(i, ob){
			eventState.touches[i] = {};
			eventState.touches[i].clientX = 0+ob.clientX;
			eventState.touches[i].clientY = 0+ob.clientY;
			});
		}
		eventState.evnt = e;
	}

	resizing = function(e){ 
		var mouse={},width,height,left,top,offset = getOffset(container);
		mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) +  window.pageXOffset; 
		mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + window.pageYOffset;

		// Position image differently depending on the corner dragged and constraints
		if( /resize-handle-se/.test(eventState.evnt.target.className) ){
			width = mouse.x - eventState.containerLeft;
			height = mouse.y - eventState.containerTop;
			left = eventState.containerLeft;
			top = eventState.containerTop;
		} else if(/resize-handle-sw/.test(eventState.evnt.target.className) ){
			width = eventState.containerWidth - (mouse.x - eventState.containerLeft);
			height = mouse.y - eventState.containerTop;
			left = mouse.x;
			top = eventState.containerTop;
		} else if( /resize-handle-nw/.test(eventState.evnt.target.className) ){
			width = eventState.containerWidth - (mouse.x - eventState.containerLeft);
			height = eventState.containerHeight - (mouse.y - eventState.containerTop);
			left = mouse.x;
			top = mouse.y;
			if(constrain || e.shiftKey){
				top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
			}
		} else if( /resize-handle-ne/.test(eventState.evnt.target.className) ){
			width = mouse.x - eventState.containerLeft;
			height = eventState.containerHeight - (mouse.y - eventState.containerTop);
			left = eventState.containerLeft;
			top = mouse.y;
			if(constrain || e.shiftKey){
				top = mouse.y - ((width / origSrc.width * origSrc.height) - height);
				}
			}

		// Optionally maintain aspect ratio
		if(constrain || e.shiftKey){
			height = width / origSrc.width * origSrc.height;
		}

		if(width > minWidth && height > minHeight && width < maxWidth && height < maxHeight){
			// To improve performance you might limit how often resizeImage() is called
			resizeImage(width, height);  
			// Without this Firefox will not re-calculate the the image dimensions until drag end
		// container.style.left = left + 'px';
		// container.style.top = top + 'px';
		}
}

	resizeImage = function(width, height){
		resizeCanvas.width = width;
		resizeCanvas.height = height;
		resizeCanvas.getContext('2d').drawImage(origSrc, 0, 0, width, height);
		imageTarget.setAttribute('src', resizeCanvas.toDataURL('image/jpeg', 1));
		// imageTarget.src = resizeCanvas.toDataURL("image/png");
	};

	init();
};

return resizeableImage;
}); 





