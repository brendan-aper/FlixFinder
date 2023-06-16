var searchBtn = document.querySelector(".search-button");
var searchInput = document.querySelector('.searchInput');
var searchArea = document.querySelector("#search-area");


function getMovieData() {
    // clear the input search value
    // searchInput.value = "";
    fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchInput.value, {
    "method": 'GET',
    "headers": {
        'X-RapidAPI-Key': 'c44e174cb6msh5932ef75ee7e78cp117f1fjsna8e356fe8736',
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
    for (var m = 0; m < 1; m++) {
        var uniqueProviders = [];
        var displayCard = document.createElement("div");
        searchArea.appendChild(displayCard).classList.add("search-card");

        var movieId = showData['d'][m]["id"];
        console.log(movieId)
        fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/watch/providers?api_key=03a6264fac3ce45399458b21ecf50a52', {
        "method": 'GET',
        "headers": {
          "accept": 'application/json',
        }
      })
        .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error("Error: ${response.status}");
          }
          })
          .then(data => {
              console.log(data.results);
              for (let p in data.results) {
                  if (data.results[p].flatrate && data.results[p].flatrate.length > 0) {
                    var providerName = data.results[p].flatrate[0].provider_name;
                    uniqueProviders = [];
                    if (!uniqueProviders.includes(providerName)) {
                      uniqueProviders.push(providerName)
                      localStorage.setItem("providers", JSON.stringify(uniqueProviders))
                    }
                  } else {
                    console.log('No provider found for result ' + p);
                  }
                }
        })

        // creating the title of the movie
        var movieTitle = document.createElement("p");
        movieTitle.innerHTML = showData['d'][m]['l'];
        movieTitle.classList.add("movieName");
        displayCard.appendChild(movieTitle);

        //creating the year it was released
        var movieDate = document.createElement("p");
        movieDate.innerHTML = showData['d'][m]['y'] || showData['d'][m]['yr'] || null;
        movieDate.classList.add("movieDate");
        displayCard.appendChild(movieDate);

        //Creating an image of the movie
        var movieImg = document.createElement('img');
        movieImg.classList.add("movieImg");
        if (showData['d'][m]['i'] && showData['d'][m]['i']['imageUrl']) {
            movieImg.src = showData['d'][m]['i']['imageUrl'];
        } else {
            movieImg.src = 'https://images.unsplash.com/photo-1493664543243-589b576c5bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmhzJTIwdGFwZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'; // Provide a fallback image URL or set it to a placeholder image
        }

        displayCard.appendChild(movieImg);
        // create providers
        var providerEl = document.createElement('p');
        providerEl.textContent = uniqueProviders;

        console.log(localStorage.getItem("providers"));
        var provider = document.createElement('p');
        provider.innerHTML = JSON.parse(localStorage.getItem("providers"));
        displayCard.append(provider);

        // creating a save button
        var saveBtn = document.createElement('button');
        saveBtn.textContent = "Save Movie"
        saveBtn.classList.add('saveBtn')
        displayCard.appendChild(saveBtn);

        (function(title, date, image) {
            saveBtn.addEventListener('click', function() {
              // Retrieve existing saved data from local storage
              var existingData = JSON.parse(localStorage.getItem('savedMovie')) || [];
    
              var savedData = {
                title: title.innerHTML,
                date: date.innerHTML,
                image: image.src
              };
              existingData.push(savedData);
    
              //Store the updated data back into local storage
              localStorage.setItem('savedMovie', JSON.stringify(existingData));

              //change text of save button
              this.textContent = "Movie Saved"
            });
          })(movieTitle, movieDate, movieImg);
        }
    })
    .catch(err => {
        console.error(err);
        })
}
    
searchBtn.addEventListener('click', function() {
    uniqueProviders = [];
    getMovieData()
})


// async function chatGTB() {
//   const url = 'https://pickup-lines-api.p.rapidapi.com/pickupline';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '708af97118msh3f74fb80ad20ee2p1f232ejsncd6d167e1b72',
// 		'X-RapidAPI-Host': 'pickup-lines-api.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }}

//   var chatGTBBTN = document.querySelector(".chatGBT");

//   chatGTBBTN.addEventListener("click", chatGTB)
  