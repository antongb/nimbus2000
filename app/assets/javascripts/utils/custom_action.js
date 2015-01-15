Backbone.Model.prototype.customAction = function (name, opts) {
  var url = this.urlRoot + '/' + this.id + '/' + name;
  var model = this;
  var options = {
    url: url,
    type: 'POST'
  };

  _.extend(options, opts);

  return $.ajax(options);
}
