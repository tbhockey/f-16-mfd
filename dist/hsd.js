var hsdDepressed = true;

function hsdDepress() {
  if (hsdDepressed) {
    $('div#hsd').css('margin-top', '0px');
    $('#osb_label_1').text('CEN');
    hsdDepressed = false;
  } else {
    $('div#hsd').css('margin-top', '140px');
    $('#osb_label_1').text('DEP');
    hsdDepressed = true;
  };
};
