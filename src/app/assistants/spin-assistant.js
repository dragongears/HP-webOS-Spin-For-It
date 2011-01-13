function SpinAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

SpinAssistant.prototype.setup = function() {
	SFI.loadCookie();

	this.MenuAttr = {omitDefaultItems: true};

	this.MenuModel = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{label: "Preferences...", command: "doPrefs"},
			{label: "Help...", command: "doHelp"}
		]
	};

	this.controller.setupWidget(Mojo.Menu.appMenu, this.MenuAttr, this.MenuModel);

	/* this function is for setup tasks that have to happen when the scene is first created */
	var appController = Mojo.Controller.getAppController();
	this.sfi = appController.assistant.sfi;

	this.spinAngle = Math.floor(Math.random()*360);
	this.spinPointer = $('pointer');
	this.spinPointer.setAttribute("class", SFI.type);

	if (SFI.start.indexOf('t') == -1) {
		$('spin').setAttribute('class', 'nobutton');
	} else {
		$('spin').removeAttribute('class');
	}

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
			label: "Pointer",
			choices: [
				{label: "Arrow", value: 'arrow'},
				{label: "Bottle", value: 'bottle'},
				{label: "Hand", value: 'hand'},
				{label: "Spinner", value: 'spinner'}
			]},
		this.selectModel = {
			value: SFI.type,
			disabled: false
		}
  );

	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.get('pointer'), Mojo.Event.flick, this.handleSpinnerFlick.bind(this));
	Mojo.Event.listen(this.controller.window, 'resize', this.handleWindowResize.bindAsEventListener(this), false);
	Mojo.Event.listen(this.controller.get('SpinButton'), Mojo.Event.tap, this.handleSpinButtonTap.bind(this));
	Mojo.Event.listen(this.controller.get("SpinnerSelect"), Mojo.Event.propertyChange, this.handleSelectChange.bind(this));

	this.handleSpin(this.spinAngle);
	var self = this;
	setTimeout(function() {
		self.spin();
	}, 1000);
	//this.spin();
};

SpinAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

SpinAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	SFI.saveCookie();
	Mojo.Controller.stageController.setWindowProperties({blockScreenTimeout: false});
};

SpinAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening(this.controller.get('pointer'), Mojo.Event.flick, this.handleSpinnerFlick);
	this.controller.stopListening(this.controller.get('SpinButton'), Mojo.Event.tap, this.handleSpinButtonTap);
	this.controller.stopListening(this.controller.get('SpinnerSelect'), Mojo.Event.propertyChange, this.handleSelectChange);
	this.controller.stopListening(this.controller.window, 'resize', this.handleWindowResize);
};

SpinAssistant.prototype.handleSpinnerFlick = function(event){
	if (SFI.start.indexOf('f') != -1) {
		this.spinButtonModel.disabled = true;
		this.controller.modelChanged(this.spinButtonModel);
		this.spin();
	}
};

SpinAssistant.prototype.handleSpinButtonTap = function(event){
	this.spin();
};

SpinAssistant.prototype.spin = function(){
	Mojo.Controller.stageController.setWindowProperties({blockScreenTimeout: true});
	this.spinButtonModel.disabled = true;
	this.controller.modelChanged(this.spinButtonModel);
	this.spinnerAnimator = Mojo.Animation.animateValue(Mojo.Animation.queueForElement(this.spinPointer),
		"bezier", this.handleSpin.bind(this), {
			from: 0,
			to: SFI.times[SFI.time].rotation + (Math.floor(Math.random()*360)),
			currentValue: this.spinAngle,
			curve:'ease-out',
			duration: SFI.times[SFI.time].duration,
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
	Mojo.Controller.stageController.setWindowProperties({blockScreenTimeout: false});
};

SpinAssistant.prototype.handleSelectChange = function(event){
	SFI.type = this.selectModel.value;
	this.spinPointer.setAttribute("class", SFI.type);
};

SpinAssistant.prototype.handleWindowResize = function(event){
	var scrollHeight = (this.controller.window.innerHeight) + 'px';
	$('spinner-container').setStyle({height: scrollHeight});
};

