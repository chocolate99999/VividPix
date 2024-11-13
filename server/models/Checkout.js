const mongoose = require('mongoose');
const { Schema } = mongoose;

// 建立結帳清單模式 (Schema)
const checkoutSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // 參照使用者模型
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',  // 參照購物車模型
    required: true
  },
  items: [{
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',  // 參照圖片模型
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],  // 紀錄支付狀態
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],  // 支付方式
    required: true
  },
  billingAddress: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    unique: true  // 儲存支付交易 ID
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 在儲存之前更新 updatedAt
checkoutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// 定義並導出結帳清單模型
module.exports = mongoose.model('Checkout', checkoutSchema);