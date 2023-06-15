console.log("loaded");

var savedCard = document.querySelector(".saved-card");
    var savedContainer = document.querySelector('.saved-container');
    var savedData = JSON.parse(localStorage.getItem('savedShows'));
    console.log(savedData)
savedCard.innerHTML += `<div class="saved-card" id="${savedBundle.title}"><p class="movieName">${savedBundle.title}</p><p>${savedBundle.date}</p><img class="movieImg" src="${savedBundle.img}" alt="movie-image"><br><button class="remove">Remove</button><a href="./map.html"><button>Get Snacks</button></a></div>`;
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
            localStorage.setItem("savedShows", JSON.stringify(savedData))}})})};