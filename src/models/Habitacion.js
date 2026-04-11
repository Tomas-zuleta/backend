import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("Habitacion", habitacionSchema);