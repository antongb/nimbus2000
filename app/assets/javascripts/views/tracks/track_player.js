Soundclone.Views.TrackPlayer = Backbone.View.extend({

  template: JST['tracks/player'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    return this;
  }
})
