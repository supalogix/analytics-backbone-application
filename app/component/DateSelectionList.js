var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var ListItem = require("./ListItem");

var DateSelectionListModel = Backbone.Model.extend({
	defaults: {
		items: [],
		selectedDate: ""
	}
});

module.exports = Backbone.View.extend({
	model: new DateSelectionListModel(),
	attributes: function() {
		return {
			id: "list"
		}
	},
	initialize: function(options) {
		_.bindAll(this, "render");

		options.onDatesUpdated(
			this.onLoad.bind(this));
		options.onSelectedDateChanged(
			this.onSelectedDateChanged.bind(this));

		this.changeSelectedDate = options.changeSelectedDate;

		this.model.on('change',
			this.render.bind(this));

	},
	onLoad(data) {
		this.model.set({
			items: data
		});
	},
	onSelectedDateChanged(date) {
		this.model.set({
			selectedDate: date	
		});
	},
	render: function() {
		var rows = getRows(
			this.model.get("items"),
			this.changeSelectedDate,
			this.model.get("selectedDate"));

		$(this.el).html("");

		var self = this;
		rows.forEach(function(row) {
			$(self.el).append( row.render().el );
		});

		return this;
	}
});

function getRows(items, command, selectedDate) {
	return items.map(function(date) {
		var selected = false;

		if( selectedDate === date ) 
			selected = true;

		var className = selected ? "selected_list_item" : "list_item";

		var model = {
			model: {
				selected: selected,
				command: command,
				date: date
			},
			className: className
		};
		return new ListItem(model);
	});
}
