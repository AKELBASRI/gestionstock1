const models = require("../models");
exports.userById = (req, res, next, mle) => {
    models.admin.findOne({where: {Mle: mle}}).then((user)=>{
        if (user===null) {
            res.status(404).json({
              message: 'user not found',
            });
          } else {
              req.profile=user;
          }
          next();
    }).catch((error)=>{
        res.status(500).json({
          message: 'Something went wrong !'+error,
        });
      });
};
