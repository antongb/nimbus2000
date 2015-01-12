Soundclone.Views.PlaylistForm = Backbone.View.extend({

  initialize: function (options) {
    this.trackId = options.trackId
  },

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

    if (this.trackId) {
      attrs.track = this.trackId;
    }

    this.model.save(attrs, {
      success: function (model, data) {
        Backbone.history.navigate("playlists/" + model.id, {trigger: true})
      }
    })
  }
})
