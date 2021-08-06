const models = require('../models');
const Joi = require("joi");
exports.saveDesignation=(req,res)=>{
    const designation={
       
        designation:req.body.designation.trim(),
        idtype:req.body.idtype,
    }
    models.designation.findOne({where: {designation: req.body.designation.trim()}}).then((result)=>{
        if (result) {
          res.status(403).json({error: 'designation existe deja !'});
          
        }
         else {
           
            const schema = Joi.object({
                designation: Joi.string().trim().required(),
                idtype:Joi.number().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                error: error.details[0].message,
                });
            }else{
                models.designation.create(designation).then((result)=>{
                    res.status(201).json({message:'La designation a été crée avec succés',designation:result})
                })
                .catch((error)=>{
                    console.log(error);
                    res.status(500).json({message:'Something went wrong',error:error})
                })
            
            }
        }   
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({
          message: 'Something went wrong',
    
        });
      });
}

exports.getAllDesignation=(req,res)=>{
    models.typemateriel.hasMany(models.designation,{foreignKey: 'idtype', sourceKey: 'id'});
    models.designation.belongsTo(models.typemateriel,{foreignKey: 'idtype', sourceKey: 'id'});
    models.designation.findAll({ include:[
     
        {model:models.typemateriel,attributes:['type']},
        
    ]}).
    then(designations=>
        res.status(200).json(designations)
        )
    .catch(error=>res.status(500).json(error));
    
}


exports.deleteDesignation=(req,res)=>{
  
    models.designation.destroy({where: {idDesignation: req.body.idDesignation}})
    .then((result) => {
    res.status(201)
    .json({message: "la designation a été supprimé avec succés ", designation: result});
   })
   .catch((error) => {
   console.log(error);
   res.status(500).json({error: 'Something went wrong'+ error});
   });
   
}

exports.updateDesignation=(req,res)=>{
  
    models.designation.update(req.body,{where: {idDesignation: req.body.idDesignation}})
                .then((result) => {
                  res.status(201)
                      .json({message: "la designation a été modifié avec succés ", designation: result});
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({error: 'Something went wrong'+ error});
                });
  }

  


exports.DesignationById = (req, res, next, idtype) => {
    models.designation.findAll({where:{idtype}}).
    then(
        (designation) => {
           
            
            req.designation = designation;
            next();
        }
        // designations=>
        // req.designation=designations
        )
    .catch(error=>res.status(500).json(error));
  };
exports.showDesignation = (req, res) => {
   
    res.status(201).json({designation:req.designation})
    
  };