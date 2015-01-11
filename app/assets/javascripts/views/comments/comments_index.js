Soundclone.Views.CommentsIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync add remove change reset", this.render);
  },

  template: JST['comments/index'],

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function (comment) {
      var showView = new Soundclone.Views.CommentShow({model: comment, collection: that.collection});
      that.addSubview("#comments-list", showView);
    });
    // debugger
    // this.attachSubviews();
    return this;
  },

});
