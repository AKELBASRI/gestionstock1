const models = require('../models');
const Joi = require("joi");

const dateFormat = require('dateformat');
exports.saveMateriel=(req,res)=>{
    let current = new Date();
    const materiel={
        marque:req.body.marque.trim(),
        numeroinventaire:req.body.numeroinventaire.trim(),
        garentie:req.body.garentie,
        datereceptionprovisoire:req.body.datereceptionprovisoire,
        IDFournisseur:req.body.IDFournisseur,
        datesaisie:dateFormat(current,"yyyy-mm-dd"),
        idtype:req.body.idtype
       

    }
    models.materiel.findOne({where: {marque: req.body.marque.trim()}}).then((result)=>{
        if (result) {
          res.status(403).json({error: 'materiel existe deja !'});
          
        }
         else {
            const Joi = require('joi')
            .extend(require('@joi/date'));
        
       
            const schema = Joi.object({
                idservice:Joi.number(),
                garentie: Joi.string(),
                numeroinventaire: Joi.optional().allow(''),
                marque: Joi.string().required(),
                datereceptionprovisoire:Joi.date().required().format('YYYY-MM-DD').utc(),
                IDFournisseur:Joi.number().required(),
                idtype:Joi.number().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                error: error.details[0].message,
                });
            }else{
                models.materiel.create(materiel).then((result)=>{
                    res.status(201).json({message:'Le materiel a été crée avec succés',service:result})
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


exports.getallmateriels=(req,res)=>{
    models.materiel.findAll().
    then(materiels=>
        res.status(200).json(materiels)
        )
    .catch(error=>res.status(500).json(error));
    
}