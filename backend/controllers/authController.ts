import { Request, Response } from 'express';
import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db} from '../models/db';
import {user} from '../models/schema';
import { eq } from 'drizzle-orm';
import { userRegSchema,userLoginSchema } from '../utils/inputValidation';


//register api
export const register = async (req: Request, res: Response) => {
    try{
    //validate the user input
    const {error} = userRegSchema.validate(req.body);
    if (error) {  
         res.status(400).json({ message: error.details[0].message });
         return;
         }

    //check if the user already exists
    const userExists = await db.query.user.findFirst({
        where:eq(user.email, req.body.email) 
    })
    if(userExists){
        console.log("User already exists");
         res.status(400).send({error: "User already exists"});
         return;
        
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //create a new user and inserts it into the database
    const newUser = await db.insert(user).values({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            age:req.body.age,
            gender:req.body.gender,
            weight:req.body.weight,
            height:req.body.height
    }).returning({userId:user.userId, email:user.email, username:user.username});
    console.log("New user created", newUser); //TODO: delete this later

    //generate a token
    const token = jwt.sign(
            { id: newUser[0].userId, email: newUser[0].email, username: newUser[0].username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        //send response
          res.status(201).json({ token });
          return;
    
    }catch(error){
        console.log("Error in registering", error);
        res.status(500).send({error: error});
        return; 
    }
}

//login api
export const login = async (req: Request, res: Response) => {
    console.log("Login request received");
    try{
    //validate the user input
    const {error} = userLoginSchema.validate(req.body);
    if (error) {  
         res.status(400).json({ message: error.details[0].message });
         return;
         }

    //check if the user exists
    const userExists = await db.query.user.findFirst({
        where:eq(user.email, req.body.email) 
    })
    if(!userExists){
        console.log("User does not exist");
         res.status(400).send({error: "User does not exist"});
         return;
        
    }

    //check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, userExists.password);
    if(!validPass){
        console.log("Invalid password");
         res.status(400).send({error: "Invalid password"});
         return;
    }

    //generate a token
    const token = jwt.sign(
            { id: userExists.userId, email: userExists.email, username: userExists.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        //send response
          res.status(200).json({ token });
          return;
    
    }catch(error){
        console.log("Error in login", error);
        res.status(500).send({error: error});
        return;
    }
}
   


