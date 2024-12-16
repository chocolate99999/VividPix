const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();
const bcrypt   = require('bcryptjs'); //目前未使用到
const authRoute = require('./routes').auth; // jwt - 1
const cartRoute = require('./routes').cart;
const passport  = require('passport');
require('./config/passport')(passport);
const cors = require('cors');


// DBG-s
const axios = require('axios');
// DBG-e

// Connecting to MongoDB
mongoose
  // .connect('mongodb://localhost:27017/vividpix', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .connect('mongodb://localhost:27017/vividpix')
  .then(() => {
    console.log("Successfully connected to mongoDB.");
  })
  .catch((e) => {
    console.log("Connection failed.");
    console.log(e);
  });

// middlewares - Soccer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
/* cart route 應該被 JWT 保護
   如果 request header 內部沒有 JWT ，則 request 就會被視為是 unauthorized */
app.use('/api/user', authRoute); // jwt - 2
app.use('/api/cart', passport.authenticate('jwt', { session: false }), cartRoute); 

// 只有登入系統的人才能 "結帳" or "點讚"
// JWT

// 設定 API 路由
app.get('/api/get-api-key', (req, res) => {
  const apiKey = process.env.API_KEY;  // 從環境變數中取得 API Key
  res.json({ apiKey });
})

// DBG -s 
async function TapPayByPrime(PayData)
{
  console.log("[ DBG] TapPayByPrime()");

  console.log('PayData             :', PayData); 
  console.log('PayData.partner_key :', PayData.partner_key); 
  
    // 測試環境 URL: https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime
    // 正式環境 URL: https://prod.tappaysdk.com/tpc/payment/pay-by-prime
    // Header:
    //   Content-Type: application/json
    //   x-api-key: YourPartnerKey
    
    let TapPayUrl = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime'
    let partnerkey = PayData.partner_key;
    console.log('partnerkey:', partnerkey); 
    
  // 發送 api 至TapPay
  try {
    // let response = await axios.post(TapPayUrl,
    //                                   json    = PayData,
    //                                   headers = { 
    //                                     'Content-Type': 'application/json',
    //                                     'x-api-key'   : partnerkey
    //                                 }
    // );

    let response = await axios.post(
      TapPayUrl,
      PayData, // 傳送的資料直接作為第二個參數
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': partnerkey,
        },
      }
    );

    console.log('POST Response:', response.data);    
    return response.data; // 回傳 API 回應;  
  } catch (error) {            
    console.error('POST Error:', error.response ? error.response.data : error.message);
  }   
}

async function CreateOrder(RequestBody)
{
  let Prime = RequestBody.prime;
  // Test Fake Data
  let PartnerKey = 'partner_UCmom3DehHDY0I7CQLnb1EysgJYP92IZxuwncrXfHm1lv5yde4uUkncG'
  let merchant_id = "koala520_CTBC";
  let Test_amount=548527;
  let Test_phone_number = "0912345678";  
  let Test_name = "Panda"
  let Test_email = "Panda@food.com"

  console.log(Prime);

  // 設定TapPay 傳送資料
  let PayData = {
      "prime"       : Prime,
      "partner_key" : PartnerKey,
      "merchant_id" : merchant_id,
      "details"     : "測試 TapPay 123 123",
      "amount"      : Test_amount,
      "cardholder": {
          "phone_number": Test_phone_number,
          "name"        : Test_name,
          "email"       : Test_email      
      },
      "remember": false
  }

  // 連線至TapPay 付款
  let PayResult = await TapPayByPrime(PayData);

  /*    
    TapPay 狀態
    刷卡成功 status = 0
    刷卡失敗 status != 0
  */    
  if (PayResult.status != 0)
  {
    console.log("刷卡失敗");
    // Response = {"error": 'true', "message": PayResult['msg']}    
    // return False,Response
    return false;
  }
  else{
    //TapPay 刷卡成功
    console.log("TapPay 刷卡成功");
    return true;
  }
  
}

app.post('/api/orders', async (req, res) => {

  console.log("[ DBG] Router /api/orders");
  let RequestBody= req.body;

  let status = await CreateOrder(RequestBody);

  console.log("status:",status);

  console.log('RequestBody             :', RequestBody); 
  if(status === true)
    res.status(200).json({ message: "Pay Successful"});
  else
    res.status(400).json({ message: "Pay Fail"});  

});
// DBG -e




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