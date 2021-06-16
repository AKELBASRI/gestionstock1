exports.userSigninValidator=(req,res,next)=>{
    req.check('Mle','Matricule est obligatoire').notEmpty();
    req.check('password','le mot de passe est obligatoire').notEmpty();;
    req.check('nom','le nom est obligatoire').notEmpty();;
    const errors=req.validationErrors();
    if(errors){
        return res.status(400).json({error:errors[0].msg})
       
        
    }
    next();
}