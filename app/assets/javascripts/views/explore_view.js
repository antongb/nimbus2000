Soundclone.Views.ExploreView = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.tagName = options.name;
  },

  template: JST['explore/explore'],

  render: function () {
    this.$el.html(this.template());
    if (this.tagName) {
    this.$("#tag-search-input").val(this.tagName);
    this.submit();
    }
    this.autocomplete();
    return this;
  },

  autocomplete: function () {
    var tagNames = _.pluck(window.tags, 'name');
    tagNames.push("Trending");

    this.$("#tag-search-input").autocomplete({
      source: tagNames,
      delay: 0
    });

    this.$("#tag-search").on("submit", this.submit.bind(this));


  },

  submit: function (event) {
    event && event.preventDefault();
    console.log("hi")
    var tag = this.$("#tag-search-input").val();
    // var view = this;
    var tracks = new Soundclone.Collections.TagTracks({name: tag});
    tracks.fetch();
    var subview = new Soundclone.Views.TagShow({collection: tracks});
    this._swapSubview(subview);
  },



  _swapSubview: function (subview) {
    this._currentSubview && this._currentSubview.remove();
    this.currentSubview = subview;
    this.$("#explored-thing").html(subview.render().$el);
    Backbone.history.navigate('/explore/' + subview.collection.name);
  }

})
