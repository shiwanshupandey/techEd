const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchases.model");
const User = require("../models/user.model");




// working :-------------------------------------------------------------------------


//get all
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("products").populate("user","fullname");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//to purchase
router.post('/', async (req, res) => {
  try {
    const { user, products } = req.body;
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user's role is "admin"
    if (existingUser.role === 'admin') {
      return res.status(403).json({ message: 'Admins cannot purchase courses' });
    }
    
    const existingPurchase = await Purchase.findOne({ user });

    if (existingPurchase) {
      const purchasedProducts = existingPurchase.products;

      for (const product of products) {
        if (purchasedProducts.includes(product)) {
          return res.status(400).json({ message: 'One or more products are already purchased by the user' });
        }
      }

      existingPurchase.products = existingPurchase.products.concat(products);

      await existingPurchase.save();

      return res.status(201).json(existingPurchase);
    } else {
      const purchase = new Purchase({ user, products });
      await purchase.save();

      return res.status(201).json(purchase);
    }
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while creating or updating a purchase' });
  }
});




//get single purchase
router.get("/:id", async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
    .populate("products")
    .populate("user");
    ;
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//update single purchase details
router.put("/:id", async (req, res) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("products")
    .populate("user");

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//delete entire purchase
router.delete("/:id", async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);

    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;




// //post new purchase
// router.post("/", async (req, res) => {
//   try {
    
//     const { products, user } = req.body;

    
//     const purchase = new Purchase({
//       products: [products], 
//       user: user, 
//     });

    
//     const newPurchase = await purchase.save();

//     res.status(201).json(newPurchase);
//   } catch (error) {
//     console.error("Error adding a purchase:", error);
//     res.status(500).json({ error: "An error occurred while adding the purchase." });
//   }
// });