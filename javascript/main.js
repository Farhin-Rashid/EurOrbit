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
    const dropMenu = document.getElementById("drop-menu"); // Get the dropdown menu element

    result.forEach(item => {
      const li = document.createElement("li"); // Create a new list item element
      li.classList.add("dropdown-item")

      // Set the text content of the list item to display the data
      li.textContent = `${item.city}, ${item.country}`;

      dropMenu.appendChild(li); // Append the list item to the dropdown menu
      // Add event listener to the list item
      li.addEventListener("click", function() {
            const lon = item.longitude;
            const lat = item.latitude;
            const unit = 'metric';
            const product = 'civillight';
            console.log(`lon: ${lon} , lat: ${lat}`);

            const apiUrl = `http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&product=${product}&unit=${unit}&output=json`;

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(`Date: ${data.init} , temp: ${data.dataseries[0].temp2m} , Cloud cover: ${data.dataseries[0].cloudcover}, Wind speed: ${data.dataseries[0].wind10m.speed} , Wind direction: ${data.dataseries[0].wind10m.direction}`);
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