var etchasketch = new function() {
	var screen, controls, baseValue = 20;

	this.init = function(cfg) {
		screen = new Screen();
		screen.init({
			el: cfg.screenEl,
			cursorEl: cfg.cursorEl 
		});

		for (var i=0; i<cfg.listeners.length; i++) {
			var type = cfg.listeners[i].type,
				data = cfg.listeners[i].data || {};

			if (!(type in listeners)) {
				return false;
			}

			var listener = new listeners[type]();
			data.onValueChange = onValueChange;

			listener.init(data);
		}
	};

	function onValueChange(data) {
		console.log('onValueChange: data='+data);

		var isVertical = data.buttonType === 'vertical',
			value = Math.floor(baseValue * data.ratio);
			
		screen.onValueChange(isVertical, value);
	}

	var listeners = {
		Websockets: function() {
			this.init = function(cfg) {
				var socket = io.connect('http://localhost:8080');
			 	socket.on('control', cfg.onValueChange);
			};
		},
		postMessage: function() {
			var callback, el;

			this.init = function(cfg) {
				callback = cfg.onValueChange;
				window.addEventListener('message', function(evt) {
					callback(event.data);
				}, false)

				el = document.createElement('iframe');
				el.setAttribute('src', cfg.url);

				document.body.appendChild(el);
			};
		}
	};
}