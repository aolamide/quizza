import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import expressJwt from 'express-jwt';
import User from '../models/user';

dotenv.config();

const signUp = async (req, res) => {
    const userExists = await User.findOne({email : req.body.email});
    if(userExists) return res.status(403).json({
        error : "Email is already registered"
    })
    const user = new User(req.body);
    await user.save(err => {
        if(err) res.json(err)
    });
    res.status(200).json({ message : "Sign up successful. Please login" });
};

const signIn = (req, res) => {
    //find the user based on email
    const { email, password } = req.body;
    User.findOne({email}, (err, user) => {
        //if err or no user
        if(err || !user) {
            return res.status(401).json({
                error : "User with that email does not exist. Please sign up"
            })
        }
        //if user is found, make sure the email and password match
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and password do not match"
            }) 
        }

        //if user is found, authenticate
        //generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    
        //return response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({token, user : {_id, email, name}});
    })
    
}


const requireSignIn = expressJwt({
    //if token is valid, express jwt appends the verified users id in an auth key to the request object
    secret : process.env.JWT_SECRET,
    userProperty : "auth"
});

const userById = (req, res, next, id) => {
    User.findById(id)
    .exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user; // adds profile object in req with user info
        next();
    })
}

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized) {
        return res.status(403).json({
            error : "User is not authorized to perform this action"
        })
    }
    next()
}

export { signUp, signIn, requireSignIn, userById, hasAuthorization };