window.Soundclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Soundclone.Routers.Router({$mainEl: $("#content"), $navEl: $("nav")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Soundclone.initialize();
});
