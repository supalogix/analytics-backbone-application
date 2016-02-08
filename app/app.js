var Backbone = require("backbone");
var Main = require("./component/Main");
var Factory = require("./factory/Factory");
var WindowDomFacade = require("window-dom-facade");

var analyticsFacade = Factory.analyticsFacade;
var windowFacade = Factory.windowDomFacade;

new Main({
	facade:analyticsFacade,
	windowFacade: windowFacade });

analyticsFacade
	.getCommand("LOAD")
	.execute();
