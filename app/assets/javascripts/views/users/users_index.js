Soundclone.Views.UsersIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['users/index'],

  render: function () {
    this.$el.html(this.template({users: this.collection}));
    this.collection.each(function(user) {
      var followView = new Soundclone.Views.UserFollow({model: user});
      this.addSubview("#follow-" + user.id, followView);
    }, this);
    return this;
  }



});
