window.Soundclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new Soundclone.Routers.Router({$mainEl: $("#content"), $navEl: $("nav")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Soundclone.initialize();
});
