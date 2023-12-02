// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const getDb = require('../util/database').getDb;
const {ObjectId}= require('mongodb');

class User {
  constructor(name,email,cart,id){
    this.email=email;
    this.name=name;
    this.cart = cart;
    this._id = ObjectId(id)
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
    addToCart(product){
      const cartProductIndex = this.cart.items.findIndex(cp=>{
           const cpProductId = new ObjectId(cp.productId);
           const productId = new ObjectId(product._id);
           return cpProductId.equals(productId);
      })
    
      let newQuantity=1;
      const updatedCartItems= [...this.cart.items]
      if(cartProductIndex>=0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      }else{
        updatedCartItems.push({productId:new ObjectId(product._id), quantity: newQuantity})
      }
     
      const UpdatedCart = {
        items:updatedCartItems
      };
      const db = getDb();
      return  db.collection('users').updateOne(
        {_id:new ObjectId(this._id)},
        {$set :{cart:UpdatedCart}}
        )
    }

    getCart(){
      const db = getDb();
      const productIds = this.cart.items.map(i=>{
        return i.productId;
      })
      return db.collection('products').find({_id:{$in:productIds}}).toArray().then(products=>{
        return products.map(p=>{
          return {
            ...p,
          quantity:this.cart.items.find(i=>{
            return i.productId.toString()===p._id.toString();
          }).quantity
        }
        })
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
