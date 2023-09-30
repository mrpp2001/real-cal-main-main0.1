     // Define the URL of your local JSON data
     const jsonDataUrl = 'http://localhost:3000/results';

     // Get references to HTML elements
     const searchInput = document.getElementById('searchInput');
     const searchBtn = document.getElementById('searchBtn');
     const realEstateDiv = document.querySelector('.RealEstateData');

     // Function to update the HTML based on the search results
     function updateRealEstateData(city) {
         // Fetch the JSON data
         fetch(jsonDataUrl)
             .then(response => response.json())
             .then(data => {
                 // Filter the data based on the city
                 const filteredData = data.results.filter(result => result.city.toLowerCase() === city.toLowerCase());

                 // Check if there are matching results
                 if (filteredData.length > 0) {
                     // Take the first matching result (you can handle multiple results differently)
                     const result = filteredData[0];

                     // Update the HTML elements with the data
                     document.getElementById('imgSrc').src = result.imgSrc;
                     document.getElementById('price').textContent = result.price;
                     document.getElementById('rentZestimate').textContent = result.rentZestimate;
                     document.getElementById('streetAddress').textContent = result.streetAddress;
                     document.getElementById('zipcode').textContent = result.zipcode;
                     document.getElementById('livingArea').textContent = result.livingArea;
                     document.getElementById('cityName').textContent = result.city;
                     document.getElementById('state').textContent = result.state;
                     document.getElementById('homeStatus').textContent = result.homeStatus;
                     document.getElementById('homeType').textContent = result.homeType;
                     document.getElementById('bedrooms').textContent = result.bedrooms;
                     document.getElementById('bathrooms').textContent = result.bathrooms;
                 } else {
                     // If no matching results found, you can handle this case
                     // For example, show a message indicating no results found
                     realEstateDiv.innerHTML = '<p>No results found for the given city.</p>';
                 }
             })
             .catch(error => {
                 console.error('Error fetching data:', error);
             });
     }

     // Event listener for the search button
     searchBtn.addEventListener('click', () => {
         const city = searchInput.value.trim();
         if (city !== '') {
             updateRealEstateData(city);
         }
     });