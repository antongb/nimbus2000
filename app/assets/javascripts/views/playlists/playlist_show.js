Soundclone.Views.PlaylistShow = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click button": "removeTrack"
  },

  template: JST['playlists/show'],

  render: function () {
    this.$el.html(this.template({playlist: this.model}));
    return this;
  },

  removeTrack: function (event) {
    event.preventDefault();
    var view = this;
    var trackId = $(event.currentTarget).data("id")
    this.model.removeTrack(trackId, {
      success: function () {
        view.model.fetch();
      }
    });
  }
})
