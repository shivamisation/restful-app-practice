var express = require("express") ;
var app = express() ;
var mongoose = require("mongoose") ;
var bodyParser = require("body-parser")
var methodOverride = require("method-override")



 // use them

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))
app.use(methodOverride("_method"))

// mongoose config


mongoose.connect("mongodb://localhost/restful_topics") ;

 var topicSchema = new mongoose.Schema({
     title : String,
     body : String, 
     created : {type : Date , default : Date.now}
       
 })

 var Topic =mongoose.model("Topic" , topicSchema) ;  

//  Topic.create({
//      title:"Dynamic programming" ,
//      body : "dynamic programming is a difficult topic to master"
//  }); 

app.get("/" , function(req , res){
    res.redirect("/topics")
})

app.get("/topics" , function(req , res){
    Topic.find({} , function(err , topics){
        if(err) console.log(err) 
        else {
          res.render("index.ejs" , {topics : topics}) ;
        }
    })
})

app.get("/topics/new" , function(req , res){
    res.render("new_topic.ejs")
})

app.post("/topics",function(req ,res){
    Topic.create(req.body.topic , function(err , newBlog){
        if(err) console.log(err)
        else {
            res.redirect("/topics")
        }
    })
})

app.get("/topics/:id", function(req , res){

    Topic.findById(req.params.id , function(err , foundtopic){
        if(err) console.log(err) 
        else res.render("show.ejs" , {topic : foundtopic})
    })

})

app.get("/topics/:id/edit" , function(req , res){

    Topic.findById(req.params.id,function(err , foundTopic){
        if(err) console.log(err) 
        else {
            res.render("edit.ejs" , {topic : foundTopic })
        }
    })
})

app.put("/topics/:id" , function(req , res) {
    Topic.findByIdAndUpdate(req.params.id,req.body.topic,function(err , updatedTopic){
        if(err){
            res.redirect("/topics")
        }
        else {
            res.redirect("/topics/" + req.params.id)
        }
    } )
})

app.delete("/topics/:id" , function(req , res){
    Topic.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/topics")
        }
        else res.redirect("/topics")
    })
})










app.listen(3000,function(){
    console.log("The server is running on port 3000...")
})

