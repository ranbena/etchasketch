function Screen() {
	var el;

	var BOUNDS = {
		'top' : {
			'min': 0,
			'max': 200,
		},
		'left' : {
			'min': 0,
			'max': 200,
		}
	};

	this.init = function(cfg) {
		el = cfg.el;
		cursor.init({
			'parentEl': el
		});
	};

	this.onValueChange =function(isVertical, value) {
		cursor.move(isVertical, value);
	};

	var cursor = new function() {
		var el, position;

		this.init = function(cfg) {
			el = document.createElement('div');
			el.setAttribute('class', 'cursor');
			cfg.parentEl.appendChild(el);

			position = {
				top: el.offsetTop,
				left: el.offsetLeft
			};
		};

		this.move = function(isVertical, value) {
			// determine style attribute
			var attr = isVertical ? 'top' : 'left';

			// add change value to current position
			var newValue = position[attr] + value;

			// keep it in bounds
			if (newValue <= BOUNDS[attr].max && newValue >= BOUNDS[attr].min) {
				position[attr] = newValue;
				el.style[attr] = newValue+'px';	
			}
		};
	};
}