import express from 'express';
import cors from 'cors';
import 'dotenv';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const schemaData = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
}
);

const userModel = mongoose.model('user', schemaData);

// Read data
app.get('/', async (req, res) => {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
});


//  Create data || save data
app.post('/create', async (req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();

    res.send({ success: true, message: "Data has been created successfully", data: data });
});

// Update data
app.put('/update', async (req, res) => {
    console.log(req.body);
    const { id, ...rest } = req.body;

    console.log(rest);
    const data = await userModel.updateOne({ _id: id }, rest);
    res.send({ success: true, message: "Data has been updated successfully", data: data });
}
);

// Delete data
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        // Assuming you're using Mongoose
        const data = await userModel.deleteOne({ _id: id }); // No need to convert id to ObjectId
        res.send({ success: true, message: "Data has been deleted successfully", data: data });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});




mongoose.connect("mongodb://localhost:27017/crud",)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
