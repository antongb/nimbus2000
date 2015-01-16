Soundclone.Views.TracksListView = Backbone.CompositeView.extend({

  renderTrack: function (track) {
    var trackView = new Soundclone.Views.TrackPlayer({model: track, queue: false});
    this.addSubview(this.selector, trackView);
    return trackView;
  },

  renderTracks: function () {
    this.collection.each(this.renderTrack.bind(this));
  },
  //
  // comparator: function () {
  //
  // }
})
