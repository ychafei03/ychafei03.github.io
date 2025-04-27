const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());




const endpoint = 'https://api.charitynavigator.org/graphql';
const app_id = 'eyJvcmciOiI2NzM2OTIyMThhYTc3MjAwMDEwMjU3NmMiLCJpZCI6IjcwMzhjZjc3MGI5NzQ3OGQ4ODIyZDBjOTllNmI1NWZkIiwiaCI6Im11cm11cjEyOCJ9';

const body = {
  query: "query ($term: String!, $size: Int!, $from: Int!) { publicSearchFaceted(term: $term, from: $from) { size from term result_count results { ein name city state mission encompass_score charity_navigator_url } } }",
  variables: {
    term: "",
    from: 0
  }
};

const fetchCharities = async () => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': app_id, // Add your app_id here
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
app.get('/charities', async (req, res) => {
    console.log('Fetching charities...');

   const data = await fetchCharities();
    res.json(data.data.publicSearchFaceted.results);
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
