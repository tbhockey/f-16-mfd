// Define data for any OSBs you would like to activate.
// At least one OSB must be defined and set as "home".
const data = [
  {
    "location": 7,
    "label": "VRT",
    "content": "YOU USED A VERTICAL OSB",
    "content_type": "text",
  },
  {
    "location": 8,
    "label": "IMG",
    "content": "<img src='http://home.scarlet.be/~jansensa/CAS%20Sniper%20Big%202.jpg'>",
    "content_type": "text",
  },
  {
    "location": 13,
    "label": "HSD",
    "content": "hsd",
    "content_type": "page",
    "links": [
      {
        "location": 1,
        "label": 'DEP',
        "content": 'hsdDepress',
        "content_type": 'function',
      },
    ]
  },
  {
    "location": 15,
    "label": "Home",
    "content": "<hr><p>F-16 MFD V0.0.1</p><hr><p>BY TONY BENINATE</p><hr>",
    "content_type": "text",
    "home": true
  }
];

const defaultPageId = data.filter(function(d) { return d.home == true })[0]['location'];
var activePageId = defaultPageId;

function initializeOSBs() {
  $('.osb-label').text('');
  var id = 0;

  $.each(data, function(i, osbData) {
    var osbLabel = $("#osb_label_" + osbData['location']);
    var osb      = $("a#osb_" + osbData['location']);

    id += 1;

    osbLabel.text(osbData['label'].toUpperCase());
    osb.data('contentType', osbData['content_type']);
    osb.data('id', id);

    if (typeof osbData['links'] !== 'undefined' && activePageId == osbData['location']) {
      $(osbData['links']).each(function(i, subLink) {
        id += 1;

        var osbLabel = $("#osb_label_" + subLink['location']);
        var osb      = $("a#osb_" + subLink['location']);

        osbLabel.text(subLink['label'].toUpperCase());
        osb.data('contentType', subLink['content_type']);
        osb.data('id', id);
      });
    };
  });
};

function changeActivePage(location) {
  if (activePageId == location) { location = defaultPageId };

  var osbLabel = $("#osb_label_" + location);
  var osbData  = data.filter(function(d) { return d.location == location });

  if (osbData.length > 0) {
    $('.osb-label').removeClass('active');
    osbLabel.addClass('active');

    if (osbData[0]['content_type'] == 'text') {
      $('#page-content').html(osbData[0]['content']);
    } else if (osbData[0]['content_type'] == 'page') {
      $("#page-content").load(osbData[0]['content'] + ".html");
    };
  };

  activePageId = location;
  initializeOSBs();
};

$(document).ready(function() {

  $('a.osb').click(function(e) {
    var location = $(this).prop('id').split("_")[1];

    if ($(this).data('contentType') == 'function') {
      var parentOsb    = data.filter(function(d) { return d.location == activePageId });
      var childOsb     = parentOsb[0]['links'].filter(function(dd) { return dd.location == location });
      var functionName = childOsb[0]['content'];

      window[functionName]();
    } else {
      changeActivePage(location);
    };

    e.preventDefault();
  });

  initializeOSBs();
  changeActivePage(defaultPageId);

});
