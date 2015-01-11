Soundclone.Models.Comment = Backbone.Model.extend({
  initialize: function (options) {
    this.trackId = options.trackId;
  },

  urlRoot: function () {
    var url = this.isNew() ? 'api/tracks/' + this.trackId + '/comments' : 'api/comments';
    return url;
  },
});
