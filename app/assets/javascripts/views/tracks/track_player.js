Soundclone.Views.TrackPlayer = Backbone.View.extend({

  initialize: function (options) {
    this.queue = options.queue;
  },

  events: {
    "click .play-button": "play",
    "click .add-button": "add"
  },

  // className: 'group',

  template: JST['tracks/player'],

  render: function () {
    this.$el.html(this.template({track: this.model, queue: this.queue}));
    return this;
  },

  add: function (event) {
    event.preventDefault();
    Soundclone.router.addToQueue(this.model);
  },

  play: function (event) {
    event.preventDefault();
    Soundclone.router.addToQueue(this.model, {play: true});
  }
})
