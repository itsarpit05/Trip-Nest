
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        // Ensure allowedRoles is an array
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        // req.user.role will now exist because we added it to the token
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ msg: "Access denied. You do not have the required role." });
        }
        next();
    };
};