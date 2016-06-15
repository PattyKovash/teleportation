var test = document.getElementById("mainContent");

// array of p elements of mainContent
var info = test.getElementsByTagName("p");

/* ===== Helper Functions ===== */

// Fade In 
function fadeIn(elem) {
	var opacity = .1;
	var timer = setInterval(function() {
		if (opacity >= 1) {
			clearInterval(timer);
		}
		elem.style.opacity = opacity;
		opacity += .1;
	}, 60);
};

// Fade Out with callback
function fadeOutAndCallback(elem, callback) {
	var opacity = 1;
	var timer = setInterval(function() {
		if (opacity < .1) {
			clearInterval(timer);
			callback();
		}
		elem.style.opacity = opacity;
		opacity -= .1;
	}, 50);	
};

// Function to Exchange text
function changeText(docElem, elemArray) {
	var temp = docElem.replaceChild(elemArray[1], elemArray[0]);
	docElem.appendChild(temp);

};

// Function to fade out current text, change current text, and fade in new text
function slideshow(docElem, elemArray) {
	fadeOutAndCallback(elemArray[0], function() {
			// Change the text
			changeText(docElem, elemArray);
			// Add opacity of 0 to the 1st element
			elemArray[0].style.opacity = "0";
			// Run fadeIn
			fadeIn(elemArray[0]);
		});
};

/* ===== End Helper Functions ===== */


window.addEventListener("click", function(e) {
	var count = 0;
	var timer = setInterval(function() {
		slideshow(test, info);
		count++;
		if (count !== 0) {
			clearInterval(timer);
			var counter = 0;
			var timer2 = setInterval(function() {
				if (counter > info.length - 3) {
					clearInterval(timer2);
				}
				slideshow(test, info);
				counter++;
			}, 4000);
		}
	}, 1500);
});