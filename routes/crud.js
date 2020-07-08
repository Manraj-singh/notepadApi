const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer');
var upload = multer({ dest: 'uploads/'})

const { checkLoginUser } = require("../middlewares/authorize")
require("../model/notes")
require("../model/user")
const usermodel = mongoose.model('userModel')
const notemodel = mongoose.model('noteModel')


//to upload file
router.post('/upload',upload.single('notefile'),(req,res)=>{
const newnote = new notemodel({ files :req.file.originalname,note:req.body.note,addedBy:req.user})
 newnote.save()
 .then(data =>{
    res.status(200).json([{"status":"success"},{"note" : data.note}])
})
.catch(err => {
    res.status(400).send(err)
})
})

// to fetch all the notes
router.get('/getNotes',checkLoginUser,(req,res,)=>{

notemodel.find({addedBy:req.user._id})
.populate('addedBy','_id note')
.then(data =>{
    res.json({data})
})
.catch(err => {
	res.status(400).send(err)
})

})



// to fetch  the notes by id
router.get('/getNote:id/',checkLoginUser,(req,res,)=>{

notemodel.findOne({_id:req.params.id})
.then(data =>{
    res.json({data})
})
.catch(err => {
	res.status(400).send(err)
})

})

//add new note
router.post('/newNote',checkLoginUser,(req,res)=>{
const newNote = req.body.note;
 const newnote = new notemodel({note:newNote,addedBy:req.user})
 newnote.save()
 .then(data =>{
    res.status(200).json([{"status":"success"},{"note" : data.note}])
})
.catch(err => {
    res.status(400).send(err)
})
   
});


//delete note

router.delete('/deleteNote/:id',checkLoginUser, (req, res) => {
    notemodel.findOne({ _id: req.params.id })
        .then(data => {
            data.remove()
            res.status(200).json([{"status":"success"},{"deleted" : data}]);
        })
        .catch(err => {
            res.status(400).send(err)
        })
})



//edit note by id 

router.put('/editNote/:id',checkLoginUser, (req, res) => {

    var Id = req.params.id;
    var editnote = { $set: { note: req.body.note } };
    

    notemodel.findByIdAndUpdate({ _id: Id }, editnote)
        .then(data => {
            res.status(200).json([{"status":"success"},{"edited" : data}])
        })
        .catch(err => { 
            res.status(400).send(err) 
        })
})


module.exports = router
