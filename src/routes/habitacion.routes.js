import { Router } from "express";
import {
    obtenerHabitaciones,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
} from "../controllers/habitacion.controller.js";

const router = Router();

router.get("/", obtenerHabitaciones);
router.post("/", crearHabitacion);
router.put("/:id", actualizarHabitacion);
router.delete("/:id", eliminarHabitacion);

export default router;