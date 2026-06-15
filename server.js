const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get(['/', '/travelcore-rm-hub'], (req, res) => {
  res.sendFile(path.join(__dirname, 'travelcore-rm-hub.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
