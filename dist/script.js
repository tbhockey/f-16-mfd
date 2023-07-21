// Define data for any OSBs you would like to activate.
// At least one OSB must be defined and set as "home".
const data = [
  {
    "id": 2,
    "label": "SMPL",
    "content": "THIS IS A SAMPLE PAGE"
  },
  {
    "id": 7,
    "label": "VRT",
    "content": "YOU USED A VERTICAL OSB"
  },
  {
    "id": 8,
    "label": "IMG",
    "content": "<img src='http://home.scarlet.be/~jansensa/CAS%20Sniper%20Big%202.jpg'>"
  },
  {
    "id": 12,
    "label": "Home",
    "content": "<hr><p>F-16 MFD V0.0.1</p><hr><p>BY TONY BENINATE</p><hr>",
    "home": true
  }
];

const defaultPageId = data.filter(function(d) { return d.home == true })[0]['id'];
var activePageId = defaultPageId;

function importData() {
  $.each(data, function(i, val) {
    var osbLabel = $("#osb_label_" + val['id']);
    osbLabel.text(val['label'].toUpperCase());
  });
};

function changeActivePage(id) {
  if(activePageId == id) { id = defaultPageId };

  var osbLabel = $("#osb_label_" + id);
  var definedData = data.filter(function(d) { return d.id == id });
    
  if(definedData.length > 0) {
    $('.osb-label').removeClass('active');
    osbLabel.addClass('active');

    $('#page-content').html(definedData[0]['content']);
  };

  activePageId = id;
};

$(document).ready(function() {

  $('a.osb').click(function(e) {
    var id = $(this).prop('id').split("_")[1];

    changeActivePage(id);

    e.preventDefault();
  });

  importData();
  changeActivePage(defaultPageId);

});
