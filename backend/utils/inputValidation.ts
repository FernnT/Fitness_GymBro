import joi from 'joi';

//validate the user input
export const userRegSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    age:joi.number().required(),
    gender:joi.string().required(),
    height:joi.number().required(),
    weight:joi.number().required()
})

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})