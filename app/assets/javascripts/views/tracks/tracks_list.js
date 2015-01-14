Soundclone.Views.TracksListView = Backbone.CompositeView.extend({

  renderTrack: function (track) {
    var trackView = new Soundclone.Views.TrackPlayer({model: track});
    this.addSubview(this.selector, trackView);
  },

  renderTracks: function () {
    this.collection.each(this.renderTrack.bind(this));
  }
})
