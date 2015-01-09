Soundclone.Views.TrackShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['tracks/show'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    return this;
  }
})
