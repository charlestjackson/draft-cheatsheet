
Template.nav.selected_page = function() {
	
	if (Router.current_page() === this.toString()) {
		return "active";
	}
	
	return "";
}

Template.nav.all_pages = function() {
	pages = [ "cheatsheet", "draft" ];
	return pages;
}

Template.nav.events = {
	'click a' : function(e) {
		e.preventDefault();
		Router.navigate(this, {trigger: true});
	}
}

