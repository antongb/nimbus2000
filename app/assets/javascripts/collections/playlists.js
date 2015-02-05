Soundclone.Collections.Playlists = Backbone.Collection.extend({

  initialize: function (options) {
    this.userId = parseInt(options.userId);
  },


  url: function () {
    if (this.userId) {
      return 'api/users/' + this.userId + '/playlists';
    } else {
      return 'api/playlists';
    };
  },

  parse: function (response) {
    if (response.playlists) {
      this.username = response.username;
      return response.playlists;
    }
  },

  model: Soundclone.Models.Playlist

});
