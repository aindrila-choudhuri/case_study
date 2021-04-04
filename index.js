const app = require("./app");
const {connectDB} = require("./database/connection");

const PORT = process.env.PORT || 8070;

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Running at localhost:${PORT}`);
    });
})