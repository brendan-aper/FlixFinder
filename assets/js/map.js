


// Load the Google Maps API asynchronously
function loadMapScript() {
    const apiKey = 'AIzaSyBy38d4-L_HYa0F_W1RQmhxer5yUFcSPAU'; // Replace with your actual API key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
  }
  
  // Initialize the map
  function initMap() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          const mapOptions = {
            center: initialLocation,
            zoom: 12
          };
  
          // Create a new map instance
          const map = new google.maps.Map(
            document.getElementById('map'),
            mapOptions
          );
  
          // Add any additional map functionality or markers here
        },
        function() {
          // Handle geolocation error
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      // Browser doesn't support geolocation
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  }
  
  // Load the map script when the page is ready
  window.addEventListener('load', loadMapScript);
  