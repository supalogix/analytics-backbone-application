var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var AggregationButton = require("./AggregationButton");

var AggregationListModel = Backbone.Model.extend({
	defaults: {
		selectedAggregationType: "Day"
	}
});

module.exports = Backbone.View.extend({
	model: new AggregationListModel(),
	attributes: function() {
		return {
			id: "aggregate"
		}
	},
	initialize: function(options) {
		_.bindAll(this, "render");

		options.onAggregationTypeChanged(
			this.onAggregationTypeChanged.bind(this));

		this.aggregateByDay = options.aggregateByDay;
		this.aggregateByMonth = options.aggregateByMonth;
		this.aggregateByYear = options.aggregateByYear;

		this.model.on('change',
			this.render.bind(this));
	},
	onAggregationTypeChanged: function(type) {
		this.model.set({selectedAggregationType: type});
	},
	getButtons: function(selectedType) {
		var self = this;

		return ["Day", "Month", "Year"].map(function(type) {
			var selected = (type === selectedType);
			var command = getCommand(type);

			var Model = Backbone.Model.extend({
				defaults: {
					title: ""
				}
			});

			var className = selected ? "selected_button" : "button";

			var button = new AggregationButton({
				className: className,
				model: new Model({
					title: type,
					selected: selected,
				}),
				command: command
			});

			return button;
		});

		function getCommand(type) {
			if( type === "Day" )
				return self.aggregateByDay;
			else if ( type === "Month" )
				return self.aggregateByMonth;
			else
				return self.aggregateByYear;
		}
	},
	render: function() {
		var self = this;

		var type = this.model.get("selectedAggregationType");
		var buttons = this.getButtons(type);
		
		$(this.el).html("");
		buttons.forEach(function(button){
			$(self.el).append(button.render().el);
		});

		return this;
	}
});
