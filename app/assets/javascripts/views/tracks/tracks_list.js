Soundclone.Views.TracksList = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
    var that = this;
    this.collection.each(function (track) {
      var trackView = new Soundclone.Views.TrackPlayer({model: track});

      that.addSubview(".tracks", trackView)
    });
  },

  template: JST['tracks/list'],

  render: function () {
    debugger
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
})
