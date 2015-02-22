Soundclone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$mainEl = options.$mainEl;
    this.$errorEl = options.$errorEl;
    this.$queueEl = options.$queueEl;
    this._queueTracks = window.queueTracks;
    this._queueView = new Soundclone.Views.QueueView({collection: this._queueTracks});
    this.$queueEl.html(this._queueView.render().$el);
  },

  routes: {
    '': 'stream',
    'explore/:name': 'explore',
    'explore': 'explore',
    'favorites': 'favorites',
    'users': 'usersIndex',
    'users/new': 'newUser',
    'users/:id/playlists': 'playlistsIndex',
    'users/:id': 'showUser',
    'session/new': 'loginPage',
    'tracks': 'tracksIndex',
    'tracks/new': 'newTrack',
    'tracks/:id': 'showTrack',
    'tracks/:id/edit': 'editTrack',
    'playlists/new/:trackId': 'newPlaylist',
    'playlists/new': 'newPlaylist',
    'playlists/:id': 'showPlaylist',
    'tags/:name': 'showTag',
  },

  stream: function () {
    var stream = new Soundclone.Collections.Stream();
    var view = new Soundclone.Views.StreamView({collection: stream});
    stream.fetch();
    this._swapView(view);
  },

  favorites: function () {
    var favorites = new Soundclone.Collections.Favorites();
    var view = new Soundclone.Views.FavoritesView({collection: favorites});
    favorites.fetch();
    this._swapView(view);
  },

  tracksIndex: function () {
    var tracks = new Soundclone.Collections.Tracks();
    tracks.fetch();
    var view = new Soundclone.Views.TracksIndex({collection: tracks});
    this._swapView(view);
  },

  usersIndex: function () {
    var users = new Soundclone.Collections.Users();
    users.fetch();
    var view = new Soundclone.Views.UsersIndex({collection: users});
    this._swapView(view)
  },

  newUser: function () {
    var user = new Soundclone.Models.User();
    var view = new Soundclone.Views.UserNew({model: user});
    this._swapView(view);
  },

  showUser: function (id) {
    var user = new Soundclone.Models.User({id: id});
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
    var view = new Soundclone.Views.TrackShow({model: track});
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

  newPlaylist: function (trackId) {
    var playlist = new Soundclone.Models.Playlist();
    var view = new Soundclone.Views.PlaylistForm({model: playlist, trackId: trackId});
    this._swapView(view);
  },

  showPlaylist: function (id) {
    var playlist = new Soundclone.Models.Playlist({id: id});
    playlist.fetch();
    var view = new Soundclone.Views.PlaylistShow({model: playlist});
    this._swapView(view)
  },

  showTag: function (name) {
    var tracks = new Soundclone.Collections.TagTracks({name: name});
    tracks.fetch();
    var view = new Soundclone.Views.TagShow({collection: tracks});
    this._swapView(view);
  },

  explore: function (name) {
    var options = name ? {name: name} : {}
    var view = new Soundclone.Views.ExploreView(options);
    this._swapView(view);
  },

  addToQueue: function (track, options) {
    var trackView = this._queueView.renderTrack(track, true);
    if (options && options.play) {
      this._queueView.play(trackView);
    }
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$mainEl.html(view.render().$el);
    this.$errorEl.empty();
  },

  renderErrors: function (errors) {
    this.$errorEl.html(errors.join("<br>"));
  },


});
