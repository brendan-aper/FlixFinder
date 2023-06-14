

var movieSearchBar = document.getElementById("search-button");
var searchList = document.getElementById("search-card");


// search a movie

// API search movies
// define search button
var searchBtn = document.querySelector('input[name="search-button"]');
var searchInput = document.querySelector('input[type="text"]')

searchBtn.addEventListener("click", function() {
    // create value to be added to end of query string in movie API 
    var searchKey = searchInput.value;
    // clear the input search value
    searchInput.value = "";
    // give it a new placeholder to tell user to search again
    searchInput.placeholder = "Search movie title";
    fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchKey, {
    "method": 'GET',
    "headers": {
        'X-RapidAPI-Key': 'b40b73504dmshc6c0b9e39414d14p104dcejsn2a4e4edabb6f',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
})
.then(response => response.json())
.then(showData => {
    if (showData.length === 0) {
        // if entry does not load
        alert("Please re-enter search")
        // reload main page
        location.reload
    }
    // define search area
    searchArea = document.querySelector("#search-area");
    // clear search area upon search
    searchArea.innerHTML = "";
    console.log(showData);
    for (var m = 0; m < showData.d.length; m++) {
        showName = showData.d[m].l;
        showYear = showData.d[m].y;
        showImage = showData.d[m].i.imageUrl;
        console.log(showImage);
        console.log(showName, showYear);
        searchArea.innerHTML += `<div class="search-card" id="${showName}"><p class="movieName">${showName}</p><p>${showYear}</p><img class="movieImg" src="${showImage}" alt="movie-image"><br><button class="save">Save</button><a href="./map.html"><button>Get Snacks</button></a></div>`};
    var saveBtn = document.getElementsByClassName("save");
    for (var i = 0; i < saveBtn.length; i++) {
        saveBtn[i].addEventListener("click", function() {
            console.log("clicked");
            var closestMovieID = this.parentNode.id;
            // change label of button
            this.innerHTML = "Saved";
            console.log(closestMovieID);
            var storedShows = JSON.parse(localStorage.getItem('savedShows')) || [];
            var newShowTitle = closestMovieID;
            if (!storedShows.includes(newShowTitle)) {
            storedShows.push(newShowTitle)};
            localStorage.setItem('savedShows', JSON.stringify(storedShows))
            console.log(localStorage.getItem('savedShows'));

        })
    }}
    )
.catch(err => {
    console.error(err);
})
})

var seeSaved = document.querySelector(".see-saved");
seeSaved.addEventListener("click", function() {
    wiindow.location.href = "./assets/saved.html";
    console.log("hi")})


    var link = document.getElementById('saved-link');
    link.addEventListener('click', function(event) {
      event.preventDefault();
      // create data value of local storage from other HTML file
      var data = localStorage.getItem('savedShows');
      // create link 
      window.location.href = link.href + '?data=' + encodeURIComponent(data);
      console.log("worked")
    });
// event listenr to save to local storage
    // local storage is an object array 
// display saved data 
    // call local storage object and print in cards

// maps submit button calls API function 

// API fucntion for maps (limit = 5)
    // name 
    // distance from current location
    // operating hours

// dynamic styling for start watching button
    // show enjoy section
    // hide search section 