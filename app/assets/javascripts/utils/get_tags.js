Soundclone.getTags = function () {
  $.ajax("/api/tags", {
    success: function (response) {
      window.tags = response;
      // window.trigger("tagload");
    }
  });
}
