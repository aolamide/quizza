import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import expressJwt from 'express-jwt';
import User from '../models/user';
import crypto from 'crypto';
import sendMail from '../resetMail';

dotenv.config();

const signUp = (req, res) => {
    User.findOne({email : req.body.email}, (err, user)=> {
        if(err || !user){
            const newUser = new User(req.body);
            newUser.save((error, saved) => {
                if(error) return res.status(403).json({error})
                else if(saved) {
                    return res.status(200).json({ message : "Sign up successful. Please login" });
                }
            })
        }
        else{
            return res.status(403).json({
                error : "Email is already registered"
            })
        }
    });
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
const tokenValid = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error :'Session expired, please relogin'});
    }
    next();
}
const requireSignIn = expressJwt({
    //if token is valid, express jwt appends the verified users id in an auth key to the request object
    secret : process.env.JWT_SECRET,
    userProperty : "auth"
});

const confirmUser = (req, res, next) => {
    User.findById(req.body.creator)
    .exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "There was an error creating quiz, please relogin and create again"
            })
        }
        req.profile = user; // adds profile object in req with user info
        next();
    })
}

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!authorized) {
        return res.status(403).json({
            error : "User is not authorized to perform this action"
        })
    }
    next()
}

const forgotPassword = (req, res) => {
    User.findOne({email : req.body.email})
    .exec((err, user) => {
        if(err || !user) return res.status(403).json({error : 'Email not registered on platform'})
        const token = crypto.randomBytes(20).toString('hex');
        console.log(token)
        user.resetPasswordToken = token;
        user.resetExpires = Date.now() + 1000 * 60 * 15;
        user.save((err, user) => {
            if(err) res.status(400).json({error : 'An error occured, please try again'});
            sendMail(user.email, user.resetPasswordToken)
            .then(info => {
                res.json({user, message : 'Password reset link has been sent successfully'})
            })
            .catch(err => res.status(400).json({error : err}))
        })
    })
}

const confirmResetLink = (req, res) => {
    console.log(req.query)
    User.findOne({resetPasswordToken : req.query.token, resetExpires : {$gt : Date.now()}})
    .select('name')
    .exec((err, user) => {
        if(err || !user) res.status(403).json({error : 'Password reset link is invalid or has expired'})
        else res.json({user})
    })
}

const updatePassword = (req, res) => {
    if(req.body.password.trim().length < 7) return res.status(400).json({error : 'Password must be at least 7 characters long'});
    User.findOne({resetPasswordToken : req.query.token, name : req.body.name})
    .exec((err, user) => {
        if(err || !user) return res.status(403).json({error : 'Link has expired'})
        user.resetExpires = null;
        user.resetPasswordToken = null;
        user.password = req.body.password;
        user.save((err, user) => {
            if(err) return res.status(400).json({error : 'An error has occured'})
            return res.json({message : 'password updated successfully, proceed to login'})
        })
    })
}
export { signUp, signIn, requireSignIn, tokenValid, confirmUser, hasAuthorization, forgotPassword, confirmResetLink, updatePassword };