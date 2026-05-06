const express = require("express");
const logger = require("./logging_middleware/logger");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});