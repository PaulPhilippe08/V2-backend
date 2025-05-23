import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Non autorisé. Veuillez vous reconnecter.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Attache l'ID ici
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Token invalide" });
  }
};

export default authMiddleware;
