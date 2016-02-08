var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var d3Chart = require("d3Chart");

module.exports = Backbone.View.extend({
	attributes: function() {
		return {
			id: "chart"
		}
	},
	initialize: function(options) {
		_.bindAll(this, "render");

		options.onChartChanged(
			this.onChartChanged.bind(this));
		options.onWindowResized(
			this.onWindowResized.bind(this));

		this.model.on('change',
			this.onModelUpdated.bind(this));


		this.createChart();
	},
	createChart: function() {
		var props = this.model.get("props");

		var chart = new d3Chart();
		chart.create(
			this.el,
			props,
			this.model.get("data")
		);
	},
	onModelUpdated: function() {
		var props = this.model.get("props");
		var data = this.model.get("data")

		var chart = new d3Chart();
		chart.update(this.el, props, data);
	},
	onWindowResized: function() {
		var clientWidth = this.el.clientWidth;

		this.model.set({
			props: {
				width: clientWidth,
				height: 300
			}
		});
	},
	onChartChanged: function(data) {
		var items = data.items.map(function(item) {
			return {
				label: item.name,
				value: item.value
			}
		});

		var clientWidth = this.el.clientWidth;

		this.model.set({
			props: {
				width: clientWidth,
				height: 300,
				enableTransition: true,
				duration: 1000
			},
			data: items
		});
	},
	render: function() {
		return this;
	}
});
