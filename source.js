var SoundCloud = function() {

	var currentSound;

	this.getMyPlaylists = function () {
		SC.get('/me/playlists', function(playlists) {
			var list = new Array();
    		for (var i in playlists) {
    			var art = "";
    			if (playlists[i].tracks[0]) {
    				art = playlists[i].tracks[0].artwork_url;
    			}
    			list.push({
    				id : playlists[i].id,
    				name : playlists[i].title,
    				art : art
    			});
    		}
    		drawList(list);
  		});
	}

	this.getMyStream = function () {
		SC.get('/me/activities', function(stream) {
			var list = new Array();
			var collection = stream.collection;
    		for (var i in collection) {
    			var origin = collection[i].origin;
    			var art = "";
    			if (origin.artwork_url != null) {
    				art = origin.artwork_url;
    			} else {
    				if (origin.user.avatar_url != null) {
    					art = origin.user.avatar_url;
    				}
    			}
    			list.push({
    				id : origin.id,
    				name : origin.title,
    				art : art
    			});
    		}
    		drawList(list);
  		});
	}

	this.attach = function () {
		SC.stream("/tracks/293", function(sound){
			currentSound = sound;
		});
	}

	this.play = function () {
		currentSound.play();
	}

	this.stop = function() {
		if (currentSound) {
			currentSound.stop();
		}
	}

	this.pause = function() {
		currentSound.pause();
	}

	this.next = function() {
		currentSound.next();
	}

	this.prev = function() {
		currentSound.prev();
	}

	this.startPlayTrack = function(trackId) {
		SC.stream("/tracks/" + trackId, function(sound){
			currentSound = sound;
			currentSound.volume = 25;
			currentSound.setVolume();
			currentSound.play();
		});
	}

	function drawList(list) {
		$("#content").html("");
		for (var i in list) {
			var row = $('<div class="row"></div>');
			var picture = $('<div class="picture"></div>');
			var rowContent = $('<div class="row-content"></div>');
			var label = $('<div class="label"></div>');
			var labelBorder = $('<div class="label-border"></div>');
			var playButton = $('<div class="button"><div class="play"></div></div>');
			playButton.attr('onclick', 'startPlayTrack("' + list[i].id + '");');
			var img = $('<img class="img" />');
			img.attr("src", list[i].art);
			var title = $('<span></span>');
			title.append(list[i].name);
			label.append(title);
			picture.append(img);
			rowContent.append(label);
			rowContent.append(labelBorder);
			rowContent.append(playButton);
			row.append(picture);
			row.append(rowContent);
			$("#content").append(row);
		}
	}
}