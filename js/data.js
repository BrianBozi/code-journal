/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $placeHolder = document.querySelector('img');
var $newImage = document.querySelector('input[type="url"');

$newImage.addEventListener('input', function (event) {
  $placeHolder.setAttribute('src', event.target.value);

});
