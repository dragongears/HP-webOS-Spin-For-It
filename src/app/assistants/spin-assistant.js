function SpinAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

SpinAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	var appController = Mojo.Controller.getAppController();
	this.sfi = appController.assistant.sfi;

	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	var scrollHeight = (this.controller.window.innerHeight) + 'px';
	$('spinner-container').setStyle({height: scrollHeight});

	/* setup widgets here */
	this.spinButtonModel = {
		buttonLabel : 'Spin',
		buttonClass : '',
		disabled : false
	};

	this.controller.setupWidget("SpinButton", {}, this.spinButtonModel);


	this.controller.setupWidget("SpinnerSelect",
		this.selectAttributes = {
			label: "Spinner style",
			choices: [
				{label: "Hand", value: 'hand'},
				{label: "Arrow", value: 'arrow'},
				{label: "Bottle", value: 'bottle'},
				{label: "Spinner", value: 'spinner'}
			]},
		this.selectModel = {
			value: 'hand',
			disabled: false
		}
  );

	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.window, 'resize', this.handleWindowResize.bindAsEventListener(this), false);
	Mojo.Event.listen(this.controller.get('SpinButton'), Mojo.Event.tap, this.handleSpinButtonTap.bind(this));
	Mojo.Event.listen(this.controller.get("SpinnerSelect"), Mojo.Event.propertyChange, this.handleSelectChange.bind(this));

	this.spinButtonModel.disabled = true;
	this.controller.modelChanged(this.spinButtonModel);

	this.spinAngle = Math.floor(Math.random()*360);
	this.spinPointer = $('pointer');
	this.handleSpin(this.spinAngle);
	this.spin();
};

SpinAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

SpinAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

SpinAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening(this.controller.get('SpinButton'), Mojo.Event.tap, this.handleSpinButtonTap);
	this.controller.stopListening(this.controller.get('SpinnerSelect'), Mojo.Event.propertyChange, this.handleSelectChange);
	this.controller.stopListening(this.controller.window, 'resize', this.handleWindowResize);
};

SpinAssistant.prototype.handleSpinButtonTap = function(event){
	this.spinButtonModel.disabled = true;
	this.controller.modelChanged(this.spinButtonModel);
	this.spin();
};

SpinAssistant.prototype.spin = function(){
	this.spinnerAnimator = Mojo.Animation.animateValue(Mojo.Animation.queueForElement(this.spinPointer),
		"bezier", this.handleSpin.bind(this), {
			from: 0,
			to: 3600 + (Math.floor(Math.random()*360)),
			currentValue: this.spinAngle,
			curve:'ease-out',
			duration: 5,
			onComplete:this.handleSpinEnd.bind(this)
	});
};

SpinAssistant.prototype.handleSpin = function(num){
	this.spinAngle = num;
	this.spinPointer.setStyle({'-webkit-transform': 'rotate('+ (num) +'deg)'});
};

SpinAssistant.prototype.handleSpinEnd = function(){
	this.spinAngle = this.spinAngle % 360;
	this.spinButtonModel.disabled = false;
	this.controller.modelChanged(this.spinButtonModel);
};

SpinAssistant.prototype.handleSelectChange = function(event){
	this.spinPointer.setAttribute("class", this.selectModel.value);
};

SpinAssistant.prototype.handleWindowResize = function(event){
	var scrollHeight = (this.controller.window.innerHeight) + 'px';
	$('spinner-container').setStyle({height: scrollHeight});
};

