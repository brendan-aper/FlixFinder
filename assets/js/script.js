var searchBtn = document.querySelector(".search-button");
var searchInput = document.querySelector('.searchInput');
var searchArea = document.querySelector("#search-area");

function getMovieData() {
    // clear the input search value
    // searchInput.value = "";
    fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchInput.value, {
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
    var savedContainer = document.querySelector('.saved-container');
    var savedData = JSON.parse(localStorage.getItem('savedShows')) || [];
    console.log(savedData)
    seeSaved.addEventListener("click", function() {
    console.log("hi");
    if (savedData && savedData.length > 0 ) {
    savedData.forEach(function(savedBundle) {
        savedContainer.innerHTML += `<div class="saved-card" id="${savedBundle.title}"><p class="movieName">${savedBundle.title}</p><p>${savedBundle.date}</p><img class="movieImg" src="${savedBundle.img}" alt="movie-image"><br><button class="remove">Remove</button><a href="./map.html"><button>Get Snacks</button></a></div>`
        });
    // functinoality of remove button - must be in the function it was created
    var removeBtn = document.getElementsByClassName("remove");
    for (var r = 0; r < removeBtn.length; r++) {
        removeBtn[r].addEventListener("click", function() {
        console.log("clicked");
        // find the ID of the parent node to the remove button (is set to movie name)
        var closestRemoveID = this.parentNode.id;
        // find the index of that value in the localStorage array
        savedData.forEach(function(obj, index) {
            if (obj.title === closestRemoveID) {
            savedData.splice(index, 1)
            console.log(savedData);
            savedData;

            closestRemoveID;
            localStorage.setItem("savedShows", JSON.stringify(savedData))
        }});})}
}});


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



