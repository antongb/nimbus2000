var oldBackboneSync = Backbone.sync;

Backbone.sync = function(method, model, options) {
  var errorOpts = {
    error: function (resp) {
      Soundclone.router.renderErrors(resp.responseJSON);
    }
  };

  _.extend(options, errorOpts);

  return oldBackboneSync.call(this, method, model, options);

}
