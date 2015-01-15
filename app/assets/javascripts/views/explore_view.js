Soundclone.Views.ExploreView = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.tagName = options.name;
  },

  template: JST['explore/explore'],

  render: function () {
    this.$el.html(this.template());
    this.$("#tag-search-input").focus(function () {
      $(this).select();
    });

    if (this.tagName) {
    this.$("#tag-search-input").val(this.tagName.replace(/\-/g, " "));
    this.submit();
  } else {
    this.trending();
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
    var tag = this.$("#tag-search-input").val();
    if (/trending/i.test(tag)) return this.trending();

    var tracks = new Soundclone.Collections.TagTracks({name: tag});
    tracks.fetch();
    var subview = new Soundclone.Views.TagShow({collection: tracks});
    this._swapSubview(subview);
    Backbone.history.navigate('/explore/' + tracks.name.replace(/ /g, "-"));
  },

  trending: function () {
    var tracks = new Soundclone.Collections.Tracks();
    tracks.fetch();
    var subview = new Soundclone.Views.TracksIndex({collection: tracks});
    this._swapSubview(subview);
    Backbone.history.navigate('/explore');
    this.$("#tag-search-input").val('Trending');
  },

  _swapSubview: function (subview) {
    this._currentSubview && this._currentSubview.remove();
    this.currentSubview = subview;
    this.$("#explored-thing").html(subview.render().$el);
  }

})
