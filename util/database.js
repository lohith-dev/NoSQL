// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// let _db;
// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb+srv://srlohith92:Lohith@123@cluster0.kce3sda.mongodb.net/'
//   )
//     .then(client => {
//       console.log('Connected!');
//       _db = client.db();
//       callback(client); 
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const getDb=()=>{
//   if(_db){
//     return _db;
//   }
//   throw "No database found!"
// }

// exports.mongoConnect=mongoConnect;
// exports.getDb = getDb;
