const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie')
const Celebrity = require('../models/celebrity')

router.get('/',function(req, res, next){
    Movie.find()
    //.populate('cast') //afficher cast au lieu d'Id
    .then(function(movies){
        res.render("movies/index",{
            movies:movies
        })
    }).catch(err => new(err) )
})

router.get('/new', (req, res, next) => {
    Celebrity.find().then(function(celebrities){
        console.log(celebrities)
        res.render("movies/new", {
            celebrities: celebrities
        });
    }).catch( err => next(err))

  });

router.post('/new', function(req,res,next) {

    //1. Récupérer les données reçues
    const {title,genre,plot,cast}=req.body;

  
    //2. Stocker en base
    const newMovie= new Movie({title,genre,plot,cast})
    newMovie.save()
      .then((movie) => {
        res.redirect('/movies')
      })
      .catch((error) => {
        next(err);
      })
    ;
  })

  router.get('/:id',function(req,res,next){
    Movie.findById({_id:req.params.id})
    .populate('cast')
    .then(function(movie){
      res.render("movies/show", {
        movie: movie
      })
    }).catch(err => console.error(err))
    
  })

  router.post('/:id/delete', function(req,res,next){
    Movie.findByIdAndRemove(req.params.id).then(function(){
    res.redirect(`/movies`)
  }).catch(err => next(err))})
  
  router.get('/:id/edit', function(req,res,next){
    Movie.findById(req.params.id).then(function(movie){ 
      res.render('movies/edit',{
        movie:movie}) 
    }).catch(err => next(err));
  })
  
router.post('/:id', function(req,res,next){
    Movie.update({_id:req.params.id},{$set:{
      title: req.body.title, // récupérer les données d'une méthode post
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    }}).then(function(){
    res.redirect(`/movies`)
  }).catch(err => next(err))})

  module.exports = router;