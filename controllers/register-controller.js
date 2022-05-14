var connection = require('./../database');

module.exports.register= async function(user){
   
   
    let snap = await connection.query(`INSERT INTO registered 
    (name, username,  table_number) 
    VALUES 
    (?, ?, ?)`, 
    [
      user.name, user.username, user.table_no
    ])

  let message = {
            status: true,
            message: 'user registered sucessfully thank you!'
          }
  if (snap.affectedRows) {
    message = {
            status: false,
            data: results,
            message: 'there are some error with query'
          }
  }

  return message
}


module.exports.orderNow = async function(user){
    
   
    let snap = await connection.query(`INSERT INTO orders
    (name, phone, location) 
    VALUES 
    (?, ?, ?)`, 
    [
      user.name, user.tel, user.location
    ])

  let message = {
            status: true,
            message: 'Ordered sucessfully,thank you!'
          }
  if (snap.affectedRows) {
    message = {
            status: false,
            data: results,
            message: 'there are some error with query'
          }
  }

  return message
}
