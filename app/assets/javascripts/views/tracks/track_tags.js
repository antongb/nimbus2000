Soundclone.Views.TrackTagsView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['tracks/tags'],

  render: function () {
    this.$el.html(this.template({tags: this.model.get('tags')}))
    this.autocomplete();
    this.$el.on("click", ".delete-tag", this.removeTag.bind(this));
    return this;
  },

  autocomplete: function () {

    this.$("#tag-input").autocomplete({
      source: window.tags,
      delay: 0
    });

    this.$("#tag-form").on("submit", this.submit.bind(this));

  },

  removeTag: function (event) {
    event.preventDefault();
    var that = this;
    var name = $(event.currentTarget).data("name");
    var $li =$(event.currentTarget).parent();

    this.model.addRemoveTag({
      data: {name: name},
      type: 'DELETE',
      success: function (response) {
        $li.remove();
        console.log(name);
        var newTags = _.reject(that.model.get('tags'), function (tag) {
          return tag.name === name;
        });
        that.model.set({tags: newTags})
      }
    })
  },

  submit: function (event) {
    event.preventDefault();
    var tag = this.$("#tag-form").serializeJSON();
    var view = this;

    this.model.addRemoveTag({
      data: tag,
      success: function (response) {
        debugger;
        view.model.get('tags').push(response); // TODO remove tag ID from track model
        window.tags.push(response.name);
        view.render();
        $("#tag-input").focus();
      }
    })
  }
})
