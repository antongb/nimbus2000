Soundclone.Views.TracksListView = Backbone.CompositeView.extend({

  subviewType: Soundclone.Views.TrackPlayer,

  renderTrack: function (track) {
    var trackView = new this.subviewType({model: track});
    this.addSubview(this.selector, trackView);
    return trackView;
  },

  renderTracks: function () {
    this.collection.each(this.renderTrack.bind(this));
  }

})
