const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const FacultySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [validator.isEmail, "Please provide a valid email"],
        unique: true
    },
    contact_no: {
        type: String,
        required: [true, "contact number is required"],
        maxlength: [10, "number should not be more than 10 digits"],
        minlength: [10, "number should not be less than 10 digits"]
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model("Faculty", FacultySchema);

/**
 *  faculty fields
 *
 *  name
 *  email
 *  contact no
 *  experience (in years)
 *  working since
 *  position
 *  degree
 *  department
 *  about
 *  image
 */

//  experience: {
//     type: Number,
//     required: [true, 'experience is required']
// },
