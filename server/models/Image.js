const mongoose = require('mongoose');
const { Schema } = mongoose;

// 建立圖片模式 (Schema)
const imageSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Image title is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Image URL is required']
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Image price is required'],
    min: 0
  },
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // 參照拍攝圖片的使用者
    required: true
  },
  liked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // 參照按讚的使用者
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 定義並導出圖片模型
module.exports = mongoose.model('Image', imageSchema);