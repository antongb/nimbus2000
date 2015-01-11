Soundclone.Models.Playlist = Backbone.Model.extend({

  urlRoot: '/api/playlists',

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
  },

  addTrack: function (trackId) {
    var url = this.urlRoot + '/' + this.id + '/add_track/' + trackId;
    var options = {
      url: url,
      type: 'POST',
      trigger: true
    };
    return this.sync.call(this, null, this, options)
  },

  removeTrack: function (trackId) {
    var url = this.urlRoot + '/' + this.id + '/remove_track/' + trackId;
    var track = this.tracks().get({id: trackId})
    var playlist = this;
    var options = {
      url: url,
      type: 'POST',
      success: playlist.tracks().remove(track),
      trigger: true
    };
    return this.sync.call(this, null, this, options)
  }

});
