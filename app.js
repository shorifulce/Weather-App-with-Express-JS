
const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    
    res.sendFile(__dirname+"/index.html")
  
});

app.post("/", function(req,res){

      

    const query=req.body.cityName;
    const apikey="4f08e50011da7c40780489d56383d1b2";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
 
   https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
           
          const weatherdata= JSON.parse(data);
          const temp=weatherdata.main.temp;
          const weatherDescription=weatherdata.weather[0].description;

          const icon=weatherdata.weather[0].icon;
          const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

          
          res.write("<p> Description: "+weatherDescription+"<p>"+"<h1> temperture is:" +temp+ "</h1>");
          res.write("<img src="+imageURL+">");

          res.send();

        },);

   })

});



app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000.")
})