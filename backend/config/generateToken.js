const jwt  = require('jsonwebtoken');


// const generateToken = (id) =>{
//     return jwt.sign({id},"My favourate person is Punit");
// }

const generateToken = (id) => {
    const p =  jwt.sign({ id }, "MyNameisPuneetKumarSharma", {
      expiresIn: "30d",
    });
  
    return p ;
  };



module.exports = generateToken;