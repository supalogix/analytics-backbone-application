var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

module.exports = Backbone.View.extend({
	tagName: "div",
	className: "button",
	template: _.template("<%= title %>"),
	initialize: function(options) {
		_.bindAll(this, "render");

		this.command = options.command;
	},
	events: {
		"click": "onClick"
	},
	onClick: function() {
		this.command.execute();
	},
	render: function() {
		$(this.el).html( this.template(this.model.toJSON()) );
		return this;
	}
});
