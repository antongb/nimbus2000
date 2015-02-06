Soundclone.Views.QueueTrack = Backbone.View.extend({

  template: JST['queue/player'],

  events: {
    "click .play-button": "playTrigger",
    "click .remove-button": "removeTrigger"
  },

  className: "queue-track group",

  render: function () {
      this.$el.html(this.template({track: this.model}));
      return this;
  },

  playTrigger: function () {
    if (this._active) {
      var action = this.$(".player").prop("paused") ? "play" : "pause";
      this.$(".player").trigger(action);
    } else {
      this.trigger("playTrigger", this);
    }
  },

  removeTrigger: function () {
    this.trigger("removeTrigger", this);
  },

  // note that this is only ever called from the main queue view
  play: function () {

    this._active = true;
    this.$el.addClass("current-track");
    this.$(".audio").html(JST['queue/audio']({track: this.model}));
    this.$("audio").on("ended", function() {
      this.trigger("nextTrigger", this);
    }.bind(this));
  },

  stop: function () {
    event.preventDefault();
    this._active = false;
    this.$el.removeClass("current-track");
    this.$(".audio").empty();
  }
})
