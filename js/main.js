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

  if (data.editing === null) {

    var post = {
      title: $newPost.postTitle.value,
      image: $newPost.photoURL.value,
      comment: $newPost.postComment.value,
      entryId: data.nextEntryId
    };

    data.nextEntryId++;
    data.entries.unshift(post);

    $placeHolder.setAttribute('src', './images/placeholder-image-square.jpg');
    updateDomEntries(post);

  } else {
    var $titleInput = document.querySelector('textarea[name="postTitle"]');

    var $imageInput = document.querySelector('input[type="url"]');

    var $imgSrc = document.querySelector('img');
    $imgSrc.setAttribute('src', data.editing.image);
    var $commentInput = document.querySelector('textarea[name="postComment"]');

    data.editing.title = $titleInput.value;
    data.editing.image = $imageInput.value;
    data.editing.comment = $commentInput.value;

    for (var x = 0; x < data.entries.length; x++) {
      if (data.editing.entryId === data.entries[x].entryId) {

        data.entries.splice(x, 1, data.editing);

        updateDomEntries(data.entries);
      }
    }

  }

  document.querySelector('form').reset();

  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');
});

function journalEntries(entry) {

  var $li = document.createElement('li');

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

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'far fa-edit');
  $editIcon.setAttribute('data-entry-id', entry.entryId);
  $h2.append($editIcon);

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

var $deleteEntrybtn = document.querySelector('.delete-entry');

$newEntryBtn.addEventListener('click', function (event) {
  $entryForm.className = 'container-entry-form';
  $entriesList.className = 'container-entries-list ' + 'hidden';

  $deleteEntrybtn.className = 'delete-entry ' + 'hidden';
});

$newPost.addEventListener('submit', function (event) {
  $entryForm.className = 'container-entry-form ' + 'hidden';
  $entriesList.className = 'container-entries-list';

});

var $clickList = document.querySelector('ul');

$clickList.addEventListener('click', function (event) {

  if (event.target.tagName !== 'I') {
    return;
  }
  $entryForm.className = 'container-entry-form';

  $deleteEntrybtn.className = 'delete-entry';
  $entriesList.className = 'container-entries-list ' + 'hidden';

  var entryId = event.target.getAttribute('data-entry-id');
  entryId = parseInt(entryId);

  for (var i = 0; i < data.entries.length; i++) {

    if (data.entries[i].entryId === entryId) {

      data.editing = data.entries[i];
    }
  }

  var $titleInput = document.querySelector('textarea[name="postTitle"]');

  var $imageInput = document.querySelector('input[type="url"]');

  var $imgSrc = document.querySelector('img');
  $imgSrc.setAttribute('src', data.editing.image);
  var $commentInput = document.querySelector('textarea[name="postComment"]');

  $titleInput.value = data.editing.title;

  $imageInput.value = data.editing.image;
  $commentInput.value = data.editing.comment;

});

function updateDomEntries(event) {

  var $ul = document.querySelector('ul');

  $ul.innerHTML = '';

  for (var i = 0; i < data.entries.length; i++) {

    var renderUpdatedEntires = journalEntries(data.entries[i]);
    $ul.append(renderUpdatedEntires);

  }
}

var $modal = document.querySelector('.modal');
var $cancelBtn = document.querySelector('.modal-cancel');
var $confirmBtn = document.querySelector('.modal-confirm');

$deleteEntrybtn.addEventListener('click', function (event) {
  $modal.className = 'modal';

});

$cancelBtn.addEventListener('click', function (event) {
  $modal.className = 'modal ' + 'hidden';

});

$confirmBtn.addEventListener('click', function (event) {

  for (var x = 0; x < data.entries.length; x++) {
    if (data.editing.entryId === data.entries[x].entryId) {

      data.entries.splice(x, 1);

    }

  }
  updateDomEntries(data.entries);
  $modal.className = 'modal ' + 'hidden';
  $entryForm.className = 'container-entry-form ' + 'hidden';
  $entriesList.className = 'container-entries-list';

  data.editing = null;
  document.querySelector('form').reset();
  var $imgSrc = document.querySelector('img');
  $imgSrc.setAttribute('src', './images/placeholder-image-square.jpg');

});
