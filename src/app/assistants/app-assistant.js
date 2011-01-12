//  ---------------------------------------------------------------
//    GLOBALS
//  ---------------------------------------------------------------

SFI = {};

SFI.cookie = new Mojo.Model.Cookie('SpinForIt');

SFI.saveCookie = function() {
	var options = {
		'type': SFI.type
	};
	SFI.cookie.put(options);
};

SFI.loadCookie = function() {
	var cookieData = SFI.cookie.get() || {};

	SFI.type = cookieData.type || "hand";
};

function AppAssistant (appController) {
  this.sfi = {};

	// Constants
	this.sfi.MainStageName = "spinnerStage";
	this.sfi.versionString = "1.1.0";

	// Global Data Structures

	// Persistent Globals - will be saved across app launches

	//  Session Globals - not saved across app launches

}

//  -------------------------------------------------------
//  setup - all startup actions:
//    - Setup globals with preferences
//    - Set up application menu; used in every scene
//    - Open Depot and use contents for feedList
//    - Initiate alarm for first feed update

AppAssistant.prototype.setup = function() {

	// load preferences and globals from saved cookie
	//this.getPrefs();
};


AppAssistant.prototype.cleanup = function() {
	//this.setPrefs();
};

// -----------------------------------------
// handleCommand - called to handle app menu selections
//
AppAssistant.prototype.handleCommand = function(event) {
	var stageController = this.controller.getActiveStageController();
	var currentScene = stageController.activeScene();

	if (event.type == Mojo.Event.command) {
		switch (event.command) {

			//			case "doPrefs":
			//				stageController.pushScene("preferences");
			//			break;

			case "doHelp":
				stageController.pushAppSupportInfoScene();
				break;
		}
	}
};

