const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Proceed to the route handler
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};