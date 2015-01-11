Soundclone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$mainEl = options.$mainEl;
    this.$navEl = options.$navEl;
    this._renderNav(); // TODO
  },

  routes: {
    '': 'tracksIndex',
    'users/new': 'newUser',
    'users/:id/playlists': 'playlistsIndex',
    'users/:id': 'showUser',
    'session/new': 'loginPage',
    'tracks': 'tracksIndex',
    'tracks/new': 'newTrack',
    'tracks/:id': 'showTrack',
    'tracks/:id/edit': 'editTrack',
    'playlists/new': 'newPlaylist',
    'playlists/:id': 'showPlaylist'
  },

  tracksIndex: function () {
    var tracks = new Soundclone.Collections.Tracks();
    tracks.fetch();
    var view = new Soundclone.Views.TracksIndex({collection: tracks})
    this._swapView(view);
  },

  newUser: function () {
    var user = new Soundclone.Models.User();
    var view = new Soundclone.Views.UserNew({model: user});
    this._swapView(view);
  },

  showUser: function (id) {
    debugger
    var user = new Soundclone.Models.User({id: id})
    user.fetch();
    var view = new Soundclone.Views.UserShow({model: user});
    this._swapView(view);
  },

  newTrack: function () {
    var track = new Soundclone.Models.Track();
    var view = new Soundclone.Views.TrackForm({model: track});
    this._swapView(view);
  },

  showTrack: function (id) {
    var track = new Soundclone.Models.Track({id: id});
    track.fetch();
    var view = new Soundclone.Views.TrackShow({model: track})
    this._swapView(view);
  },

  editTrack: function (id) {
    var track = new Soundclone.Models.Track({id: id});
    var view = new Soundclone.Views.TrackForm({model: track})
    track.fetch({success: function () {
      this._swapView(view);
    }.bind(this)});
  },

  playlistsIndex: function (id) {
    var playlists = new Soundclone.Collections.Playlists({userId: id});
    playlists.fetch();
    var view = new Soundclone.Views.PlaylistsIndex({collection: playlists});
    this._swapView(view);
  },

  newPlaylist: function () {
    var playlist = new Soundclone.Models.Playlist();
    var view = new Soundclone.Views.PlaylistForm({model: playlist});
    this._swapView(view);
  },

  showPlaylist: function (id) {
    var playlist = new Soundclone.Models.Playlist({id: id});
    playlist.fetch();
    var view = new Soundclone.Views.PlaylistShow({model: playlist});
    this._swapView(view)
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$mainEl.html(view.render().$el);
  },

  _renderNav: function () {
    // TODO
  }


});
