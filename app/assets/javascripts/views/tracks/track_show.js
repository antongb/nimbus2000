Soundclone.Views.TrackShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.comments = new Soundclone.Collections.Comments({trackId: this.model.id});
    this.addForm = new Soundclone.Views.TrackAddForm({collection: currentUser.playlists, model: this.model});
    this.likesView = new Soundclone.Views.LikesView({model: this.model});
    this.commentsView = new Soundclone.Views.CommentsRoot({collection: this.comments});
    this.tagsView = new Soundclone.Views.TrackTagsView({model: this.model});
    this.addSubview("#track-tags", this.tagsView);
    this.addSubview("#add-to-playlist", this.addForm);
    this.addSubview("#likes", this.likesView);
    this.addSubview("#comments", this.commentsView);
  },

  events: {
    "click #delete-track": "destroyTrack",
        "click .play-button": "play",
    "click .add-button": "add"
  },

  template: JST['tracks/show'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    this.attachSubviews();
    return this;
  },

  destroyTrack: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

    add: function (event) {
    event.preventDefault();
    Soundclone.router.addToQueue(this.model);
  },

  play: function (event) {
    event.preventDefault();
    Soundclone.router.addToQueue(this.model, {play: true});
  }
});
