Soundclone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$mainEl = options.$mainEl;
    this.$navEl = options.$navEl;
    this._renderNav(); // TODO
  },

  routes: {
    '': 'tracksIndex',
    'users/new': 'newUser',
    'users/:id': 'showUser',
    'session/new': 'loginPage',
    'tracks': 'tracksIndex',
    'tracks/:id': 'showTrack'
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
    var user = new Soundclone.Models.User({id: id})
    user.fetch();
    var view = new Soundclone.Views.UserShow({model: user});
    this._swapView(view);
  },

  showTrack: function (id) {
    var track = new Soundclone.Models.Track({id: id});
    track.fetch();
    var view = new Soundclone.Views.TrackShow({model: track})
    this._swapView(view);
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
