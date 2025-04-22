import foodModel from "../models/foodModel.js";
import fs from "fs";

// Ajouter un aliment
const addFood = async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "Aucune image fournie" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Erreur lors de l'ajout de l'aliment",
    });
  }
};

// Liste des aliments
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({
      success: false,
      message: "Erreur lors de la récupération des aliments",
    });
  }
};

// Supprimer un aliment
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Aliment non trouvé" });
    }

    const filePath = `./uploads/${food.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Image supprimée :", filePath);
    } else {
      console.log("L'image n'existe pas :", filePath);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Aliment supprimé",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Erreur lors de la suppression de l'aliment",
    });
  }
};

export { addFood, listFood, removeFood };
