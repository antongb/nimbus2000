Soundclone.Views.CommentShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
      "click button.comment-delete": "destroyComment",
      "click button.comment-reply": "replyToComment"
  },

  template: JST['comments/show'],

  render: function () {
    this.$el.html(this.template({comment: this.model}));
    return this;
  },

  destroyComment: function (event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function () {
        that.remove();
      }
    });
  },

  replyToComment: function (event) {
    event.preventDefault();
    var view = this;
    debugger
    var newComment = new Soundclone.Models.Comment({trackId: this.model.get('track_id')});
    var subView = new Soundclone.Views.CommentForm({
      parentId: this.model.id,
      model: newComment,
      collection: this.collection
    });
    this.listenTo(view, "submit", function () {
      view.removeSubview(".reply-form", subView);
    });
    this.addSubview(".reply-form", subView);
  },
});
