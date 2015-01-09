Soundclone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$mainEl = options.$mainEl;
    this.$navEl = options.$navEl;
    this.$renderNav
  },

  routes: {
    '': 'index',
    'users/new': 'newUser',
    'users/:id': 'showUser',
    'session/new': 'loginpage'
  },

  index: function () {
    this.$mainEl.html("<h3>This is a test<h3>")
  },

  newUser: function () {
    var user = new Soundclone.Models.User();
    var view = new Soundclone.Views.UserNew({model: user});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$mainEl.html(view.render().$el);
  }


});
