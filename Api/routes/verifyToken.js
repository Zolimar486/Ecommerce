const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]

     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) return res.status(404).json('token is not validated')
         req.user = user
         next();
      
      })
    }else{
       return res.status(404).json('you are not authenticated')
    }
}


const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else {
            res.status(404).json('you are not allowed to do that!')
        }
        
    })
}



// VERIFICATION FOR ADMIN, JUST TO MAKE REQUEST ONLY THEMSELF FOR PRODUCT AND ORDER

const verifyTokenAdmin = (req,res,next) => {
     verifyToken(req,res, () => {
        if(req.user.isAdmin){
            next()
        }else{
            res.status(404).json("you are not allowed  to do that")
        }
     })
}


module.exports  = { verifyToken , verifyTokenAndAuthorization, verifyTokenAdmin }