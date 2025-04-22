import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placer une commande
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.user.id, // attention ici ! tu dois avoir req.user depuis le middleware
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    res.json({ success: true, data: { orderId: newOrder._id } });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Erreur lors de la commande" });
  }
};

// Vérifier le paiement
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.query;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paiement confirmé" });
    } else {
      res.json({ success: false, message: "Paiement non confirmé" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erreur de vérification" });
  }
};

// Commandes de l'utilisateur
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erreur lors de la récupération" });
  }
};

// Toutes les commandes pour l'admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erreur d'administration" });
  }
};

// Mettre à jour le statut
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Statut mis à jour" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Erreur de mise à jour" });
  }
};

// ✅ Export en une seule fois (exports nommés)
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
