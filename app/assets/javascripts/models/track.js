Soundclone.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  like: function (options) {
    var opts = this.get('curr_user_likes') ? {type: 'DELETE'} : {}
    _.extend(options, opts);
    return this.customAction('like', options);
  }
});
