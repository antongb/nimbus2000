Soundclone.Views.StreamView = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  selector: '.stream-tracks',

  template: JST['stream/stream'],

  render: function () {
    this.$el.html(this.template());
    this.renderTracks();
    debugger
    return this;
  },


})
