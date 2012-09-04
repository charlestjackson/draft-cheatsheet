
var PageRouter = ReactiveRouter.extend( {
	routes: {
		'' : 'cheatsheet',
		'cheatsheet' : 'cheatsheet',
		'draft' : 'draft'
	},
	
	cheatsheet: function() {
		this.goto("cheatsheet");
	},
	
	draft: function() {
		this.goto("draft");
	},
	
	main: function(page_id) {
		this.goto(page_id)
	}
});

Router = new PageRouter();

Meteor.startup(function() {
	Backbone.history.start();
	Router.current_page("cheatsheet");
});