const mongoose = require('mongoose');
const { Schema } = mongoose;

// 建立購物車模式 (Schema)
const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // 參照使用者模型
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
      min: 1,
      default: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false  // 記錄購物車是否已經結帳
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
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// 定義並導出購物車模型
module.exports = mongoose.model('Cart', cartSchema);