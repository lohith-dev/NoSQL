// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');
const {ObjectId}= require('mongodb')
const getDb = require('../util/database').getDb
class Product {
  constructor(title,price,description,imageUrl,id){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=new ObjectId(id);
  }

  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp=db.collection('products').updateOne({_id:this._id},{$set:this}) 
      
    } else{
      dbOp=db.collection('products').insertOne(this) 
    }

   return dbOp
   .then(result=>{
      console.log(result);
      return result;
    }).catch(err=>{
      console.log(err);
    })
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray().then(result=>{
     
      return result;
    }).catch(err=>{
      console.log(err);
    });
  }
  static findById(prodId){
    const db = getDb();
    return db.collection('products').findOne({_id:new ObjectId(prodId)}).then(result=>{
      console.log("llllll",result);
      return result;
    }).catch(err=>{
      console.log(err);
    });
  }

  static deletProd(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id:new ObjectId(prodId)}).then(result=>{
      console.log("llllll",result);
      return result;
    }).catch(err=>{
      console.log(err);
    });
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
