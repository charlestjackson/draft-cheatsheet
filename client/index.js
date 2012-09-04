
var PageRouter = ReactiveRouter.extend( {
	routes: {
		'' : 'cheatsheet',
		':page_id' : 'main'
	},
	
	cheatsheet: function() {
		this.goto("cheatsheet");
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