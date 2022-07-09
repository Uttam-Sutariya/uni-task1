const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Faculty = require("./models/facultyModel");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

require("dotenv").config();

// DB connection
mongoose
    .connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log(`DB connection successfull`))
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 4000;

const app = express();

// middleware for req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for fileupload (image)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./temp"
    })
);

// cross origin request middleware
app.use(cors());

// morgan middleware
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
    res.send(
        "<h1>Welcome to my api <br/>Try to make a request to /faculty endpoint</h1>"
    );
});

app.get(
    "/faculty",
    asyncHandler(async (req, res) => {
        const facultyList = await Faculty.find();

        res.status(200).json({
            total_faculty: facultyList.length,
            faculties: facultyList
        });
    })
);

app.get(
    "/faculty/:id",
    asyncHandler(async (req, res, next) => {
        const faculty = await Faculty.findById(req.params.id);

        if (!faculty) {
            next(new Error("NO Faculty Found"));
        }

        res.status(200).json(faculty);
    })
);

app.post(
    "/faculty",
    asyncHandler(async (req, res, next) => {
        const { name, email, contact_no } = req.body;

        if (!name || !email || !contact_no || !req.files) {
            next(Error("Please provide all fields"));
        }

        let file = req.files.photo;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "task1_faculty"
        });

        const newFaculty = await Faculty.create({
            name,
            email,
            contact_no,
            photo: {
                id: result.public_id,
                secure_url: result.secure_url
            }
        });

        res.status(201).json(newFaculty);
    })
);

app.patch(
    "/faculty/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const faculty = await Faculty.findById(id);

        if (!faculty) {
            next(Error("Faculty Doesn't exist"));
        }

        if (req.files) {
            // delete old image
            await cloudinary.uploader.destroy(faculty.photo.id);

            // add new image
            let file = req.files.photo;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "task1_faculty"
            });

            req.body.photo = {
                id: result.public_id,
                secure_url: result.secure_url
            };
        }

        const updatedFaculty = await Faculty.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(200).json(updatedFaculty);
    })
);

app.delete(
    "/faculty/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        const faculty = await Faculty.findById(id);

        if (!faculty) {
            throw new Error("Faculty Doesn't exist");
        }

        // deleting image from cloud
        await cloudinary.uploader.destroy(faculty.photo.id);

        await faculty.remove();

        res.status(200).json({ id });
    })
);

// error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
});

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
