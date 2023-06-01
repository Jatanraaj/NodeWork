const cors=require("cors");
const express = require('express');
const apiData=require("./data.json")
const app = express();
app.use(cors());

const port =process.env.PORT || 3000;

// Define your API routes and endpoints
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get("/service",(req,res)=>{
 res.send(apiData)
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
