// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const getDb = require('../util/database').getDb;
const {ObjectId}= require('mongodb');

class User {
  constructor(name,email,id){
    this.email=email;
    this.name=name;
    this.ObjectId(_id)
  }


 save(){
    const db = getDb();
   return db.collection('users').insertOne(this) 
    .then(result=>{
        return result;
      }).catch(err=>{
        console.log(err);
      })
    }
    static fetchAll(){
      const db = getDb();
      return db.collection('users').find().toArray().then(result=>{
        return result;
      }).catch(err=>{
        console.log(err);
      });
    }
    static findById(prodId){
      const db = getDb();
      return db.collection('users').findOne({_id:new ObjectId(prodId)}).then(result=>{
        return result;
      }).catch(err=>{
        console.log(err);
      });
    }
}
// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
