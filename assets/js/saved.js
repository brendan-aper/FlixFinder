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
    var movieProviders = movieData.provider;

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

    var movieSavedProvider = document.createElement('p');
    movieSavedProvider.textContent = movieProviders;
    movieSavedProvider.classList.add("providers");
    movieDiv.appendChild(movieSavedProvider);
    
    savedMoviesDiv.appendChild(movieDiv);

    var removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove"
    movieDiv.appendChild(removeBtn);

    removeBtn.addEventListener('click', function(title, date, image) {
      return function() {
        // Retrieve existing saved data from local storage
        var savedData = JSON.parse(localStorage.getItem('savedMovie')) || [];
    
        // Find the index of the movie to be removed
        var index = savedData.findIndex(function(movie) {
          return movie.title === title && movie.date === date && movie.image === image;
        });
    
        // If the movie is found, remove it from the savedData array
        if (index !== -1) {
          savedData.splice(index, 1);
    
          // Store the modified savedData array back into the local storage
          localStorage.setItem('savedMovie', JSON.stringify(savedData));
    
          // Remove the displayed movie div from the page
          this.parentNode.remove();
        }
      };
    }(movieTitle, movieDate, movieImgSrc));
    
  }
}