define(function() {

//*********************
//		UTILS
//*********************

// insertAdjasent emulation

if (typeof HTMLElement != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
	HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
		switch (where) {
			case 'beforeBegin':
				this.parentNode.insertBefore(parsedNode, this)
			break;
			case 'afterBegin':
				this.insertBefore(parsedNode, this.firstChild);
			break;
			case 'beforeEnd':
				this.appendChild(parsedNode);
			break;
			case 'afterEnd':
				if (this.nextSibling) this.parentNode.insertBefore(parsedNode, this.nextSibling);
				else this.parentNode.appendChild(parsedNode);
			break;
		}
	}

	HTMLElement.prototype.insertAdjacentHTML = function(where, htmlStr) {
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var parsedHTML = r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where, parsedHTML)
	}


	HTMLElement.prototype.insertAdjacentText = function(where, txtStr) {
		var parsedText = document.createTextNode(txtStr)
		this.insertAdjacentElement(where, parsedText)
	}
}

function insertAfter(elem, refElem) {
	var parent = refElem.parentNode;
	var next = refElem.nextSibling;
	if (next) {
		return parent.insertBefore(elem, next);
	} else {
		return parent.appendChild(elem);
	}
}

function wrap(elem, refElem) {
	if (typeof refElem == 'string') {
		var r = elem.ownerDocument.createRange();
		r.setStartBefore(elem);
		refElem = r.createContextualFragment(refElem);

		var clone = elem.cloneNode();
		clone.innerHTML = elem.innerHTML;

		refElem.firstElementChild.appendChild(clone);

		var parent = elem.parentNode;
		parent.replaceChild(refElem, elem);
	} else {
		var clone = elem.cloneNode();
		clone.innerHTML = elem.innerHTML;

		refElem.appendChild(clone);

		var parent = elem.parentNode;
		parent.replaceChild(refElem, elem);
	}
}

function getOffset(elem) {
	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0;
	var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top = box.top + scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return {top: top, left: left};
}

function hasClass(el, cls) {
	return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

function delControls () {
	var controls = document.querySelectorAll('.rm');
	for (var i = 0; i < controls.length; i++) {
		// controls[i].parentNode.removeChild(controls[i]);
		controls[i].style.display = 'none';
	}
}

function showControls () {
	var controls = document.querySelectorAll('.rm');
	for (var i = 0; i < controls.length - 1; i++) {
		// controls[i].parentNode.removeChild(controls[i]);
		controls[i].className += ' appear';
		controls[i].style.display = 'block';
	}
}

return {
	insertAfter: insertAfter,
	wrap: wrap,
	getOffset: getOffset,
	hasClass: hasClass,
	delControls: delControls,
	showControls: showControls
};

});