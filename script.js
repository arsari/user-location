const locationBtn = document.querySelector('#location');

function createTable(data) {
  let table = '<table>';

  table += `<tr>
            <th>Key</th>
            <th>Value</th>
          </tr>`;
  let tr = '';
  for (const key in data) {
    tr += '<tr>';
    tr += `<td>${key}</td>`;
    tr += `<td>${data[key]}</td>`;
    tr += '</tr>';
  }
  table += `${tr}</table>`;

  document.querySelector('#table').innerHTML += table;
}

locationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        createTable(data.address);
      })
      .catch(() => {
        document.querySelector('#table').innerHTML = 'Error in fetching data from API...';
      });
  });
});
