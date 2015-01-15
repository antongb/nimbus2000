Soundclone.Views.TagShow = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  selector: '.tag-tracks',

  template: JST['tags/show'],

  render: function () {
    this.$el.html(this.template({tracks: this.collection}));
    this.renderTracks();
    return this;
  }
})
