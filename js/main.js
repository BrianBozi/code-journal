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
    //  handle submit
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

  } else {
    var $titleInput = document.querySelector('textarea[name="postTitle"]');

    var $imageInput = document.querySelector('input[type="url"]');

    var $imgSrc = document.querySelector('img');
    $imgSrc.setAttribute('src', data.editing.image);
    var $commentInput = document.querySelector('textarea[name="postComment"]');

    data.editing.title = $titleInput.value;
    data.editing.image = $imageInput.value;
    data.editing.comment = $commentInput.value;

    //  handle edit
    // data.editing;
    // var entryId = event.target.getAttribute('data-entry-id');

    for (var x = 0; x < data.entries.length; x++) {
      if (data.editing.entryId === data.entries[x].entryId) {

        data.entries.splice(x, 1, data.editing);
        //
      }
    }
    journalEntries(data.editing);
    data.editing = null;
    // sorry Brett and Scott.. I had no choice
    // this is the only i can do it until you guys
    // see the code
    location.reload();
  }

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

$newEntryBtn.addEventListener('click', function (event) {
  $entryForm.className = 'container-entry-form';
  $entriesList.className = 'container-entries-list ' + 'hidden';
});

$newPost.addEventListener('submit', function (event) {
  $entryForm.className = 'container-entry-form ' + 'hidden';
  $entriesList.className = 'container-entries-list';

});

var $clickList = document.querySelector('ul');

$clickList.addEventListener('click', function (event) {
  // console.log(event.target);
  // console.log(event.target.tagName);

  if (event.target.tagName !== 'I') {
    return;
  }
  $entryForm.className = 'container-entry-form';
  $entriesList.className = 'container-entries-list ' + 'hidden';

  var entryId = event.target.getAttribute('data-entry-id');
  entryId = parseInt(entryId);
  // data.editing = data.entries[entryId - 1];

  // var entryIndex;

  for (var i = 0; i < data.entries.length; i++) {

    if (data.entries[i].entryId === entryId) {
      // entryIndex = i;
      data.editing = data.entries[i];
    }
  }

  // data.editing = data.entries[entryIndex];

  // console.log('data-editing:', data.editing);

  var $titleInput = document.querySelector('textarea[name="postTitle"]');
  // console.log('titleInput', $titleInput.value);
  var $imageInput = document.querySelector('input[type="url"]');

  var $imgSrc = document.querySelector('img');
  $imgSrc.setAttribute('src', data.editing.image);
  var $commentInput = document.querySelector('textarea[name="postComment"]');

  $titleInput.value = data.editing.title;
  // console.log('titleInput 2 ', $titleInput.value);
  $imageInput.value = data.editing.image;
  $commentInput.value = data.editing.comment;

  // data.editing.title = $titleInput.value;
  // console.log('dataEditing.title ', data.editing.title);
  // data.editing.img = $imageInput.value;
  // data.editing.comment = $commentInput.value;

  // data.editing = null;

//   console.log(data.editing);
});
