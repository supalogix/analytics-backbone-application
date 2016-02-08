var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var COMMAND = require("analytics-facade").COMMAND;
var EVENT = require("analytics-facade").EVENT;
var WINDOW_EVENT = require("window-dom-facade").EVENT;

var ChartTitle = require("./ChartTitle");
var Chart = require("./Chart");
var AggregationList = require("./AggregationList");
var DateSelectionList = require("./DateSelectionList");

module.exports = Backbone.View.extend({
	el: $("body"),
	attributes: function() {
		return {
			id: "main"
		}
	},
	initialize: function(options) {
		_.bindAll(this, "render");

		var facade = options.facade;
		var windowFacade = options.windowFacade;

		//
		// Delegates
		//
		this.onChartChanged = facade.getDelegate(
			EVENT.CHART_CHANGED);
		this.onAggregationTypeChanged = facade.getDelegate(
			EVENT.AGGREGATION_TYPE_CHANGED);
		this.onDatesUpdated = facade.getDelegate(
			EVENT.DATES_UPDATED);
		this.onSelectedDateChanged = facade.getDelegate(
			EVENT.SELECTED_DATE_CHANGED);
		this.onWindowResized = windowFacade.getDelegate(
			WINDOW_EVENT.WINDOW_RESIZED);

		//
		// Commands
		//
		this.changeSelectedDate = facade.getCommand(
			COMMAND.CHANGE_SELECTED_DATE);
		this.aggregateByDay = facade.getCommand(
			COMMAND.AGGREGATE_BY_DAY);
		this.aggregateByMonth = facade.getCommand(
			COMMAND.AGGREGATE_BY_MONTH);
		this.aggregateByYear = facade.getCommand(
			COMMAND.AGGREGATE_BY_YEAR);

		this.render();
	},
	render: function() {
		var ChartTitleModel = Backbone.Model.extend({
			defaults: {
				date: "Loading ..."
			}
		});
		var ChartModel = Backbone.Model.extend({
			defaults: {
				props: {
					width: 300,
					height: 300
				},
				data: []
			}
		});

		var width = this.el.clientWidth;
		
		var chartTitle = new ChartTitle({
			onChartChanged: this.onChartChanged,
			model: new ChartTitleModel({
				date: "Loading ..."
			})
		});

		var chart = new Chart({
			onChartChanged: this.onChartChanged,
			onWindowResized: this.onWindowResized,
			model: new ChartModel({
				props: {
					width: width,
					height: 300
				},
				data: []
			})
		});

		var aggregationList = new AggregationList({
			onAggregationTypeChanged: this.onAggregationTypeChanged,
			aggregateByDay: this.aggregateByDay,
			aggregateByMonth: this.aggregateByMonth,
			aggregateByYear: this.aggregateByYear,
		});

		var dateSelectionList = new DateSelectionList({
			onDatesUpdated: this.onDatesUpdated,
			onSelectedDateChanged: this.onSelectedDateChanged,
			changeSelectedDate: this.changeSelectedDate,
		});

		$(this.el).html("");
		$(this.el).append( chartTitle.render().el );
		$(this.el).append( chart.render().el );
		$(this.el).append( aggregationList.render().el );
		$(this.el).append( dateSelectionList.render().el );

		return this;
	}
});
