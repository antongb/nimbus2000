Soundclone.Views.PlaylistShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click button.remove-track": "removeTrack",
    "click button.add-all": "addAll",
    "click button.add-all-play": "AddAllAndPlay"
  },

  template: JST['playlists/show'],

  render: function () {
    var that = this;
    this.$el.html(this.template({playlist: this.model}));
    this.model.tracks().each(function (track) {
      var trackView = new Soundclone.Views.TrackPlayer({model: track});

      that.addSubview(".playlist-tracks", trackView)

      if (currentUser.id === that.model.get('owner_id')) {
        trackView.$el.append('<button class="remove-track" data-id="' + track.id + '">Remove</button>');
      };

    });
    return this;
  },

  removeTrack: function (event) {
    event.preventDefault();
    var view = this;
    var trackId = $(event.currentTarget).data("id")
    this.model.removeTrack(trackId, {
      success: function () {
        view.model.fetch();
      }
    });
  },

  addAll: function(event) {
    event.preventDefault();
    this.model.tracks().each(function(track) {
      Soundclone.router.addToQueue(track);
    });
  },

  AddAllAndPlay: function(event) {
    event.preventDefault();
    this.model.tracks().each(function(track, idx) {
      var play = idx === 0 ? {play: true} : {}
      Soundclone.router.addToQueue(track, play);
    })
  }
})
