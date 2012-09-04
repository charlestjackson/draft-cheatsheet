
Template.cheatsheet.players = function() {
	return Players.find({}, {sort: {overall_pos: 1}});
}

Template.cheatsheet.selected_name = function() {
	var player = Players.findOne(Session.get("selected_player"));
	return player && player.name;
} 

Template.player.selected = function() {
	return Session.equals("selected_player", this._id) ? "selected" : '';
}

Template.player.pos_color = function() {
	if (Session.equals("selected_player", this._id)) {
		return 'selected';
	}
	
	return this.position.toLowerCase();
}

Template.player.events = {
	'click' : function() {
		Session.set("selected_player", this._id);
	},
	
	'mouseover .player, touchstart .player' : function(e) {
		var $target = $(e.target);
		var $playerContainer = $target.hasClass('player') ? $target : $target.parents('.player');
		$playerContainer.draggable({ containment: 'parent' });
	}
}

$(function() {

	var dragStartPosition;

	$('body').on('dragstart', '.player', function(e) {
		console.log('jq dragstart');
		dragStartPosition = $(e.target).position();
	});

	$('body').on('dragstop', '.player', function(e) {
		console.log('jq dragstop');

		console.log($(e.target).position());

		var $target = $(e.target);
		var targetPName = $target.find(".name").text();
		console.log("checking " + targetPName);
		var pos = $target.position();

		if (pos.top < dragStartPosition.top) {
			checkUp($target);
		} else {
			checkDown($target);
		}
	});

	function checkUp($target) {
		var pos = $target.position();
		var targetPName = $target.find(".name").text();
		var startingPos = parseInt($target.find(".overall_pos").text());
		var newOverall = startingPos;
		console.log("player started at " + newOverall);

		$target.prevAll().each(function() {
			var $this = $(this);
			var sibpos = $this.position();
			if (pos.top < sibpos.top) {
				var pname = $this.find(".name").text();
				console.log("moving to above " + pname);
				var player = Players.findOne({ name: pname });
				if (player.overall_pos < newOverall) {
					newOverall = player.overall_pos;
					console.log("overall_pos: " + player.overall_pos);
				}

			}
		});

		if (newOverall != startingPos) {
			console.log("incrementing by 1 for positions " + newOverall + " through " + startingPos);
			console.log("updating " + targetPName + " to " + newOverall);
			Players.update( { overall_pos : { $gte : newOverall, $lt : startingPos } }, { $inc : { overall_pos : 1 } }, { multi : true });
			Players.update( { name : targetPName }, { $set : { overall_pos : newOverall } }, { multi : false} );
		}
	}

	function checkDown($target) {
		var pos = $target.position();
		var targetPName = $target.find(".name").text();
		var startingPos = parseInt($target.find(".overall_pos").text());
		var newOverall = startingPos;
		console.log("player started at " + newOverall);

		$target.nextAll().each(function() {
			var $this = $(this);
			var sibpos = $this.position();
			if (pos.top > sibpos.top) {
				var pname = $this.find(".name").text();
				console.log("moving to above" + pname);
				var player = Players.findOne({ name : pname});
				newOverall = player.overall_pos;
				console.log("overall_pos: " + player.overall_pos);
				return false;
			}
		});

		if (newOverall != startingPos) {
			console.log("decrementing by 1 for positions " + newOverall + " through " + startingPos);
			console.log("updating " + targetPName + " to " + newOverall);
			Players.update( { overall_pos : { $gt : startingPos, $lte : newOverall } }, { $inc : { overall_pos : -1 } }, { multi : true });
			Players.update( { name : targetPName }, { $set : { overall_pos : newOverall } }, { multi : false} );
		}
	}

});

