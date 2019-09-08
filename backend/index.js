// Express app
const app = require("./app");

// Default port
const port = 3000;

app.listen(port, () => {
  console.log(`Shares Portfolio Backend server running on Port ${ process.env.PORT || port}.`);
});

module.exports = { app };
