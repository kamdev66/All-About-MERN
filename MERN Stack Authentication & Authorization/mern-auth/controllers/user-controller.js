const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET_KEY="MykeY"
const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    }catch(err){
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedPassword=bcrypt.hashSync(password)
    const user=new User({
        name:name,
        email:email,
        password:hashedPassword 
    });
    try{
        await user.save()
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({message:user})   //201 status means one or more new resources have been successfully created on the server.
};


//login controllers
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try {
        existingUser=await User.findOne({email:email})
    } catch (error) {
        return new Error(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"User Not Found. Please SignUp"})
    }
    //hmara password encrypted hai to hum use compareSync ki help se check krenge
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password) //here,password login krte time de rhe h aur existingUser.password means jo signup krte time diye the
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"});
    }
    //After the password is correct,we will generate the token.
    const token=jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{expiresIn:"1hr"})//first parameter is payload and 2nd paramter is secret key.secret key is not accessible by anyone except you.we will store secret key in environment variable.3rd parameter is expires condn. i.e, after how many days/time span ,the tokn will expire
    return res.status(200).json({message:"successfully Logged In",user:existingUser,token})
}

const verifyToken=(req,res,next)=>{
    const headers=req.headers[`authorization`];
    const token=headers.split(" ")[1];
    if(!token){
        res.status(404).json({message:"No Token Found"});
    }
    //to verify the token,we have a function in jwt
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{  //we are converting token into string,here "user" is the decoded information
    if(err){
        res.status(400).json({message:"Invalid Token"})
    }
        console.log(user.id);
    })
}
exports.signup=signup;
exports.login=login;
exports.verifyToken=verifyToken;