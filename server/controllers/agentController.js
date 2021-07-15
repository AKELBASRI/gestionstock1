const models=require("../models");
const Joi = require("joi");
exports.getagents=(req,res)=>{
    
    models.services.hasMany(models.agents,{foreignKey: 'service_id', sourceKey: 'id'});
    models.agents.belongsTo(models.services,{foreignKey: 'service_id', sourceKey: 'service_id'});
    
    models.agencies.hasMany(models.agents,{foreignKey: 'agency_id', sourceKey: 'id'});
    models.agents.belongsTo(models.agencies,{foreignKey: 'agency_id', sourceKey: 'agency_id'});
   
    
    models.agents.findAll({attributes: ['agent_number', 'agent_full_name','agent_email','service_id','agency_id'],
                  include:[{model:models.services,attributes:['service_name']},{model:models.agencies,attributes:['agency_name']}],
              
                   required: true,}).
  
    then(agents=>
      res.status(200).json(agents)
      )
    .catch(error=>res.status(500).json(error));
}
exports.createAgent=(req,res)=>{
    models.admin.findOne({where: {Mle: req.body.agent_number}}).then((result)=>{
      if (result) {
        res.status(409).json({error: 'Matricule existe deja !'});
      } else {
        // const hash = bcrypt.hashSync(req.body.password, 10);
        // Store hash in your password DB.
        const schema = Joi.object({
            agent_number: Joi.number().required(),
            agent_full_name: Joi.string().trim().required(),
            agent_email: Joi.string().required(),
            service_id: Joi.number().required(),
            agency_id:Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
            error: error.details[0].message,
            });
        }else{
        const agent = {
          agent_number: req.body.agent_number,
          agent_full_name:req.body.agent_full_name,
          agent_email:req.body.agent_email,
          service_id:req.body.service_id,
          agency_id:req.body.agency_id
        };
        models.agents
            .create(agent)
            .then((result) => {
              res
                  .status(201)
                  .json({message: "L'agent est crée avec succés", user: result});
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({error: 'Something went wrong'+ error});
            });
      }
   }

   
 }).catch((error)=>{
      console.log(error);
      res.status(500).json({
        error: 'Something went wrong',
  
      });
    });
    
  }