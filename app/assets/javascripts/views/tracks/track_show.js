Soundclone.Views.TrackShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click #delete-track": "destroyTrack"
  },

  template: JST['tracks/show'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    return this;
  },

  destroyTrack: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", {trigger: true});
      }
    })
  }
})
