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
exports.updateMateriel=(req,res)=>{
  
    models.materiel.update(req.body,{where: {idmateriel: req.body.idmateriel}})
                .then((result) => {
                  res.status(201)
                      .json({message: "le materiel a été modifié avec succés ", materiel: result});
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({error: 'Something went wrong'+ error});
                });
  }

exports.getallmateriels=(req,res)=>{
    models.agents.hasMany(models.materiel,{foreignKey: 'mleagent', sourceKey: 'agent_number'});
    models.materiel.belongsTo(models.agents,{foreignKey: 'mleagent', sourceKey: 'agent_number'});
    
    models.agencies.hasMany(models.materiel,{foreignKey: 'idagence', sourceKey: 'id'});
    models.materiel.belongsTo(models.agencies,{foreignKey: 'idagence', sourceKey: 'id'});

    models.typemateriel.hasMany(models.materiel,{foreignKey: 'idtype', sourceKey: 'id'});
    models.materiel.belongsTo(models.typemateriel,{foreignKey: 'idtype', sourceKey: 'idtype'});

    models.services.hasMany(models.materiel,{foreignKey: 'idservice', sourceKey: 'id'});
    models.materiel.belongsTo(models.services,{foreignKey: 'idservice', sourceKey: 'idservice'});

    models.fournisseur.hasMany(models.materiel,{foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur'});
    models.materiel.belongsTo(models.fournisseur,{foreignKey: 'IDFournisseur', sourceKey: 'idFournisseur'});


    models.materiel.findAll({attributes: ['idmateriel', 'marque','numeroinventaire','garentie','datereceptionprovisoire','Affecter','idtype','IDFournisseur'],
    include:[
        {model:models.services,attributes:['service_name']},
        {model:models.agencies,attributes:['agency_name']},
        {model:models.agents,attributes:['agent_full_name']},
        {model:models.typemateriel,attributes:['type']},
        {model:models.fournisseur,attributes:['NomFournisseur']}
    ]}).
    then(materiels=>
        res.status(200).json(materiels)
        )
    .catch(error=>res.status(500).json(error));
    
}