

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'endpoint desconocido' })
  }


  const ErrorHandler = (error, req,res,next) => 
  {
    console.log(error.message)
    if(error.name == "JsonWebTokenError"){
        return res.status(401).json({
            error: "el token no es valido"
        })
    }else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'el token expiró.'
      })
    }
    
    next(error)
  }
  
  

module.exports = {
    unknownEndpoint,
    ErrorHandler
}