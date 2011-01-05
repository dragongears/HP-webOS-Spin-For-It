//  ---------------------------------------------------------------
//    GLOBALS
//  ---------------------------------------------------------------

// Spinner namespace

// Constants

// Global Data Structures

// Persistent Globals - will be saved across app launches

function AppAssistant (appController) {
  this.sfi = {};

	// Constants
	this.sfi.MainStageName = "spinnerStage";
	this.sfi.versionString = "1.0.0";

	// Global Data Structures
	this.sfi.spinner = new Spinner();

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

