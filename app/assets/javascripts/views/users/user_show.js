Soundclone.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.followView = new Soundclone.Views.UserFollow({model: this.model});
    this.renderTracks();
    this.addSubview("#follow-view", this.followView);
  },

  template: JST['users/show'],

  className: "group",

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.attachSubviews();
    this.renderTracks();
    return this;
  },

  renderTracks: function () {
    var that = this;
    this.model.tracks().each(function (track) {
      var trackView = new Soundclone.Views.TrackPlayer({model: track});

      that.addSubview("#user-tracks", trackView);
    });
  }
})
