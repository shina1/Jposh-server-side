import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import paginate from "../utils/plugins/paginate.js";

// pugins



const { Schema }= mongoose;

const userSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validator(value) {
                if(!validator.isEmail(value)) {
                    throw new Error("Invalid email")
                }
            },
          },
        password: {
            type: String,
            required: true,
            minlength: 5,
            validator(value) {
                if(!validator.match(/\d/) || !value.match(/[a-zA-Z]/)){
                    throw new Error("Password must contain at least one letter and one number ");
                }
            },
            
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.statics.isEmailTaken - async function(email, excludeUserId) {
    const user = await this.findOne({ email, _id: {$ne: excludeUserId } });
    return !!user;
}



// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(12)

    user.password = await bcrypt.hash(user.password, salt)
})


const User = mongoose.model("User", userSchema);

export default User;