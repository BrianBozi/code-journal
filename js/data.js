/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var oldPostingJSON = localStorage.getItem('javascript-local-storage');

if (oldPostingJSON !== null) {
  data = JSON.parse(oldPostingJSON);
}

window.addEventListener('beforeunload', function (event) {
  var postingsJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', postingsJSON);
});
