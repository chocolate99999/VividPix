const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const bcrypt   = require('bcryptjs'); //目前未使用到
dotenv.config();
const authRoute = require('./routes').auth; // jwt - 1
const cartRoute = require('./routes').cart;
const passport  = require('passport');
require('./config/passport')(passport);
const cors = require('cors');

// Connecting to MongoDB
mongoose
  // .connect('mongodb://localhost:27017/vividpix', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .connect('mongodb://localhost:27017/vividpix')
  // .connect('mongodb://0.0.0.0:27017/vividpix')
  // .connect('mongodb://127.0.0.1:27017/vividpix')
  .then(() => {
    console.log("Successfully connected to mongoDB.");
  })
  .catch((e) => {
    console.log("Connection failed.");
    console.log(e);
  });

// middlewares - 排球
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/user', authRoute); // jwt - 2


// cart route 應該被 JWT 保護
// 如果 request header 內部沒有 JWT ，則 request 就會被視為是 unauthorized
app.use('/api/cart', passport.authenticate('jwt', { session: false }), cartRoute); 

// 只有登入系統的人才能 "結帳" or "點讚"
// JWT


// 模型設置 (例如：User, Image, Cart)
// const User  = require('./models/User');
// const Image = require('./models/Image');
// const Cart  = require('./models/Cart');

// 使用者登入路由
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && bcrypt.compareSync(password, user.password)) {
//     const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
//     res.json({ token, user });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });

// 購物車、收藏、金流的 API 可以繼續擴展
// app.post('/checkout', async (req, res) => {
//   const { items, token } = req.body;

//   const charge = await stripe.charges.create({
//     amount: calculateOrderAmount(items),
//     currency: 'usd',
//     source: token.id,
//     description: 'Image Purchase'
//   });

//   res.json({ success: true });
// });

app.listen(8080, () => {
  console.log("Server running on port 8080...");
});