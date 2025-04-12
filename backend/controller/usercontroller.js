import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// login user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {

        if(!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"});
        }

        // checking is user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already existe"})
        }

        // validating email format $ strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"plese enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}




// reg user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        
        if(!email || !password) {
            return res.json({success: false, message: "All fields are required"});
        }
        
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {loginUser,registerUser}