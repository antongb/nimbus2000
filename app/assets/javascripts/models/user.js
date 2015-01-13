Soundclone.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  parse: function (response) {
    if (response.tracks) {
      this.tracks().set(response.tracks);
      delete response.tracks;
    }

    if (response.playlists) {
      this.playlists().set(response.playlists);
      delete response.playlists;
    }
    return response;
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Soundclone.Collections.Tracks();
    }
    return this._tracks;
  },

  playlists: function () {
    if (!this._playlists) {
      this._playlists = new Soundclone.Collections.Playlists({userId: this.id});
    }
    return this._playlists;
  },

  follow: function (options) {
    var opts = this.get('you_follow') ? {type: 'DELETE'} : {}
    _.extend(options, opts)
    return this.customAction('follow', options);
  }
});
