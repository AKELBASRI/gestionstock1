const admin = require("../models/admin");
const models=require("../models")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.getOneUser = (req, res) => {
    
    res.json({
      user: req.profile,
    });
  };

exports.createUser=(req,res)=>{
  models.admin.findOne({where: {Mle: req.body.Mle}}).then((result)=>{
    if (result) {
      res.status(409).json({error: 'Matricule existe deja !'});
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      // Store hash in your password DB.
      const user = {
        Mle: req.body.Mle,
        password: hash,
        nom:req.body.nom
        
      };
      models.admin
          .create(user)
          .then((result) => {
            res
                .status(201)
                .json({message: "L'utilisateur est crée avec succés", user: result});
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({error: 'Something went wrong'+ error});
          });
    }
  }).catch((error)=>{
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong',

    });
  });
}

exports.getusers=(req,res)=>{
   
    models.admin.findAll({attributes: ['nom', 'Mle']}).
    then(users=>
      res.status(200).json(users)
      )
    .catch(error=>res.status(500).json(error));
}
exports.updatepassword=(req,res)=>{
  const hash = bcrypt.hashSync(req.body.password, 10);
  models.admin.update({password:hash},{where: {Mle: req.body.Mle}})
              .then((result) => {
                res.status(201)
                    .json({message: "Le mot de passe est modifié avec succés", user: result});
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({error: 'Something went wrong'+ error});
              });
}

exports.updateUser=(req,res)=>{
  
  models.admin.update(req.body,{where: {Mle: req.body.Mle}})
              .then((result) => {
                res.status(201)
                    .json({message: "l'utilisateur a été modifié avec succés ", user: result});
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({error: 'Something went wrong'+ error});
              });
}
exports.deleteUser=(req,res)=>{
  
     models.admin.destroy({where: {Mle: req.body.Mle}})
     .then((result) => {
     res.status(201)
     .json({message: "l'utilisateur a été supprimé avec succés ", user: result});
    })
    .catch((error) => {
    console.log(error);
    res.status(500).json({error: 'Something went wrong'+ error});
    });
    
}

