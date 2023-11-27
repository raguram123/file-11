
const express = require("express");
const fs = require("fs");
const path = require("path");



const app = express();

const outputFolder = "./output";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const PORT = 3000

app.post("/createFile", (req, res) => {
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hrs = currentTime.getHours().toString();
  const mins = currentTime.getMinutes().toString();
  const secs = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;

  const filePath = path.join(outputFolder, dateTimeForFileName);

  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`Error creating file:$(err)`);
      return;
    }

    res.send(`File created successfully at:${filePath}`);
  });
});

// GET method


app.get("/getFiles", (req, res) => {

//POST method 
//app.post("/createFile")

  //Read the Files
  fs.readdir(outputFolder, (err, files) => {
    if (err) {


      // pass the error status
      res.status(500).send("Error reading files:${err}");
      return;
    }
    console.log("List of files:", files);
    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    res.json(textFiles);
  });
});

  // Here we are listening to the server
  app.listen(PORT, () => {
    console.log(`Server is running in the port ${PORT}`);
  });


  // postman Endpoints :
  //http://localhost:3000/createFile - POST
  //http://localhost:3000/getFiles - GEt