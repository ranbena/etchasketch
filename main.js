var etchasketch = new function() {
	var screen, controls, baseValue = 20;

	this.init = function(cfg) {
		screen = new Screen();
		screen.init({
			el: cfg.screenEl,
			cursorEl: cfg.cursorEl 
		});
		controls = new Controls();
		controls.init({
			el: cfg.controlsEl,
			onValueChange: onValueChange
		});
	};

	function onValueChange(buttonType, ratio) {
		var isVertical = buttonType === 'vertical',
			value = Math.floor(baseValue * ratio);
			
		screen.onValueChange(isVertical, value);
	}
}