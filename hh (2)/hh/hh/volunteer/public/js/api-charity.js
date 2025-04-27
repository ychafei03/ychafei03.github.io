(function() {
  const container = document.getElementById('charity-container');

  fetch('http://localhost:3000/charities') // <-- Now call your own server!
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => {
      console.log('Charity API data:', data);

      data.forEach(org => {
        console.log(org.name);
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${org.name}</h5>
              <p class="card-text text-truncate">${org.mission || 'No mission available.'}</p>
              <a href="${org.charity_navigator_url}" target="_blank" class="btn btn-sm btn-outline-primary">
                Visit Website
              </a>
            </div>
          </div>`;
        container.appendChild(col);
      });
    })
    .catch(err => {
      console.error('Charity API error:', err);
      container.innerHTML = '<p class="text-danger">Unable to load charity data at this time.</p>';
    });
})();
