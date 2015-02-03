window.Soundclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new Soundclone.Routers.Router({
      $mainEl: $("#content"),
      $errorEl: $("#errors"),
      $queueEl: $("#queue")
    });
    // Soundclone.getTags();
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   Soundclone.initialize();
// });
