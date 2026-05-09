const authorizeRoles = (role) => {
  return (req, res, next) => {
    console.log("USER:", req.user);
    console.log("USER ROLE:", req.user?.role);
    console.log("REQUIRED ROLE:", role);

    if (!req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    next();
  };
};
module.exports = authorizeRoles;
