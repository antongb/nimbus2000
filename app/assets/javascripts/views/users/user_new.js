Soundclone.Views.UserNew = Backbone.View.extend({

  events: {
    "click #signup": "submit"
  },

  template: JST['users/new'],

  render: function () {
    this.$el.html(this.template({}))
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = $("#new-user").serializeJSON();
    var that = this;

    this.model.save(attrs);
  }

})
