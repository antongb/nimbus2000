Soundclone.Views.TrackForm = Backbone.View.extend({
  events: {
    "click #form-submit": "submit"
  },

  tagName: 'form',

  template: JST['tracks/form'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    that = this;

    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate("tracks/" + that.model.id, {trigger: true});
      },
      patch: true
    })

  }
})
