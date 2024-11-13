const router = require('express').Router();
const Cart = require('../models/').Cart;
const cartValidation = require('../validation').cartValidation;

router.use((req, res, next) => {
  console.log("cart route 正在接收一個 request...");
  next();
});

// 將圖片添加到購物車的路由（未登入狀態下）
router.post('/AddToCart', async (req, res) => {
  // Check if the data meets the standards
  let { error } = cartValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 創建購物車項目物件
  let { title, url, description, price, totalPrice } = req.body;
  let cartItem = new Cart({ title, url, description, price, totalPrice });

  // // 判斷用戶是否登入（通過 jwt 判斷 req.user）
  // if (!req.headers.authorization) {
  //   // 未登入：直接返回購物車項目資料
  //   return res.send(cartItem);
  // }

  // 如果已登入，則通過 auth 中介層驗證
  try {
    await auth(req, res, async () => {
      // 已登入：將資料儲存至資料庫中的使用者購物車
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).send('User not found.');

      // 更新使用者的購物車項目
      user.cart.push(cartItem);
      await user.save();
      
      // 返回更新後的購物車資料
      res.send(user.cart);
    });
  } catch (err) {
    res.status(500).send('Failed to add item to cart.');
  }
});

module.exports = router;