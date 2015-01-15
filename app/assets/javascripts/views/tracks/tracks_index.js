Soundclone.Views.TracksIndex = Soundclone.Views.TracksListView.extend({

  initialize: function () {
    this.listenTo(this.collection, "add remove change", this.render)
  },

  selector: '.trending-tracks',

  template: JST['tracks/index'],

  render: function () {
    this.$el.html(this.template({tracks: this.collection}));
    this.renderTracks();
    return this;
  }

});
