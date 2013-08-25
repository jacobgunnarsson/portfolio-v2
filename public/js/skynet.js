var GLOBALS = {

	preload: {
		loader: [
			'img/sprite.png',
			'img/loader-bg.jpg'
		]
	}

};

(function(window, underfined) {
	'use strict';

	/*
	*	Bootstrap TweenLite/Max
	*/
	window.TL = TweenLite;

	window.TM = TweenMax;


	/*
	*	Soon to be self-aware
	*/
	var SKYNET = function() {

		this.init = function() {

			this.LoaderView.init();

		};

	};


	/*
	*	LoaderView
	*/
	SKYNET.prototype.LoaderView = {

		el: $('.loader'),

		events: function() {

		},

		init: function() {
			var self = this,
				preloader = new PxLoader();

			this.events();

			for (var i = 0; i < GLOBALS.preload.loader.length; ++i)
				preloader.addImage(GLOBALS.preload.loader[i]);

			preloader.addCompletionListener(function(e) {
				setTimeout(function() {
					self.startAnim();
				}, 100);
			});

			preloader.start();

		},

		startAnim: function() {
			var keyboardColors = [ 'black', 'teal', 'yellow', 'white' ],
				colorCounter = 1;

			function iconDoFlip() {
				TL.to('.loader-frame-black i, .loader-frame-white i', 0.65, { y: -7, force3D: true, ease: Power2.easeInOut });
				TL.to('.loader-frame-black i, .loader-frame-white i', 0.7, { rotationX: 360, force3D: true, delay: 0.1, ease: Power2.easeInOut,
					onComplete: function() {
						TL.set('.loader-frame-black i, .loader-frame-white i', { rotationX: 0});
					}
				});

				TL.to('.loader-frame-black i, .loader-frame-white i', 0.65, { y: 5, force3D: true, delay: 0.4, ease: Power2.easeOut });

				setTimeout(function() {
					$('.loader-frame-black i').removeClass().addClass('icon icon-keyboard-' + keyboardColors[colorCounter]);

					(colorCounter === keyboardColors.length - 1) ? colorCounter = 0 : ++colorCounter;
				}, 450);

				setTimeout(function() {
					iconDoFlip();
				}, 1600);
			}

			/*
			*	Prepare elements
			*/
			TL.set('.loader-frame-black span', { scale: 0.75, autoAlpha: 0 });
			TL.set('.loader-frame-black i', { y: 15, autoAlpha: 0 });

			/*
			*	Start animations
			*/
			TM.to('.loader-frame-bg', 40, { y: -550, force3D: true, yoyo: true, repeat: -1, ease: Linear.easeNone });
			TL.to('.loader-frame-overlay', 0.75, { autoAlpha: 0, force3D: true, delay: 0.3 });
			TL.to('.loader-frame-black span', 0.3, { autoAlpha: 1, force3D: true, delay: 0.5 });
			TL.to('.loader-frame-black span', 0.2, { scale: 1.1, force3D: true, delay: 0.5, ease: Power2.easeOut });
			TL.to('.loader-frame-black span', 0.3, { scale: 1, force3D: true, delay: 0.7, ease: Power2.easeOut });
			TL.to('.loader-frame-black i, .loader-frame-white i', 0.65, { y: 0, force3D: true, autoAlpha: 1, delay: 0.8, ease: Power2.easeOut,
				onComplete: function() {
					iconDoFlip();
				}
			});

		},

		showProgress: function(progress) {
			var y = $(window).height();

			TL.to('.loader-frame-progress', 1.5, { y: -y, force3D: true, ease: Power2.easeInOut });
		}

	};

	window.SKYNET = SKYNET;

})(window);

/*
*	Boot it up, launch the nukes
*/
var skyNet = new SKYNET();

skyNet.init();