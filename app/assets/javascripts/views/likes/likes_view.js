Soundclone.Views.LikesView = Backbone.View.extend({
  template: JST['likes/likes'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button": "submit"
  },

  render: function () {
    this.$el.html(this.template({track: this.model}))
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var view = this;
    this.model.like({success: function () {
      view.model.fetch();
    }});
  }
})
