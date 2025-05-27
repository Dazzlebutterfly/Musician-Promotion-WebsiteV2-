import { musicians } from './musicians.js';

var elementFound = null;

// Compile Handlebars template once on load
const templateSource = document.getElementById('musician-template').innerHTML;
const musicianTemplate = Handlebars.compile(templateSource);

/** Output the array of objects onto the page, including photos */
function displayMusicians() {
  const container = document.getElementById('musicians-container');
  // Render Handlebars template with musicians data
  container.innerHTML = musicianTemplate({ musicians });
  cardListener();
}

function cardListener() {
  const cards = document.querySelectorAll('.musician-card');
  cards.forEach(card => {
    card.addEventListener('mouseover', (event) => {
      boxExpandShrink(event, card);
    });
  });
}

function boxExpandShrink(event, card) {
  card.style.transition = 'transform 0.3s ease';
  card.style.transform = 'scale(1.2)';
  setTimeout(function () { card.style.transform = 'scale(1.0)'; }, 1000);
}

function searchForName(filter) {
  return musicians.some(element => {
    if (filter === element.userName.trim().toLowerCase()) {
      elementFound = element;
      return true;
    }
    return false;
  });
}

function displayFilteredData(filter) {
  filter = filter.trim().toLowerCase();

  const filteredMusicians = musicians.filter(m => m.userName.toLowerCase() === filter || filter === "");
  const container = document.getElementById('musicians-container');

  container.innerHTML = musicianTemplate({ musicians: filteredMusicians });
  cardListener();

  if (filteredMusicians.length === 0) {
    const errorMessage = container.querySelector('.no-match-message');
    if (errorMessage) errorMessage.classList.remove('hidden');
  }
}

function removeMusician(musicianName, genre) {
  musicianName = musicianName.trim().toLowerCase();
  genre = genre.toLowerCase();
  if (searchForName(musicianName)) {
    var indexToRemove = musicians.indexOf(elementFound);
    if (musicians[indexToRemove].genreOfMusic.toLowerCase() === genre) {
      musicians.splice(indexToRemove, 1);
      displayMusicians();
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: musicianName.toUpperCase() + ' has been successfully removed.'
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Mismatch!',
        text: 'Make sure that the genre and musician names match.'
      });
    }
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There is no musician with the name you have provided.'
    });
  }
}

function editMusician(musician, URL, favSong) {
  let changed = false;
  if (URL && isValidUrl(URL)) {
    musician.pfpURL = URL;
    changed = true;
  }
  if (favSong) {
    musician.favSong = favSong;
    changed = true;
  }
  if (changed) {
    Swal.fire({
      icon: 'success',
      title: 'Changed!',
      text: 'Successfully saved changes to musician.'
    });
    displayMusicians();
  }
  else {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: 'No changes were made.'
    });
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function addMusician(musicianName, musicianGenre, musicianURL, musicianFavSong) {
  if (!musicianName || !musicianGenre || !musicianURL || !musicianFavSong) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: 'Please enter the information correctly.'
    });
    return;
  }
  if (!isValidUrl(musicianURL)) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: 'Please enter a valid url.'
    });
    return;
  }

  const newMusician = {
    userName: musicianName,
    genreOfMusic: musicianGenre,
    pfpURL: musicianURL,
    favSong: musicianFavSong
  };

  musicians.push(newMusician);
  displayMusicians();
  Swal.fire("The musician " + musicianName + " has been added to the list successfully.", "success");
}

function findMusician(userName, genre) {
  userName = userName.toLowerCase();
  genre = genre.toLowerCase();
  if (!searchForName(userName)) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: 'There is no musician with such a name.'
    });
    return null;
  } else {
    const found = musicians.find(item =>
      item.userName.toLowerCase() === userName &&
      item.genreOfMusic.toLowerCase() === genre
    );
    if (found) {
      return found;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Notice!',
        text: 'Make sure the genre matches the musician.'
      });
      return null;
    }
  }
}

const searchButton = document.getElementById('search-button');
const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');
const removeButton = document.getElementById('remove-button');

if (searchButton) {
  searchButton.addEventListener('click', (evt) => {
    var searchText = document.getElementById('search-input').value;
    displayFilteredData(searchText);
  });
}

if (addButton) {
  addButton.addEventListener('click', (evt) => {
    var rUserName = document.getElementById('userName').value;
    var rGenre = document.getElementById('genre').value;
    var rPfpURL = document.getElementById('pfpURL').value;
    var rFavSong = document.getElementById('favSong').value;
    addMusician(rUserName, rGenre, rPfpURL, rFavSong);
  });
}

if (editButton) {
  editButton.addEventListener('click', (evt) => {
    var rUserName = document.getElementById('userName').value;
    var rGenre = document.getElementById('genre').value;
    var rPfpURL = document.getElementById('pfpURL').value;
    var rFavSong = document.getElementById('favSong').value;
    if (!rUserName || !rGenre) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'The username and genre fields cannot be empty.'
      });
      return;
    }
    let foundMusician = findMusician(rUserName, rGenre);
    if (foundMusician) {
      editMusician(foundMusician, rPfpURL, rFavSong);
    }
  });
}

if (removeButton) {
  removeButton.addEventListener('click', (evt) => {
    var rUserName = document.getElementById('userName').value;
    var rGenre = document.getElementById('genre').value;
    if (!rUserName || !rGenre) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'The username and genre fields cannot be empty.'
      });
      return;
    }
    removeMusician(rUserName, rGenre);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  displayMusicians();
});
