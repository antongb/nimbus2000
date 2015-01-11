Soundclone.Views.TrackAddForm = Backbone.View.extend({
  template: JST['tracks/add_form'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
    this.collection.fetch();
  },

  events: {
    "click button": "submit"
  },

  tagName: 'form',

  render: function () {
    this.$el.html(this.template({playlists: this.collection}));
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var playlistId = parseInt($("#playlist-dropdown").val());
    debugger
    this.collection.get(playlistId).addTrack(this.model.id);
  }
})
