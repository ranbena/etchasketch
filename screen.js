function Screen() {
	var el;

	var LIMITS = {
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
			'el': cfg.cursorEl
		})
	};

	this.onValueChange =function(isVertical, value) {
		cursor.move(isVertical, value);
	};

	var cursor = new function() {
		var el, position;

		this.init = function(cfg) {
			el = cfg.el;
			position = {
				top: el.offsetTop,
				left: el.offsetLeft
			};
		};

		this.move = function(isVertical, value) {
			var attr = isVertical ? 'top' : 'left',
				newValue = position[attr] + value;

			if (newValue <= LIMITS[attr].max && newValue >= LIMITS[attr].min) {
				position[attr] = newValue;
				el.style[attr] = newValue+'px';	
			}
		};
	};
}