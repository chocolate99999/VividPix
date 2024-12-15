const router = require('express').Router();
const Cart = require('../models/').Cart;
const cartValidation = require('../validation').cartValidation;

router.use((req, res, next) => {
  console.log("cart route 正在接收一個 request...");
  next();
});

// 將圖片添加到購物車的路由（未登入狀態下）
router.post('/cart', async (req, res) => {
  try {
    // Check if the data meets the standards
    let { error } = cartValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // [Origin]創建購物車項目物件
    // let { title, url, description, price, totalPrice } = req.body;
    // let cartItem = new Cart({ title, url, description, price, totalPrice });

    // 創建購物車項目物件
    const { item } = req.body; 
    const { photoID, photoTitle, photoUrl, price } = item;
    
    // 創建購物車項目物件
    const cartItem = new Cart({
      title: photoTitle,
      url: photoUrl,
      description: `Photo ID: ${photoID}`,
      price: price,
      totalPrice: price, // 假設這裡單項 totalPrice 為單價
    });

    // [Origin]判斷用戶是否登入（通過 jwt 判斷 req.user）
    // if (!req.headers.authorization) {
    //   // 未登入：直接返回購物車項目資料
    //   return res.send(cartItem);
    // }
    // 判斷是否有登入

    if (!req.headers.authorization) {
      // 未登入狀態：直接返回購物車項目
      return res.status(200).json({
        message: "Item added to cart (unauthenticated).",
        cartItem,
      });
    }

    // 如果已登入，則通過 auth 中介層驗證
    await auth(req, res, async () => {
      // 找到使用者資料
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found." });

      // 將購物車項目添加到使用者的購物車中
      user.cart.push(cartItem);
      await user.save();

      // 返回更新後的購物車資料
      res.status(200).json({
        message: "Item added to cart (authenticated).",
        cart: user.cart,
      });
    });
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item to cart.", error: err.message });
  }
});

module.exports = router;