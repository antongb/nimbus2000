Soundclone.Views.PlaylistForm = Backbone.View.extend({

  tagName: 'form',

  events: {
    "click button": "submit"
  },

  template: JST['playlists/form'],

  render: function () {
    this.$el.html(this.template({playlist: this.model, track: this.track}));
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;

    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate("playlists/" + that.model.id, {trigger: true})
      }
    })
  }
})
