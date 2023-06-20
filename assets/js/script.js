var searchBtn = document.querySelector(".search-button");
var searchInput = document.querySelector('.searchInput');
var searchArea = document.querySelector("#search-area");

async function getMovieData() {
  try {
    const response = await fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchInput.value, {
      "method": 'GET',
      "headers": {
        'X-RapidAPI-Key': 'c44e174cb6msh5932ef75ee7e78cp117f1fjsna8e356fe8736',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    });

    const showData = await response.json();

    if (showData.length === 0) {
      alert("Please re-enter search");
      location.reload();
    }

    searchArea.innerHTML = "";

    for (var m = 0; m < 1; m++) {
      var uniqueProviders = [];
      var displayCard = document.createElement("div");
      searchArea.appendChild(displayCard).classList.add("search-card");

      var movieId = showData['d'][m]["id"];
      const providersResponse = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/watch/providers?api_key=03a6264fac3ce45399458b21ecf50a52', {
        "method": 'GET',
        "headers": {
          "accept": 'application/json',
        }
      });

      if (providersResponse.ok) {
        const data = await providersResponse.json();
        console.log(data.results);

        for (let p in data.results) {
          if (data.results[p].flatrate && data.results[p].flatrate.length > 0) {
            var providerName = data.results[p].flatrate[0].provider_name;
            if (!uniqueProviders.includes(providerName)) {
              uniqueProviders.push(providerName);
              localStorage.setItem("providers", JSON.stringify(uniqueProviders));
            }
          } 
        }
      } else {
        throw new Error("Error: " + providersResponse.status);
      }

      var movieTitle = document.createElement("p");
      movieTitle.innerHTML = showData['d'][m]['l'];
      movieTitle.classList.add("movieName");
      displayCard.appendChild(movieTitle);

      var movieDate = document.createElement("p");
      movieDate.innerHTML = showData['d'][m]['y'] || showData['d'][m]['yr'] || null;
      movieDate.classList.add("movieDate");
      displayCard.appendChild(movieDate);

      var movieImg = document.createElement('img');
      movieImg.classList.add("movieImg");
      if (showData['d'][m]['i'] && showData['d'][m]['i']['imageUrl']) {
        movieImg.src = showData['d'][m]['i']['imageUrl'];
      } else {
        movieImg.src = 'https://images.unsplash.com/photo-1493664543243-589b576c5bcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmhzJTIwdGFwZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';
      }

      displayCard.appendChild(movieImg);

      var providerEl = document.createElement('p');
      providerEl.textContent = uniqueProviders;

      console.log(localStorage.getItem("providers"));
      var provider = document.createElement('p');
      provider.innerHTML = JSON.parse(localStorage.getItem("providers")).join(', ');
      displayCard.append(provider);

      var saveBtn = document.createElement('button');
      saveBtn.textContent = "Save Movie"
      saveBtn.classList.add('saveBtn')
      displayCard.appendChild(saveBtn);

      (function(title, date, image, provider) {
        saveBtn.addEventListener('click', function() {
          var existingData = JSON.parse(localStorage.getItem('savedMovie')) || [];
          var savedData = {
            title: title.innerHTML,
            date: date.innerHTML,
            image: image.src,
            provider: provider.textContent
          };
          existingData.push(savedData);
          localStorage.setItem('savedMovie', JSON.stringify(existingData));
          this.textContent = "Movie Saved"
        });
      })(movieTitle, movieDate, movieImg, providerEl);
    }
  } catch (error) {
    var errorNotification = document.getElementById('error-notification');
    var errorMessage = document.getElementById('error-message');
  
    errorMessage.textContent = "Could not find title";
    errorNotification.classList.remove('hidden');
    searchArea.classList.add('hidden');

    var reloadButton = document.getElementById('reload-button');
    reloadButton.addEventListener('click', function () {
      errorNotification.classList.add('hidden');
      searchArea.classList.remove('hidden');

      location.reload();
    });
  }
}

searchBtn.addEventListener('click', function() {
  uniqueProviders = [];
  getMovieData();
});
