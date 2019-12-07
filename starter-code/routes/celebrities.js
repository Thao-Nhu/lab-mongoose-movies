const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity')

router.get('/', function (req, res, next) {
    Celebrity.find().then(function(celebrities){
        console.log("Mes celebrities sont",celebrities)
        res.render('celebrities/index',{
          celebrities: celebrities
        });
       }).catch(err => console.error(err));
       
})

router.get('/new', (req, res, next) => {
    res.render("celebrities/new");
  });

router.post('/new', function(req,res,next) {

    //1. Récupérer les données reçues
    const name= req.body.name; // il y a un bodyparser déjà installé
    const occupation=req.body.occupation;
    const catchPhrase= req.body.catchPhrase;

  
    //2. Stocker en base
   Celebrity.create({
     name:name,
     occupation:occupation,
     catchPhrase:catchPhrase
   }).then(function(book){
     //le book est créé
     res.redirect('/celebrities'); // génère une requête get
   }).catch(function(err) {
     console.error(err);
     next(err) // next (err) permet d'afficher l'errerur à l'utilisateur, doit passer dans middleware erreur, défini dans error.hbs
    })
  })

  
router.post('/:id/delete', function(req,res,next){
    Celebrity.findByIdAndRemove(req.params.id).then(function(){
    res.redirect(`/celebrities`)
}).catch(err => next(err))})
  

router.get('/:id/edit', function(req,res,next){
    Celebrity.findById(req.params.id).then(function(celebrity){ // j'interroge ma page
      res.render('celebrities/edit',{
        celebrity:celebrity}) //je rends le template avec le livre récupéré
    }).catch(err => next(err));
  })
  
router.post('/:id', function(req,res,next){
    Celebrity.update({_id:req.params.id},{$set:{
      name: req.body.name, // récupérer les données d'une méthode post
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    }}).then(function(){
    res.redirect(`/celebrities/${req.params.id}`)
  }).catch(err => next(err))})

router.get('/:id',function(req,res,next){
    Celebrity.findById({_id:req.params.id})
    .then(function(celebrity){
      res.render("celebrities/show", {
        celebrity: celebrity 
      })
    }).catch(err => console.error(err))
    
  })



module.exports = router;