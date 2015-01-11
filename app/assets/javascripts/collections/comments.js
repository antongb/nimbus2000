Soundclone.Collections.Comments = Backbone.Collection.extend({

  initialize: function (options) {
    this.trackId = parseInt(options.trackId);
  },

  model: Soundclone.Models.Comment,

  url: function () {
    if (this.trackId) {
      return 'api/tracks/' + this.trackId + '/comments';
    } else {
      return 'api/playlists';
    }
  },

  comparator: function (comment) {
    return (comment.id * -1);
  }

});
