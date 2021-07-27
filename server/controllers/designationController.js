const models = require('../models');
const Joi = require("joi");

exports.getAllDesignation=(req,res)=>{
    models.designation.findAll().
    then(designations=>
        res.status(200).json(designations)
        )
    .catch(error=>res.status(500).json(error));
    
}