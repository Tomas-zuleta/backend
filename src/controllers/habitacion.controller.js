import Habitacion from "../models/Habitacion.js";

// GET — obtener todas
export const obtenerHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find().sort({ createdAt: -1 });
        res.json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener habitaciones" });
    }
};

// POST — crear
export const crearHabitacion = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen } = req.body;

        if (!nombre || !descripcion || !precio) {
            return res.status(400).json({ message: "Nombre, descripción y precio son obligatorios" });
        }

        const habitacion = new Habitacion({ nombre, descripcion, precio, imagen });
        await habitacion.save();
        res.status(201).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear habitación" });
    }
};

// PUT — actualizar
export const actualizarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, imagen } = req.body;

        if (!nombre || !descripcion || !precio) {
            return res.status(400).json({ message: "Nombre, descripción y precio son obligatorios" });
        }

        const habitacion = await Habitacion.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, imagen },
            { new: true }
        );

        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        res.json(habitacion);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar habitación" });
    }
};

// DELETE — eliminar
export const eliminarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;

        const habitacion = await Habitacion.findByIdAndDelete(id);

        if (!habitacion) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }

        res.json({ message: "Habitación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar habitación" });
    }
};