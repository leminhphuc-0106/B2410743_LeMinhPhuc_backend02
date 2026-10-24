const app = require("./app");
const config = require("./app/config");
console.log(config)
// Start server
const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});