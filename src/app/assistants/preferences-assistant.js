function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

PreferencesAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	this.controller.setupWidget("StartSelect",
		this.startSelectAttributes = {
			choices: [
				{label: "Button Tap", value: 't'},
				{label: "Flick", value: 'f'},
				{label: "Button Tap or Flick", value: 'tf'}
			]},
		this.startSelectModel = {
			value: SFI.start,
			disabled: false
		}
  );

	this.controller.setupWidget("DurationSelect",
		this.durationSelectAttributes = {
			choices: [
				{label: "Short", value: 0},
				{label: "Normal", value: 1},
				{label: "Long", value: 2},
				{label: "Very Long", value: 3}
			]},
		this.durationSelectModel = {
			value: SFI.time,
			disabled: false
		}
  );


	/* add event handlers to listen to events from widgets */
	Mojo.Event.listen(this.controller.get("StartSelect"), Mojo.Event.propertyChange, this.handleStartChange.bind(this));
	Mojo.Event.listen(this.controller.get("DurationSelect"), Mojo.Event.propertyChange, this.handleDurationChange.bind(this));
};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening(this.controller.get('StartSelect'), Mojo.Event.propertyChange, this.handleStartChange);
	this.controller.stopListening(this.controller.get('DurationSelect'), Mojo.Event.propertyChange, this.handleDurationChange);
};

PreferencesAssistant.prototype.handleStartChange = function(event){
	SFI.start = this.startSelectModel.value;
	if (SFI.start.indexOf('t') == -1) {
		$('spin').setAttribute('class', 'nobutton');
	} else {
		$('spin').removeAttribute('class');
	}
};

PreferencesAssistant.prototype.handleDurationChange = function(event){
	SFI.time = this.durationSelectModel.value;
};


