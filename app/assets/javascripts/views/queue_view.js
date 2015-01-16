Soundclone.Views.QueueView = Soundclone.Views.TracksListView.extend({
  template: JST['queue/queue'],

  selector: '#queue-tracks',

  renderTrack: function (track) {
    var trackView = new Soundclone.Views.TrackPlayer({model: track, queue: true});
    this.addSubview(this.selector, trackView);
    return trackView;
  },

  render: function () {
    this.$el.html(this.template());
    this.renderTracks();
    return this;
  }
})
