
import * as studentService from '../services/students_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listStudentsSimple(req, res, next) {
  try {
    const result = await studentService.fetchAllSimple();

    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Estudiantes listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los estudiantes',
      data: null,
      error: error.message
    });
  }
}

export async function listStudents(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    console.log(`Listando estudiantes - Página: ${page}, Límite: ${limit}, Filtro: ${name}`);

    // Llamamos al servicio con paginación
    const result = await studentService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Estudiantes listados con éxito',
      data: {
        list: result.students,
        total: result.total,
        pages: result.totalPages,
        offset: result.offset,
        limit: limit,
        page: page
      },
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los estudiantes',
      data: null,
      error: error.message
    });
  }
}

/**
 * Guardar cambios múltiples (nuevos, editados, eliminados)
 */
export async function saveStudents(req, res, next) {
  try {
    const { news = [], edits = [], deletes = [] } = req.body;

    console.log(
      'Guardando cambios - Nuevos:',
      news.length,
      'Editados:',
      edits.length,
      'Eliminados:',
      deletes.length
    );

    // Procesar eliminaciones
    for (const id of deletes) {
      await studentService.remove(id);
    }

    // Procesar ediciones
    for (const edit of edits) {
      await studentService.update(edit.id, edit);
    }

    // Procesar nuevos estudiantes
    const created = [];

    for (const newStudent of news) {
      const createdStudent = await studentService.create(newStudent);

      // Guardar la relación entre el ID temporal y el real
      created.push({
        tmp: newStudent.id,
        id: createdStudent.id
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiantes guardados con éxito',
      data: created,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar los estudiantes',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener un estudiante por su ID
 */
export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    const student = await studentService.fetchById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante obtenido con éxito',
      data: student,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear un nuevo estudiante (POST)
 */
export async function createStudent(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);

    const newStudent = await studentService.create(req.body);

    console.log('1 ++++++++++++++++++++');
    console.log(newStudent);
    console.log('2 ++++++++++++++++++++');

    return res.status(201).json({
      success: true,
      message: 'Estudiante creado con éxito',
      data: newStudent,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar un estudiante existente (PUT)
 */
export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updatedStudent = await studentService.update(id, req.body);

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante actualizado con éxito',
      data: updatedStudent,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar un estudiante (DELETE)
 */
export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const deleted = await studentService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el estudiante',
      data: null,
      error: error.message
    });
  }
}
