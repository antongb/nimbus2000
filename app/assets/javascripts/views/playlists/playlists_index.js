Soundclone.Views.PlaylistsIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add remove change reset sync", this.render);
  },

  template: JST['playlists/index'],

  render: function () {
    this.$el.html(this.template({playlists: this.collection}));
    return this;
  }

  // TODO show playlist tracks

});
