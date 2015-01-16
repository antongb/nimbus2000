Soundclone.Collections.Tracks = Backbone.Collection.extend({

  url: '/api/tracks',

  model: Soundclone.Models.Track,

  comparator: function (track) {
    return (track.get('created_at') * -1);
  }

});
