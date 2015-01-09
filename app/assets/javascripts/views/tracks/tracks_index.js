Soundclone.Views.TracksIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "add remove change", this.render)
  },

  template: JST['tracks/index'],

  render: function () {
    this.$el.html(this.template({tracks: this.collection}));
    return this;
  }

});
