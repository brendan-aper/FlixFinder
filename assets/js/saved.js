// Retrieve saved movie data from local storage
var savedData = JSON.parse(localStorage.getItem('savedMovie'));

// Display saved movie data on the page
var savedMoviesDiv = document.getElementById('savedMovies');
if (savedData) {
  for (var i = 0; i < savedData.length; i++) {
    var movieData = savedData[i];
    var movieTitle = movieData.title;
    var movieDate = movieData.date
    var movieImgSrc = movieData.image;

     // Create a new div to display the saved movie data
     var movieDiv = document.createElement('div');
    //  movieDiv.classList.add('savedMovie')
     movieDiv.classList.add('saved-card')

    // Create elements to display the saved movie data
    var movieTitleElement = document.createElement('p');
    movieTitleElement.innerHTML = movieTitle;
    movieDiv.appendChild(movieTitleElement);

    var movieDateElement = document.createElement('p');
    movieDateElement.innerHTML = movieDate;
    movieDiv.appendChild(movieDateElement);

    var movieImgElement = document.createElement('img');
    movieImgElement.src = movieImgSrc;
    movieImgElement.classList.add("movieImg");
    movieDiv.appendChild(movieImgElement);

    savedMoviesDiv.appendChild(movieDiv);
  }
}