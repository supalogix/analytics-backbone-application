var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

module.exports = Backbone.View.extend({
	tagName: "div",	
	className: "list_item",
	template: _.template("<%= date %>"),
	initialize: function() {
		_.bindAll(this, "render");
	},
	events: {
		"click": "onClick"
	},
	onClick: function() {
		var date = this.model.date;
		this.model.command.execute(date);
	},
	render: function() {
		$(this.el).html( this.template(this.model) );
		
		return this;
	}
});

