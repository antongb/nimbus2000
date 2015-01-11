Soundclone.Views.TrackShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.addForm = new Soundclone.Views.TrackAddForm({collection: currentUser.playlists, model: this.model});
    this.likes = new Soundclone.Views.LikesView({model: this.model})
    this.addSubview("#add-to-playlist", this.addForm);
    this.addSubview("#likes", this.likes);
  },

  events: {
    "click #delete-track": "destroyTrack"
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
    })
  }
})
