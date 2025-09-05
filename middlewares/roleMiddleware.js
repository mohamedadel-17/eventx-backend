const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // This depends on authMiddleware running first to attach 'req.user'
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden. You do not have permission for this action.' });
    }
    next();
  };
};

module.exports = roleMiddleware;