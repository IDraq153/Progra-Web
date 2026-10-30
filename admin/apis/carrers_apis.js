// admin/controllers/carrers_controller.js
import * as carrerService from '../services/carrers_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listCarrers(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    console.log(`Listando carreras - Página: ${page}, Límite: ${limit}, Filtro: ${name}`);

    // Llamamos al servicio con paginación
    const result = await carrerService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Carreras listadas con éxito',
      data: {
        list: result.carrers,
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
      message: 'Error al listar las carreras',
      data: null,
      error: error.message
    });
  }
}

/**
 * Guardar cambios múltiples (nuevos, editados, eliminados)
 */
export async function saveCarrers(req, res, next) {
  try {
    const { news = [], edits = [], deletes = [] } = req.body;

    console.log('Guardando cambios - Nuevos:', news.length, 'Editados:', edits.length, 'Eliminados:', deletes.length);

    // Procesar eliminaciones
    for (const id of deletes) {
      await carrerService.remove(id);
    }

    // Procesar ediciones
    for (const edit of edits) {
      await carrerService.update(edit.id, { name: edit.name });
    }

    // Procesar nuevas carreras
    const created = [];
    for (const newCarrer of news) {
      const createdCarrer = await carrerService.create({ name: newCarrer.name });
      // Guardar la relación entre el ID temporal y el real
      created.push({
        tmp: newCarrer.id,
        id: createdCarrer.id
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Carreras guardadas con éxito',
      data: created,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar las carreras',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener una carrera por su ID (ej. /api/carrers/:id)
 */
export async function getCarrerById(req, res, next) {
  try {
    const { id } = req.params;
    const carrer = await carrerService.fetchById(id);

    // Validación si no existe el registro en la BD
    if (!carrer) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada',
        data: null,
        error: `No existe la carrera con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Carrera obtenida con éxito',
      data: carrer,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar la carrera',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear una nueva carrera (POST)
 */
export async function createCarrer(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newCarrer = await carrerService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log(newCarrer);
    console.log('2 ++++++++++++++++++++');
    return res.status(201).json({
      success: true,
      message: 'Carrera creada con éxito',
      data: newCarrer,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la carrera',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar una carrera existente (PUT)
 */
export async function updateCarrer(req, res) {
  try {
    const { id } = req.params;
    const updatedCarrer = await carrerService.update(id, req.body);

    if (!updatedCarrer) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada',
        data: null,
        error: `No existe la carrera con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Carrera actualizada con éxito',
      data: updatedCarrer,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la carrera',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar una carrera (DELETE)
 */
export async function deleteCarrer(req, res) {
  try {
    const { id } = req.params;
    const deleted = await carrerService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada',
        data: null,
        error: `No existe la carrera con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Carrera eliminada con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la carrera',
      data: null,
      error: error.message
    });
  }
}