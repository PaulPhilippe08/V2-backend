import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    // Trouver l'utilisateur par ID
    let userData = await userModel.findById(req.body.userId);

    // Vérifier si l'utilisateur existe
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialiser cartData si il est vide ou inexistant
    let cartData = userData.cartData || {};

    // Ajouter l'item au panier ou l'incrémenter si déjà présent
    if (!cartData[itemId]) {
      cartData[itemId] = 1; // Ajouter l'item avec une quantité de 1 si l'item n'existe pas dans le panier
    } else {
      cartData[itemId] += 1; // Incrémenter la quantité de l'item si déjà présent
    }

    // Sauvegarder le panier mis à jour
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data (to be implemented)
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
