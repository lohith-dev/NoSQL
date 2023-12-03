const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId:{ type : Schema.Types.ObjectId,ref:'Product',required:true},
        quantity:{ type : Number, required:true}
      }
    ],
  },
  
});

module.exports = mongoose.model('User', userSchema);

// const getDb = require('../util/database').getDb;
// const {ObjectId}= require('mongodb');

// class User {
//   constructor(name,email,cart,id){
//     this.email=email;
//     this.name=name;
//     this.cart = cart;
//     this._id = ObjectId(id)
//   }


//   save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this) 
//           .then(result=>{
//               return result;
//             }).catch(err=>{
//               console.log(err);
//             })
//     }
//     addToCart(product){
//       const cartProductIndex = this.cart.items.findIndex(cp=>{
//            const cpProductId = new ObjectId(cp.productId);
//            const productId = new ObjectId(product._id);
//            return cpProductId.equals(productId);
//       })
    
//       let newQuantity=1;
//       const updatedCartItems= [...this.cart.items]
//       if(cartProductIndex>=0){
//         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//       }else{
//         updatedCartItems.push({productId:new ObjectId(product._id), quantity: newQuantity})
//       }
     
//       const UpdatedCart = {
//         items:updatedCartItems
//       };
//       const db = getDb();
//       return  db.collection('users').updateOne(
//         {_id:new ObjectId(this._id)},
//         {$set :{cart:UpdatedCart}}
//         )
//     }

//     getCart(){
//       const db = getDb();
//       // console.log("dddddddddddddddddddddddddddd",this.cart.items);
//       const productIds = this.cart.items.map(i=>{
//         return i.productId;
//       })
     
//       return db.collection('products').find({_id:{$in:productIds}}).toArray().then(products=>{
//         return products.map(p=>{
//           return {
//             ...p,
//           quantity:this.cart.items.find(i=>{
//             return i.productId.toString()===p._id.toString();
//           }).quantity
//         }
//         })
//       })
//     }

//     deleteItemFromCart(productId){
//       console.log("iddddddddddd",productId);
//       const udpdateCartIetms=this.cart.items.filter(item=>{
//         return item.productId.toString()!==productId.toString();
//       })
//       console.log("dddddddddddddddddddddddddddd",udpdateCartIetms);
//       const db = getDb();
//       const UpdatedCart = {
//         items:udpdateCartIetms
//       };
//       return  db.collection('users').updateOne(
//         {_id:new ObjectId(this._id)},
//         {$set :{cart:UpdatedCart}}
//         )
//     }
//     static fetchAll(){
//         const db = getDb();
//         return db.collection('users').find().toArray().then(result=>{
//           return result;
//         }).catch(err=>{
//           console.log(err);
//         });
//     }
//     getOrder(){
//       const db = getDb();
//       console.log(this._id);
//       return db
//       .collection('orders').find({'user._id':new ObjectId(this._id)})
//       .toArray();
//     }
//     addOrder(){
//       const db = getDb();
//      return this.getCart().
//       then(products=>{
//         const order = {
//           items:products,
//           user:{
//             _id:new ObjectId(this._id),
//             name:this.name
//           }
//         }
//         // console.log(order);
//         return db.collection('orders').insertOne(order)
//       }).then(result=>{
//         this.cart = {items:[]};
//         return  db.collection('users').updateOne(
//                    {_id:new ObjectId(this._id)},
//                    {$set :{cart:{items:[]}}}
//                 )
//       })
//     }

//     static findById(prodId){
//         const db = getDb();
//         return db.collection('users').findOne({_id:new ObjectId(prodId)}).then(result=>{
//           return result;
//         }).catch(err=>{
//           console.log(err);
//         });
//     }
// }
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

// module.exports = User;
