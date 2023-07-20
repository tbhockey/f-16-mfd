$(document).ready(function() {

  var activePage = null;

  $('a.osb').click(function() {
    var id = $(this).prop('id').split("_")[1];
    var osbLabel = $("#osb_label_" + id);

    if(activePage == id) {
      // Deactivate page
      osbLabel.removeClass('active');
      activePage = null;
    } else {
      // Activate page
      $('.osb-label').removeClass('active');
      osbLabel.addClass('active');
      activePage = id;
    };
  });

});
