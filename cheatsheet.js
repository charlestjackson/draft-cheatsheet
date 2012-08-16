Players = new Meteor.Collection("players");

if (Meteor.is_client) {

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
}

if (Meteor.is_server) {
	Meteor.startup(function () {
			// code to run on server at startup

			Players.remove({});

			if (Players.find().count() == 0) {
			Players.insert({overall_pos: 1, name: "Arian Foster", team: "Hou", position: "RB", adp: 1.7 });      
			Players.insert({overall_pos: 2, name: "Aaron Rodgers", team: "GB", position: "QB", adp: 2.8 });      
			Players.insert({overall_pos: 3, name: "Ray Rice", team: "Bal", position: "RB", adp: 3.1 });      
			Players.insert({overall_pos: 4, name: "LeSean McCoy", team: "Phi", position: "RB", adp: 4.4 });      
			Players.insert({overall_pos: 5, name: "Tom Brady", team: "NE", position: "QB", adp: 5.5 });      
			Players.insert({overall_pos: 6, name: "Calvin Johnson", team: "Det", position: "WR", adp: 6.9 });      
			Players.insert({overall_pos: 7, name: "Drew Brees", team: "NO", position: "QB", adp: 7.2 });      
			Players.insert({overall_pos: 8, name: "Maurice Jones-Drew", team: "Jac", position: "RB", adp: 7.2 });      
			Players.insert({overall_pos: 9, name: "Chris Johnson", team: "Ten", position: "RB", adp: 9.9 });      
			Players.insert({overall_pos: 10, name: "Larry Fitzgerald", team: "Ari", position: "WR", adp: 12.1 });      
			Players.insert({overall_pos: 11, name: "Matthew Stafford", team: "Det", position: "QB", adp: 12.8 });      
			Players.insert({overall_pos: 12, name: "Ryan Mathews", team: "SD", position: "RB", adp: 13.5 });      
			Players.insert({overall_pos: 13, name: "Andre Johnson", team: "Hou", position: "WR", adp: 13.8 });      
			Players.insert({overall_pos: 14, name: "Rob Gronkowski", team: "NE", position: "TE", adp: 14.3 });      
			Players.insert({overall_pos: 15, name: "Cam Newton", team: "Car", position: "QB", adp: 17.2 });      
			Players.insert({overall_pos: 16, name: "Matt Forte", team: "Chi", position: "RB", adp: 17.4 });      
			Players.insert({overall_pos: 17, name: "Roddy White", team: "Atl", position: "WR", adp: 18.6 });      
			Players.insert({overall_pos: 18, name: "Greg Jennings", team: "GB", position: "WR", adp: 19.5 });      
			Players.insert({overall_pos: 19, name: "Marshawn Lynch", team: "Sea", position: "RB", adp: 19.8 });      
			Players.insert({overall_pos: 20, name: "Jimmy Graham", team: "NO", position: "TE", adp: 21.2 });      
			Players.insert({overall_pos: 21, name: "Wes Welker", team: "NE", position: "WR", adp: 22.2 });      
			Players.insert({overall_pos: 22, name: "Adrian Peterson", team: "Min", position: "RB", adp: 23.3 });      
			Players.insert({overall_pos: 23, name: "DeMarco Murray", team: "Dal", position: "RB", adp: 23.6 });      
			Players.insert({overall_pos: 24, name: "Mike Wallace", team: "Pit", position: "WR", adp: 24.8 });      
			Players.insert({overall_pos: 25, name: "Jamaal Charles", team: "KC", position: "RB", adp: 26.3 });      
			Players.insert({overall_pos: 26, name: "Darren McFadden", team: "Oak", position: "RB", adp: 26.8 });      
			Players.insert({overall_pos: 27, name: "A.J. Green", team: "Cin", position: "WR", adp: 29.0 });      
			Players.insert({overall_pos: 28, name: "Eli Manning", team: "NYG", position: "QB", adp: 29.9 });      
			Players.insert({overall_pos: 29, name: "Hakeem Nicks", team: "NYG", position: "WR", adp: 30.1 });      
			Players.insert({overall_pos: 30, name: "Trent Richardson", team: "Cle", position: "RB", adp: 31.1 });      
			Players.insert({overall_pos: 31, name: "Victor Cruz", team: "NYG", position: "WR", adp: 31.3 });      
			Players.insert({overall_pos: 32, name: "Michael Vick", team: "Phi", position: "QB", adp: 31.6 });      
			Players.insert({overall_pos: 33, name: "Steven Jackson", team: "StL", position: "RB", adp: 32.1 });      
			Players.insert({overall_pos: 34, name: "Michael Turner", team: "Atl", position: "RB", adp: 34.3 });      
			Players.insert({overall_pos: 35, name: "Fred Jackson", team: "Buf", position: "RB", adp: 35.3 });      
			Players.insert({overall_pos: 36, name: "Julio Jones", team: "Atl", position: "WR", adp: 35.9 });      
			Players.insert({overall_pos: 37, name: "Frank Gore", team: "SF", position: "RB", adp: 36.1 });      
			Players.insert({overall_pos: 38, name: "Brandon Marshall", team: "Chi", position: "WR", adp: 36.8 });      
			Players.insert({overall_pos: 39, name: "Jordy Nelson", team: "GB", position: "WR", adp: 39.0 });      
			Players.insert({overall_pos: 40, name: "Steve Smith", team: "Car", position: "WR", adp: 41.3 });      
			Players.insert({overall_pos: 41, name: "Peyton Manning", team: "Den", position: "QB", adp: 43.6 });      
			Players.insert({overall_pos: 42, name: "Dez Bryant", team: "Dal", position: "WR", adp: 43.9 });      
			Players.insert({overall_pos: 43, name: "Darren Sproles", team: "NO", position: "RB", adp: 44.5 });      
			Players.insert({overall_pos: 44, name: "Ahmad Bradshaw", team: "NYG", position: "RB", adp: 45.7 });      
			Players.insert({overall_pos: 45, name: "Tony Romo", team: "Dal", position: "QB", adp: 46.6 });      
			Players.insert({overall_pos: 46, name: "Marques Colston", team: "NO", position: "WR", adp: 46.7 });      
			Players.insert({overall_pos: 47, name: "Roy Helu", team: "Wsh", position: "RB", adp: 48.4 });      
			Players.insert({overall_pos: 48, name: "Antonio Gates", team: "SD", position: "TE", adp: 50.1 });      
			Players.insert({overall_pos: 49, name: "Miles Austin", team: "Dal", position: "WR", adp: 51.0 });      
			Players.insert({overall_pos: 50, name: "Brandon Lloyd", team: "NE", position: "WR", adp: 51.8 });      
			Players.insert({overall_pos: 51, name: "Vernon Davis", team: "SF", position: "TE", adp: 53.0 });      
			Players.insert({overall_pos: 52, name: "Reggie Bush", team: "Mia", position: "RB", adp: 53.1 });      
			Players.insert({overall_pos: 53, name: "Vincent Jackson", team: "TB", position: "WR", adp: 53.7 });      
			Players.insert({overall_pos: 54, name: "Willis McGahee", team: "Den", position: "RB", adp: 55.2 });      
			Players.insert({overall_pos: 55, name: "Dwayne Bowe", team: "KC", position: "WR", adp: 57.2 });      
			Players.insert({overall_pos: 56, name: "Percy Harvin", team: "Min", position: "WR", adp: 59.3 });      
			Players.insert({overall_pos: 57, name: "Philip Rivers", team: "SD", position: "QB", adp: 59.4 });      
			Players.insert({overall_pos: 58, name: "BenJarvus Green-Ellis", team: "Cin", position: "RB", adp: 59.5 });      
			Players.insert({overall_pos: 59, name: "Jason Witten", team: "Dal", position: "TE", adp: 60.1 });      
			Players.insert({overall_pos: 60, name: "DeSean Jackson", team: "Phi", position: "WR", adp: 62.5 });      
			Players.insert({overall_pos: 61, name: "Jeremy Maclin", team: "Phi", position: "WR", adp: 62.7 });      
			Players.insert({overall_pos: 62, name: "Demaryius Thomas", team: "Den", position: "WR", adp: 62.9 });      
			Players.insert({overall_pos: 63, name: "Shonn Greene", team: "NYJ", position: "RB", adp: 63.8 });      
			Players.insert({overall_pos: 64, name: "Jonathan Stewart", team: "Car", position: "RB", adp: 65.7 });      
			Players.insert({overall_pos: 65, name: "Steve Johnson", team: "Buf", position: "WR", adp: 66.0 });      
			Players.insert({overall_pos: 66, name: "Beanie Wells", team: "Ari", position: "RB", adp: 66.3 });      
			Players.insert({overall_pos: 67, name: "Jermichael Finley", team: "GB", position: "TE", adp: 68.5 });      
			Players.insert({overall_pos: 68, name: "Matt Ryan", team: "Atl", position: "QB", adp: 71.3 });      
			Players.insert({overall_pos: 69, name: "Antonio Brown", team: "Pit", position: "WR", adp: 71.8 });      
			Players.insert({overall_pos: 70, name: "49ers D/ST", team: "D/ST", position: "72.1", adp: 0 });      
			Players.insert({overall_pos: 71, name: "Aaron Hernandez", team: "NE", position: "TE", adp: 73.3 });      
			Players.insert({overall_pos: 72, name: "Eric Decker", team: "Den", position: "WR", adp: 73.7 });      
			Players.insert({overall_pos: 73, name: "Jahvid Best", team: "Det", position: "RB", adp: 74.0 });      
			Players.insert({overall_pos: 74, name: "Ben Tate", team: "Hou", position: "RB", adp: 75.5 });      
			Players.insert({overall_pos: 75, name: "DeAngelo Williams", team: "Car", position: "RB", adp: 77.6 });      
			Players.insert({overall_pos: 76, name: "Kenny Britt", team: "Ten", position: "WR", adp: 78.0 });      
			Players.insert({overall_pos: 77, name: "Isaac Redman", team: "Pit", position: "RB", adp: 79.1 });      
			Players.insert({overall_pos: 78, name: "Ben Roethlisberger", team: "Pit", position: "QB", adp: 79.6 });      
			Players.insert({overall_pos: 79, name: "Robert Griffin III", team: "Wsh", position: "QB", adp: 82.7 });      
			Players.insert({overall_pos: 80, name: "Doug Martin", team: "TB", position: "RB", adp: 82.7 });      
			Players.insert({overall_pos: 81, name: "Ravens D/ST", team: "D/ST", position: "86.7", adp: 0 });      
			Players.insert({overall_pos: 82, name: "Stevan Ridley", team: "NE", position: "RB", adp: 86.7 });      
			Players.insert({overall_pos: 83, name: "Robert Meachem", team: "SD", position: "WR", adp: 86.8 });      
			Players.insert({overall_pos: 84, name: "Michael Bush", team: "Chi", position: "RB", adp: 87.4 });      
			Players.insert({overall_pos: 85, name: "Mark Ingram", team: "NO", position: "RB", adp: 87.7 });      
			Players.insert({overall_pos: 86, name: "Matt Schaub", team: "Hou", position: "QB", adp: 88.1 });      
			Players.insert({overall_pos: 87, name: "Pierre Garcon", team: "Wsh", position: "WR", adp: 89.5 });      
			Players.insert({overall_pos: 88, name: "Torrey Smith", team: "Bal", position: "WR", adp: 90.1 });      
			Players.insert({overall_pos: 89, name: "C.J. Spiller", team: "Buf", position: "RB", adp: 90.7 });      
			Players.insert({overall_pos: 90, name: "Tony Gonzalez", team: "Atl", position: "TE", adp: 91.2 });      
			Players.insert({overall_pos: 91, name: "Texans D/ST", team: "D/ST", position: "92.2", adp: 0 });      
			Players.insert({overall_pos: 92, name: "Peyton Hillis", team: "KC", position: "RB", adp: 94.8 });      
			Players.insert({overall_pos: 93, name: "Malcom Floyd", team: "SD", position: "WR", adp: 97.5 });      
			Players.insert({overall_pos: 94, name: "Denarius Moore", team: "Oak", position: "WR", adp: 97.7 });      
			Players.insert({overall_pos: 95, name: "James Starks", team: "GB", position: "RB", adp: 97.8 });      
			Players.insert({overall_pos: 96, name: "Santonio Holmes", team: "NYJ", position: "WR", adp: 98.9 });      
			Players.insert({overall_pos: 97, name: "Bears D/ST", team: "D/ST", position: "99.8", adp: 0 });      
			Players.insert({overall_pos: 98, name: "Jay Cutler", team: "Chi", position: "QB", adp: 102.0 });      
			Players.insert({overall_pos: 99, name: "Anquan Boldin", team: "Bal", position: "WR", adp: 102.3 });      
			Players.insert({overall_pos: 100, name: "Donald Brown", team: "Ind", position: "RB", adp: 102.6 });      
			Players.insert({overall_pos: 101, name: "Fred Davis", team: "Wsh", position: "TE", adp: 103.6 });      
			Players.insert({overall_pos: 102, name: "Toby Gerhart", team: "Min", position: "RB", adp: 105.4 });      
			Players.insert({overall_pos: 103, name: "Lance Moore", team: "NO", position: "WR", adp: 105.5 });      
			Players.insert({overall_pos: 104, name: "Michael Crabtree", team: "SF", position: "WR", adp: 106.8 });      
			Players.insert({overall_pos: 105, name: "Reggie Wayne", team: "Ind", position: "WR", adp: 107.0 });      
			Players.insert({overall_pos: 106, name: "Brandon Pettigrew", team: "Det", position: "TE", adp: 107.7 });      
			Players.insert({overall_pos: 107, name: "Stephen Gostkowski", team: "NE", position: "K", adp: 110.1 });      
			Players.insert({overall_pos: 108, name: "David Wilson", team: "NYG", position: "RB", adp: 111.7 });      
			Players.insert({overall_pos: 109, name: "Steelers D/ST", team: "D/ST", position: "112.1", adp: 0 });      
			Players.insert({overall_pos: 110, name: "Sidney Rice", team: "Sea", position: "WR", adp: 113.3 });      
			Players.insert({overall_pos: 111, name: "Justin Blackmon", team: "Jac", position: "WR", adp: 114.9 });      
			Players.insert({overall_pos: 112, name: "Josh Freeman", team: "TB", position: "QB", adp: 115.5 });      
			Players.insert({overall_pos: 113, name: "Eagles D/ST", team: "D/ST", position: "116.8", adp: 0 });      
			Players.insert({overall_pos: 114, name: "Alex Smith", team: "SF", position: "QB", adp: 118.1 });      
			Players.insert({overall_pos: 115, name: "Jacob Tamme", team: "Den", position: "TE", adp: 118.5 });      
			Players.insert({overall_pos: 116, name: "LeGarrette Blount", team: "TB", position: "RB", adp: 119.1 });      
			Players.insert({overall_pos: 117, name: "Randy Moss", team: "SF", position: "WR", adp: 119.1 });      
			Players.insert({overall_pos: 118, name: "Felix Jones", team: "Dal", position: "RB", adp: 119.3 });      
			Players.insert({overall_pos: 119, name: "Andy Dalton", team: "Cin", position: "QB", adp: 120.2 });      
			Players.insert({overall_pos: 120, name: "Titus Young", team: "Det", position: "WR", adp: 121.3 });      
			Players.insert({overall_pos: 121, name: "Shane Vereen", team: "NE", position: "RB", adp: 121.4 });      
			Players.insert({overall_pos: 122, name: "Mason Crosby", team: "GB", position: "K", adp: 121.6 });      
			Players.insert({overall_pos: 123, name: "David Akers", team: "SF", position: "K", adp: 122.5 });      
			Players.insert({overall_pos: 124, name: "Darrius Heyward-Bey", team: "Oak", position: "WR", adp: 123.1 });      
			Players.insert({overall_pos: 125, name: "Daniel Thomas", team: "Mia", position: "RB", adp: 124.7 });      
			Players.insert({overall_pos: 126, name: "Joe Flacco", team: "Bal", position: "QB", adp: 124.8 });      
			Players.insert({overall_pos: 127, name: "Sebastian Janikowski", team: "Oak", position: "K", adp: 126.7 });      
			Players.insert({overall_pos: 128, name: "Jared Cook", team: "Ten", position: "TE", adp: 127.2 });      
			Players.insert({overall_pos: 129, name: "Andrew Luck", team: "Ind", position: "QB", adp: 127.7 });      
			Players.insert({overall_pos: 130, name: "Seahawks D/ST", team: "D/ST", position: "128.0", adp: 0 });      
			Players.insert({overall_pos: 131, name: "Pierre Thomas", team: "NO", position: "RB", adp: 130.4 });      
			Players.insert({overall_pos: 132, name: "Laurent Robinson", team: "Jac", position: "WR", adp: 131.0 });      
			Players.insert({overall_pos: 133, name: "Bernard Scott", team: "Cin", position: "RB", adp: 133.6 });      
			Players.insert({overall_pos: 134, name: "Rueben Randle", team: "NYG", position: "WR", adp: 134.2 });      
			Players.insert({overall_pos: 135, name: "Jets D/ST", team: "D/ST", position: "134.3", adp: 0 });      
			Players.insert({overall_pos: 136, name: "Owen Daniels", team: "Hou", position: "TE", adp: 134.3 });      
			Players.insert({overall_pos: 137, name: "Mike Williams", team: "TB", position: "WR", adp: 134.5 });      
			Players.insert({overall_pos: 138, name: "Packers D/ST", team: "D/ST", position: "135.0", adp: 0 });      
			Players.insert({overall_pos: 139, name: "Brent Celek", team: "Phi", position: "TE", adp: 136.2 });      
			Players.insert({overall_pos: 140, name: "Michael Floyd", team: "Ari", position: "WR", adp: 136.6 });      
			Players.insert({overall_pos: 141, name: "Carson Palmer", team: "Oak", position: "QB", adp: 136.6 });      
			Players.insert({overall_pos: 142, name: "Rashard Mendenhall", team: "Pit", position: "RB", adp: 137.5 });      
			Players.insert({overall_pos: 143, name: "Mario Manningham", team: "SF", position: "WR", adp: 138.1 });      
			Players.insert({overall_pos: 144, name: "Nate Washington", team: "Ten", position: "WR", adp: 138.4 });      
			Players.insert({overall_pos: 145, name: "Lions D/ST", team: "D/ST", position: "139.2", adp: 0 });      
			Players.insert({overall_pos: 146, name: "Sam Bradford", team: "StL", position: "QB", adp: 140.3 });      
			Players.insert({overall_pos: 147, name: "Ryan Fitzpatrick", team: "Buf", position: "QB", adp: 140.9 });      
			Players.insert({overall_pos: 148, name: "Mike Tolbert", team: "Car", position: "RB", adp: 141.7 });      
			Players.insert({overall_pos: 149, name: "Matt Flynn", team: "Sea", position: "QB", adp: 142.3 });      
			Players.insert({overall_pos: 150, name: "Giants D/ST", team: "D/ST", position: "144.3", adp: 0 });      
			Players.insert({overall_pos: 151, name: "Coby Fleener", team: "Ind", position: "TE", adp: 145.1 });      
			Players.insert({overall_pos: 152, name: "Kellen Winslow", team: "Sea", position: "TE", adp: 145.5 });      
			Players.insert({overall_pos: 153, name: "Falcons D/ST", team: "D/ST", position: "145.6", adp: 0 });      
			Players.insert({overall_pos: 154, name: "Tim Tebow", team: "NYJ", position: "QB", adp: 146.1 });      
			Players.insert({overall_pos: 155, name: "Dustin Keller", team: "NYJ", position: "TE", adp: 146.6 });      
			Players.insert({overall_pos: 156, name: "Dan Bailey", team: "Dal", position: "K", adp: 146.9 });      
			Players.insert({overall_pos: 157, name: "Garrett Hartley", team: "NO", position: "K", adp: 146.9 });      
			Players.insert({overall_pos: 158, name: "Kevin Smith", team: "Det", position: "RB", adp: 147.2 });      
			Players.insert({overall_pos: 159, name: "Nate Burleson", team: "Det", position: "WR", adp: 147.9 });      
			Players.insert({overall_pos: 160, name: "Cowboys D/ST", team: "D/ST", position: "148.2", adp: 0 });      
			Players.insert({overall_pos: 161, name: "Jermaine Gresham", team: "Cin", position: "TE", adp: 148.9 });      
			Players.insert({overall_pos: 162, name: "Bills D/ST", team: "D/ST", position: "149.4", adp: 0 });      
			Players.insert({overall_pos: 163, name: "Matt Prater", team: "Den", position: "K", adp: 150.2 });      
			Players.insert({overall_pos: 164, name: "Ryan Williams", team: "Ari", position: "RB", adp: 150.7 });      
			Players.insert({overall_pos: 165, name: "Mikel Leshoure", team: "Det", position: "RB", adp: 151.6 });      
			Players.insert({overall_pos: 166, name: "Mike Goodson", team: "Oak", position: "RB", adp: 152.6 });      
			Players.insert({overall_pos: 167, name: "Alex Henery", team: "Phi", position: "K", adp: 152.9 });      
			Players.insert({overall_pos: 168, name: "Brandon Jacobs", team: "SF", position: "RB", adp: 153.1 });      
			Players.insert({overall_pos: 169, name: "Joseph Addai", team: "FA", position: "RB", adp: 153.9 });      
			Players.insert({overall_pos: 170, name: "Brian Quick", team: "StL", position: "WR", adp: 154.1 });      
			Players.insert({overall_pos: 171, name: "Jon Baldwin", team: "KC", position: "WR", adp: 154.2 });      
			Players.insert({overall_pos: 172, name: "Greg Little", team: "Cle", position: "WR", adp: 155.3 });      
			Players.insert({overall_pos: 173, name: "Rob Bironas", team: "Ten", position: "K", adp: 155.5 });      
			Players.insert({overall_pos: 174, name: "Robbie Gould", team: "Chi", position: "K", adp: 155.8 });      
			Players.insert({overall_pos: 175, name: "Leonard Hankerson", team: "Wsh", position: "WR", adp: 156.4 });      
			Players.insert({overall_pos: 176, name: "Greg Olsen", team: "Car", position: "TE", adp: 156.6 });      
			Players.insert({overall_pos: 177, name: "Patriots D/ST", team: "D/ST", position: "156.9", adp: 0 });      
			Players.insert({overall_pos: 178, name: "Jonathan Dwyer", team: "Pit", position: "RB", adp: 157.2 });      
			Players.insert({overall_pos: 179, name: "Cedric Benson", team: "FA", position: "RB", adp: 158.3 });      
			Players.insert({overall_pos: 180, name: "Tim Hightower", team: "Wsh", position: "RB", adp: 158.7 });      
			Players.insert({overall_pos: 181, name: "Chad Johnson", team: "Mia", position: "WR", adp: 159.0 });      
			Players.insert({overall_pos: 182, name: "Matt Cassel", team: "KC", position: "QB", adp: 161.6 });      
			Players.insert({overall_pos: 183, name: "Matt Bryant", team: "Atl", position: "K", adp: 162.0 });      
			Players.insert({overall_pos: 184, name: "Mark Sanchez", team: "NYJ", position: "QB", adp: 162.0 });      
			Players.insert({overall_pos: 185, name: "LaMichael James", team: "SF", position: "RB", adp: 162.6 });      
			Players.insert({overall_pos: 186, name: "Brandon LaFell", team: "Car", position: "WR", adp: 162.7 });      
			Players.insert({overall_pos: 187, name: "Heath Miller", team: "Pit", position: "TE", adp: 162.9 });      
			Players.insert({overall_pos: 188, name: "Santana Moss", team: "Wsh", position: "WR", adp: 163.0 });      
			Players.insert({overall_pos: 189, name: "Danny Amendola", team: "StL", position: "WR", adp: 163.1 });      
			Players.insert({overall_pos: 190, name: "Kendall Wright", team: "Ten", position: "WR", adp: 163.3 });      
			Players.insert({overall_pos: 191, name: "Martellus Bennett", team: "NYG", position: "TE", adp: 163.4 });      
			Players.insert({overall_pos: 192, name: "James Jones", team: "GB", position: "WR", adp: 163.7 });      
			Players.insert({overall_pos: 193, name: "Broncos D/ST", team: "D/ST", position: "164.6", adp: 0 });      
			Players.insert({overall_pos: 194, name: "Jason Hanson", team: "Det", position: "K", adp: 164.7 });      
			Players.insert({overall_pos: 195, name: "Neil Rackers", team: "Wsh", position: "K", adp: 164.9 });      
			Players.insert({overall_pos: 196, name: "Plaxico Burress", team: "FA", position: "WR", adp: 165.6 });      
			Players.insert({overall_pos: 197, name: "Dallas Clark", team: "TB", position: "TE", adp: 165.9 });      
			Players.insert({overall_pos: 198, name: "Chiefs D/ST", team: "D/ST", position: "166.1", adp: 0 });      
			Players.insert({overall_pos: 199, name: "Nate Kaeding", team: "SD", position: "K", adp: 166.4 });      
			Players.insert({overall_pos: 200, name: "Bengals D/ST", team: "D/ST", position: "168.3", adp: 0 });
		}
	});
}
