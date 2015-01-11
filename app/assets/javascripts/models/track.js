Soundclone.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  like: function (opts) {
    var url = this.urlRoot + '/' + this.id + '/like';
    var track = this;
    var options = {
      url: url,
      type: 'POST',
      trigger: true
    };

    _.extend(options, opts);

    this.sync(null, this, options);
  }
});
