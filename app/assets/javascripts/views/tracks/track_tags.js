Soundclone.Views.TrackTagsView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    // this.listenTo(window, "tagload", this.render)
  },

  template: JST['tracks/tags'],

  render: function () {
    this.$el.html(this.template({tags: this.model.get('tags')}))
    this.autocomplete();
    return this;
  },

  autocomplete: function () {
    var tagNames = _.map(window.tags, function (tag) {
      return tag.name;
    })

    $(".tag-input").autocomplete({
      source: tagNames
    })
    debugger;
  }
})
