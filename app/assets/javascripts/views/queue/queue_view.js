Soundclone.Views.QueueView = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    this._currentTrackNum = 0;
  },

  template: JST['queue/queue'],

  className: 'queue-view',

  events: {
    "click .prev-button": "prev",
    "click .next-button": "next"
  },

  selector: '#queue-tracks',

  renderTrack: function (track) {
    var trackView = new Soundclone.Views.QueueTrack({model: track});
    this.addSubview(this.selector, trackView);
    trackView.on("playTrigger", this.play.bind(this))
    trackView.on("removeTrigger", this.removeTrack.bind(this))
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
    this.play(this.tracks()[this._currentTrackNum - 1]);
  },

  next: function () {
    this.play(this.tracks()[this._currentTrackNum + 1]);
  },

  removeTrack: function (trackView) {
    if (trackView === this._currentTrack) {
      this._currentTrack = null;
    }
    trackView.off();
    this.removeSubview(this.selector, trackView);
  }
})
