const mongoose = require('mongoose');
const { Schema } = mongoose;

// 建立結帳清單模式 (Schema)
const checkoutSchema = new Schema({
  prime: {
    type: String,
    required: true, // Prime 是支付所需的重要欄位
  },
  order: {
    photoID: {
      type: Number,
      required: true, // 照片 ID
    },
    photoTitle: {
      type: String,
      required: true, // 照片標題
    },
    price: {
      type: Number,
      required: true, // 照片價格
      min: 0, // 價格不得低於 0
    },
  },
  transactionId: {
    type: String,
    unique: true, // 儲存支付交易 ID，保證唯一性
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'], // 支付狀態
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now, // 自動生成結帳時間
  },
  updatedAt: {
    type: Date,
    default: Date.now, // 自動生成更新時間
  },
});

// 在儲存之前自動更新 `updatedAt`
checkoutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// 定義並導出結帳清單模型
module.exports = mongoose.model('Checkout', checkoutSchema);