const User = require('../model/authmodel');//import the User schema/model from the authmodel file
const { v4: uuidv4 } = require('uuid');//import uuid function to generate unique UUIDs
const bcryptjs = require('bcryptjs');//import bcryptjs to hash and compare passwords
const jwt = require('jsonwebtoken');//import JWT to generate and verify JSON web tokens


//register api
exports.register = async (req, res) => { //handel http request
    try {//Block of code try
        const { uc_username, uc_email, uc_phone, uc_password } = req.body; //req body
        console.log("Request body:", req.body);

        const userExist = await User.findOne({ uc_email });//user find by email
        if (userExist) { //if user Exist
            return res.status(400).json({ message: 'User already exists' });//400 Bad Request
        }

        const hashedPassword = await bcryptjs.hash(uc_password, 10);//bcrypt hash password 10 round

        const newUser = new User({
            uc_uuid: uuidv4(),//genrate uc_uuid 
            uc_username,
            uc_email,
            uc_phone,
            uc_password: hashedPassword// Save hashed password
        });

        await newUser.save();// Save user to DB
        console.log("New user saved:", newUser);

        res.status(200).json({ //user registered successfully
            status: true,
            message: 'User registered successfully',
            data: {
                uc_username: newUser.uc_username,
                uc_email: newUser.uc_email,
                uc_phone: newUser.uc_phone,
                uc_uuid: newUser.uc_uuid

            }
        });

    } catch (error) { // catch the error
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Internal server error' });//error code 500 server error
    }
};

//login api with authentication post method
exports.login = async (req, res) => { //handle http request
    try {
        const { uc_email, uc_password } = req.body;//uc_email,uc_password req body

        if (!uc_email || !uc_password) {
            return res.status(400).json({ message: 'email or password required' });
        }

        const user = await User.findOne({ uc_email });

        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }//expirein 1 day
        );

        user.updated_at = Date.now();//user update
        await user.save();//user save db

        console.log("User logged in successfully:", { email: uc_email, userId: user._id });

        return res.status(200).json({ //user login successfully
            message: "Login successful",
            token,//Return JWT to the user.

        });

    } catch (error) {//catch error
        console.error("Login error:", error);
        return res.status(500).json({ message: 'internal server error' });//error code 500 server error
    }
};

//put method
exports.user = async (req, res) => {
    try {
        const { uc_uuid } = req.params;
        const updateData = req.body;//Gets UUID from URL and updated data from body.

        if (!uc_uuid) {//If not found, return 400.
            return res.status(400).json({ message: 'uc_uuid is require' });

        }
        const user = await User.findOneAndUpdate(
            { uc_uuid },//find user by uc_uuid
            updateData,//apply these changes
            { new: true }//return the updated document
        );
        if(!user){
            return res.status(400).json({message:'user not found'});
        }
       
        
        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: user
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal server error' });//error code 500 server error

    }
}

//Delete method
exports.userdata = async(req,res)=>{//handel http request
    try{
        const{uc_uuid}=req.params;//req params uc_uuid
        const Deletedata = req.body;
        if(!uc_uuid){
            return res.status(400).json({message:'uc_uuid is require'});
        }
    const user = await User.findOneAndDelete(
        { uc_uuid },//find user by uc_uuid
           Deletedata ,//delet data
            { new: true }//return the updated document
    );
        if(!user){
            return res.status(400).json({message:'user not found'}); 
        }
        return res.status(200).json({
            status: true,
            message: "User Deleted successfully",
            data: user
        });


    }catch(error){
        return res.status(400).json({message:'internal server error'});

    }
}



//PATCH method
exports.updateData = async(req,res)=>{
    try{
        const{uc_uuid}=req.params;
        const {uc_email}=req.body;
        if(!uc_uuid){
            return res.status(400).json({message:'uc_uuid is require'});
        }
        const user = await User.findOneAndUpdate(
             { uc_uuid },
            { uc_email },
            { new: true }
        );
        if(!user){
            return res.status(400).json({message:'user not found'});
        }
        await user.save();
        return res.status(200).json({
            status:true,
            message:'user updated successfuly',
            data:user
        });


    }catch(error){
        return res.status(500).json({message:'internal server error'});

    }
}
