Soundclone.Views.QueueView = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    $.cookie.json = true;
    this._currentTrackNum = 0;
    this._tracksArr = $.cookie('queue') || [];
  },

  template: JST['queue/queue'],

  className: 'queue-view group',

  events: {
    "click .prev-button": "prev",
    "click .next-button": "next",
  },

  selector: '#queue-tracks',

  renderTracks: function() {
    _.each(this._tracksArr, function(el) {
      this.renderTrack(this.collection.get(el));
    }, this);
  },

  renderTrack: function (track, slide) {
    var trackView = new Soundclone.Views.QueueTrack({model: track});
    if (slide) {
      this._tracksArr.push(track.id);
      $.cookie('queue', this._tracksArr);
      trackView.$el.addClass("fade");
      this.addSubview(this.selector, trackView);
      window.setTimeout(function() {trackView.$el.removeClass("fade");}, 0);
    } else {
      this.addSubview(this.selector, trackView);
    }
    trackView.on("playTrigger", this.play.bind(this));
    trackView.on("removeTrigger", this.removeTrack.bind(this));
    trackView.on("nextTrigger", this.next.bind(this));
    return trackView;
  },

  tracks: function () {
    return this.subviews()['#queue-tracks'];
  },

  render: function () {
    this.$el.html(this.template());
    this.renderTracks();
    return this;
  },

  play: function (trackView) {
    if (this._currentTrack) {
      this._currentTrack.stop();
      // rebind event when not playing
      this._currentTrack.on("playTrigger", this.play.bind(this));
    }
    this._currentTrack = trackView;
    this._currentTrackNum = this.tracks().indexOf(this._currentTrack);
    trackView.play();
    // unbind event while playing
    trackView.off("playTrigger")
  },

  prev: function () {
    var tracks = this.tracks(); // woo memoization
    if (this._currentTrackNum === 0) {
      this.play(tracks[tracks.length - 1]);
    } else {
      this.play(tracks[this._currentTrackNum - 1]);
    }
  },

  next: function () {
    var tracks = this.tracks();
    if (this._currentTrackNum === tracks.length - 1) {
      this.play(tracks[0]);
    } else {
      this.play(tracks[this._currentTrackNum + 1]);
    }
  },

  removeTrack: function (trackView) {
    if (trackView === this._currentTrack) {
      this._currentTrack = null;
    }
    trackView.off();
    this._tracksArr.splice(this.subviews()[this.selector].indexOf(trackView), 1);
    $.cookie('queue', this._tracksArr);
    trackView.$el.addClass("fade");
    var that = this;

    window.setTimeout(function() {
      that.removeSubview(that.selector, trackView);
    }, 500)    
  }
})
