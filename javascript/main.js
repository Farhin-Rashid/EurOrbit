// Parse the csv file
fetch("city_coordinates.csv")
  .then(response => response.text())
  .then(csv => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    headers[headers.length - 1] = headers[headers.length - 1].replace("\r", "");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    // Add the data to the dropdown menu
    const dropMenu = document.getElementById("drop-menu"); 

    result.forEach(item => {
    const li = document.createElement("li"); 
      li.classList.add("dropdown-item")

      li.textContent = `${item.city}, ${item.country}`;

      dropMenu.appendChild(li); 

      
      // Add event listener to the list item
      li.addEventListener("click", function() {
            // Create container to display data
            const infoDiv = document.getElementById("weather-info")
            const info = document.createElement("p");
            info.classList.add("info")
            infoDiv.appendChild(info)
            
            const lon = item.longitude;
            const lat = item.latitude;
            const unit = 'metric';
            const product = 'civillight';
            console.log(`lon: ${lon} , lat: ${lat}`);

            // API call
            const apiUrl = `http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&product=${product}&unit=${unit}&output=json`;

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                info.innerText = `Date: ${data.init} \n temp: ${data.dataseries[0].temp2m} \n Cloud cover: ${data.dataseries[0].cloudcover} \n Wind speed: ${data.dataseries[0].wind10m.speed} \n Wind direction: ${data.dataseries[0].wind10m.direction}`
            })
            .catch(error => {
                console.error('Error:', error);
            });
       });
    });
  })
  .catch(error => {
    console.error(error);
  });