export const requireRole = (role)=>{
    return (req,res,next)=>{
        if(req.user.role!==role){
            return res
            .status(403)
            .jsno({msg:"Access denied"})
        }
        next();
    }
}