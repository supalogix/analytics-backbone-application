var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

module.exports = Backbone.View.extend({
	template: _.template("<%= date %>"),
	attributes: function() {
		return {
			id: "chart_title"
		}
	},
	initialize: function(options) {
		_.bindAll(this, "render");

		options.onChartChanged(
			this.onChartChanged.bind(this));

		this.model.on('change',
			this.render.bind(this));
	},
	onChartChanged: function(data) {
		console.log(data);
		this.model.set({
			date: data["date"]
		});
	},
	render: function() {
		$(this.el).html( this.template(this.model.toJSON()) );
		return this;
	}
});
