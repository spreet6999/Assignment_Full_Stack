const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = "mongodb+srv://shagun:scaler123@cluster0.db7rw.mongodb.net/test"
const interview_route = require("./routes/route_interview");
const user_route = require("./routes/route_user");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors')
app.use(bodyParser.urlencoded({     extended: false  })); 
app.use(bodyParser.json());
app.use(cors())

app.use('/interview',interview_route);
app.use('/user',user_route);

// app.use(express.static(path.join(__dirname,  'frontend','build')));
// app.get("*", (req, res) => {
//           res.sendFile(path.join(__dirname,  'frontend','build','index.html'));
// });

mongoose.Promise=global.Promise;

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }
    else
    console.log("connected to db")
})

app.listen(process.env.PORT||5000, () => {
  console.log("Server is listening on port: 5000");
});