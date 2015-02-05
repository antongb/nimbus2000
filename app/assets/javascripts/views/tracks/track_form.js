Soundclone.Views.TrackForm = Backbone.View.extend({
  events: {
    "change .track-audio": "handleFile",
    "change .track-cover": "handleFile",
    "click #form-submit": "submit",
    // "click #form-submit": "uploading"
  },

  tagName: 'form',

  attributes: {
    'enctype': "multipart/form-data",
    'action': '/api/tracks/',
    'method': 'POST'
  },

  template: JST['tracks/form'],

  render: function () {
    this.$el.html(this.template({track: this.model}));
    return this;
  },

  handleFile: function (event) {
    var file = event.currentTarget.files[0];
    var view = this;
    var reader = new FileReader();
    this.files = this.files || {}
    reader.onload = function(e) {
      view.files[$(event.currentTarget).attr('name')] = this.result;
    }
    reader.readAsDataURL(file);
  },

  submit: function (event) {
    event.preventDefault();

    var audio =
    this.$el.append("<p>Uploading...</p>");
    var attrs = this.$el.serializeJSON();


    that = this;

    _.extend(attrs.track, this.files);

    this.model.set(attrs);


    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("tracks/" + that.model.id, {trigger: true});
      },
      // error: function (model, resp) {
      //   var respArr = Array.prototype.slice.call(resp.responseText);
      //   that.$el.append(resp.responseJSON.join("<br>"));
      // }
    })

  },

  uploading: function (event) {
    this.$el.append("<p>Uploading...</p>")
  }
})
