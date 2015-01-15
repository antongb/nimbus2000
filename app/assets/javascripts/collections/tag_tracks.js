Soundclone.Collections.TagTracks = Soundclone.Collections.Tracks.extend({
  initialize: function (options) {
    this.name = options.name;
  },

  url: function () {
    return '/api/tags/' + this.name;
  }
})
