const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, err => {
  if (!err) console.log(`Server running in ${PORT} port`);
});
