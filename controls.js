(function() {
	var hasTouch = 'ontouchstart' in window;
	var POINTER = {
		'START': hasTouch ? 'touchstart' : 'mousedown',
		'MOVE':  hasTouch ? 'touchmove' : 'mousemove',
		'END': 	 hasTouch ? 'touchend' : 'mouseup'
	};

	function Controls() {
		var el, onValueChange;

		this.init = function(cfg) {
			el = cfg.el;
			onValueChange = cfg.onValueChange;

			createButton('vertical');
			createButton('horizontal');
		};

		function createButton(type) {
			new Button().init({
				type: type,
				parentEl: el,
				onValueChange: onValueChange
			});
		}
	}

	function Button() {
		var el, type, onChangeCallback, maxValue, styleAttr,
			startEvt, lastEvt, lastDirection = false;

		this.init = function(cfg) {
			type = cfg.type;
			onChangeCallback = cfg.onValueChange;

			el = document.createElement('button');
			el.setAttribute('data-role', cfg.type);
			cfg.parentEl.appendChild(el);

			el.addEventListener(POINTER.START, onPointerStart);
			el.addEventListener(POINTER.END, onPointerEnd);

			maxValue = el[cfg.type === 'vertical' ? 'offsetHeight' : 'offsetWidth'];
			styleAttr = (type === 'vertical') ? 'clientY' : 'clientX';
		};

		function onPointerStart(evt) {
			startEvt = lastEvt = evt;
			el.addEventListener(POINTER.MOVE, onPointerMove);
		}

		function onPointerMove(evt) {
			handleDirectionChange(evt);

			var delta = evt[styleAttr] - startEvt[styleAttr],
				ratio = delta/maxValue;

			if (ratio > 1) {
				ratio = 1;
			}

			lastEvt = evt;

			onChangeCallback(type, ratio);
		}

		function onPointerEnd() {
			el.removeEventListener(POINTER.MOVE, onPointerMove);
		}

		function handleDirectionChange(evt) {
			if (evt[styleAttr] === lastEvt[styleAttr]) {
				return false;
			}

			var currentDirection = evt[styleAttr] - lastEvt[styleAttr] > 0,
				changedDirection = currentDirection !== lastDirection;

			if (changedDirection) {
				startEvt = evt;
				lastDirection = currentDirection;
			}
		}
	}

	window.Controls = Controls;
})();