//admin\apis\semesters_apis.js
import Semester from '../models/semester.js';

export async function listSemestersSimple(req, res) {
  try {
    const semesters = await Semester.findAll({ order: [['id', 'ASC']] });

    return res.status(200).json({
      success: true,
      message: 'Semestres listados con éxito',
      data: semesters.map((semester) => semester.toJSON()),
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los semestres',
      data: null,
      error: error.message
    });
  }
}
