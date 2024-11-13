const mongoose   = require('mongoose');
const { Schema } = mongoose;
const bcrypt     = require('bcryptjs');

/*[刪除] 驗證失敗時返回的錯誤消息*/

// 建立使用者模式 (Schema)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true, 
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6, 
    maxlength: 50,
  },
  liked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'  // 參照 Image 模型
  }],
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'  // 參照 Image 模型，使用者購物車裡的圖片
  }],
  date: {
    type: Date,
    default: Date.now  
  }
});

// 比較密碼
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e){
    return cb(e, result);
  }
};

// mongoose middlewares
// 密碼加密 - 若使用者為新用戶 或者 是正在更改密碼，則將密碼進行雜湊處理 
userSchema.pre('save', async function (next) {
  // this 代表 MongoDB 內的 document
  if (this.isNew || this.isModified('password')) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password   = hashValue;
  }
  next();
});

// 定義並導出使用者模型
module.exports = mongoose.model('User', userSchema);