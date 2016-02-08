var Service = require("service").default;
var AnalyticsFacade = require("analytics-facade").default;
var WindowDomFacade = require("window-dom-facade");

var service = new Service();
var analyticsFacade = new AnalyticsFacade( service );
var windowDomFacade = new WindowDomFacade();

module.exports = {
	analyticsFacade: analyticsFacade,
	windowDomFacade: windowDomFacade
};
