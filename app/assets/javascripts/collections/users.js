Soundclone.Collections.Users = Backbone.Collection.extend({

  model: Soundclone.Models.User,

  url: '/api/users',

  comparator: 'id'

});
