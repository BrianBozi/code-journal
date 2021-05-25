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

var $placeHolder = document.querySelector('img');
var $newImage = document.querySelector('input[type="url"');
var $newPost = document.querySelector('#new-post');

$newImage.addEventListener('input', function (event) {
  $placeHolder.setAttribute('src', event.target.value);
});

$newPost.addEventListener('submit', function (event) {
  event.preventDefault();

  var post = {
    title: $newPost.postTitle.value,
    image: $newPost.photoURL.value,
    comment: $newPost.postComment.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.push(post);

  $placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');
  document.querySelector('form').reset();

});
