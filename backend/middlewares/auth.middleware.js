import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
  const token = req.header("Authorization")?.replace("Bearer ","")
   if(!token) {
   return res
    .status(401)
    .json({msg:"Access denied no token provided"})
   }

   try {
       const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
       req.user = decodedToken;  // user id from token
       next();
   } catch (error) {
    return res
    .status(400)
    .json({ msg: "Invalid token" });
   }
};