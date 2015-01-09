Soundclone.Models.User = Backbone.Model.extend({

  urlRoot: '/api/users',

  parse: function (response) {
    if (response.tracks) {
      this.tracks().set(response.tracks);
      delete response.tracks;
    }
    return response;
  },

  tracks: function () {
    if (!this._tracks) {
      this._tracks = new Soundclone.Collections.Tracks();
    }
    return this._tracks;
  }
});
