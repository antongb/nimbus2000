Soundclone.Views.FavoritesView = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  selector: '.favorite-tracks',

  template: JST['likes/favorites'],

  render: function () {
    this.$el.html(this.template());
    this.renderTracks();
    return this;
  }

})
