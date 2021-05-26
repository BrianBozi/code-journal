/* global data */
/* exported data */

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
  journalEntries(post);
  document.querySelector('form').reset();

});

function journalEntries(entry) {
  var ul = document.querySelector('ul');
  var $li = document.createElement('li');
  ul.append($li);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.append($divRow);

  var $divColumnHalf = document.createElement('div');
  $divColumnHalf.setAttribute('class', 'column-half');
  $divRow.append($divColumnHalf);

  var $images = document.createElement('img');
  $images.setAttribute('src', entry.image);
  $divColumnHalf.append($images);

  var $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.setAttribute('class', 'column-half');
  $divRow.append($divColumnHalf2);

  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $divColumnHalf2.append($h2);

  var $pElement = document.createElement('p');
  $pElement.textContent = entry.comment;
  $divColumnHalf2.append($pElement);

  return $li;
}

var $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderPosts = journalEntries(data.entries[i]);
    $ul.append(renderPosts);
  }
});

var $newEntryBtn = document.querySelector('.create-new-entry-btn');
var $entryForm = document.querySelector('.container-entry-form');
var $entriesList = document.querySelector('.container-entries-list');

$newEntryBtn.addEventListener('click', function (event) {
  $entryForm.className = 'container-entry-form';
  $entriesList.className = 'container-entries-list ' + 'hidden';
});

$newPost.addEventListener('submit', function (event) {
  $entryForm.className = 'container-entry-form ' + 'hidden';
  $entriesList.className = 'container-entries-list';

});
