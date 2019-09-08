// Express app
const app = require("./app");

// Default port
const port = 3000;

app.listen(port, () => {
  console.log(`Share Portfolio Backend running on Port ${port}.`);
});

module.exports = { app };
