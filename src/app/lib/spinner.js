function Spinner() {
	this.count = 0;
}

Spinner.prototype.spin = function(callback) {
	this.callback = callback;
	this.delay =  Math.random()*36;
	this.handleSpinTimeout = this.spinTimeout.bind(this);
	this.timer = setTimeout(this.handleSpinTimeout, this.delay);
};

Spinner.prototype.spinTimeout = function(event) {
	this.count += 10;
	this.delay += 0.1;
	var pointer = $('pointer');
	pointer.setStyle({'-webkit-transform': 'rotate('+ (this.count) +'deg)'});
	if (this.delay < 70) {
		this.timer = setTimeout(this.handleSpinTimeout, Math.floor(this.delay));
	} else {
		if (this.callback !== undefined) {
			this.callback();
		}
	}
};

