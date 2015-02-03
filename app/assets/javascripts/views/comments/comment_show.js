Soundclone.Views.CommentShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
      "click button.comment-delete": "destroyComment",
      "click button.comment-reply": "replyToComment",
      "click button.comment-edit": "editComment"
  },

  template: JST['comments/show'],

  render: function () {
    this.$el.html(this.template({comment: this.model}));
    return this;
  },

  destroyComment: function (event) {
    event.preventDefault();
    if (!confirm("Are you sure?")) {
      return;
    }
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
    var newComment = new Soundclone.Models.Comment({trackId: this.model.get('track_id')});
    var subView = new Soundclone.Views.CommentForm({
      parentId: this.model.id,
      model: newComment,
      collection: this.collection
    });
    this.listenTo(subView, "clear", function () {
      view.removeSubview(".reply-form", subView);
    });
    this.addSubview(".reply-form", subView);
    subView.$(".body").focus();
  },

  editComment: function (event) {
    event.preventDefault();
    this.$el.empty();
    var editView = new Soundclone.Views.CommentForm({
      model: this.model,
      collection: this.collection
    });
    this.listenTo(editView, "clear", function () {
      editView.remove();
    });
    this.$el.html(editView.render().$el);
    editView.$(".body").focus();
  }
});
