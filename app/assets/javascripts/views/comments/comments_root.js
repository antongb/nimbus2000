Soundclone.Views.CommentsRoot = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
    this.commentsIndex = new Soundclone.Views.CommentsIndex({collection: this.collection});
    this.renderForm();
    this.addSubview("#comments-index", this.commentsIndex);
  },

  template: JST['comments/root'],

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  renderForm: function () {
    this.commentForm && this.removeSubview("#comment-form", this.commentForm);
    var newComment = new Soundclone.Models.Comment({trackId: this.collection.trackId});
    this.commentForm = new Soundclone.Views.CommentForm({model: newComment, collection: this.collection});
    this.listenTo(this.commentForm, "submit", this.renderForm);
    this.addSubview("#comment-form", this.commentForm);
  }
});
