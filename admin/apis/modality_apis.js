//admin\apis\modalities_apis.js
import * as modalityService from '../services/modality_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listModalitiesSimple(req, res, next) {
  try {
    const result = await modalityService.fetchAllSimple();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Modalidades listadas con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar las modalidades',
      data: null,
      error: error.message
    });
  }
}
export async function listModalities(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    console.log(`Listando modalidades - Página: ${page}, Límite: ${limit}, Filtro: ${name}`);

    // Llamamos al servicio con paginación
    const result = await modalityService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Modalidades listadas con éxito',
      data: {
        list: result.modalities,
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
      message: 'Error al listar las modalidades',
      data: null,
      error: error.message
    });
  }
}

/**
 * Guardar cambios múltiples (nuevos, editados, eliminados)
 */
export async function saveModalities(req, res, next) {
  try {
    const { news = [], edits = [], deletes = [] } = req.body;

    console.log('Guardando cambios - Nuevos:', news.length, 'Editados:', edits.length, 'Eliminados:', deletes.length);

    // Procesar eliminaciones
    for (const id of deletes) {
      await modalityService.remove(id);
    }

    // Procesar ediciones
    for (const edit of edits) {
      await modalityService.update(edit.id, { name: edit.name });
    }

    // Procesar nuevas modalidades
    const created = [];
    for (const newModality of news) {
      const createdModality = await modalityService.create({ name: newModality.name });
      // Guardar la relación entre el ID temporal y el real
      created.push({
        tmp: newModality.id,
        id: createdModality.id
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Modalidades guardadas con éxito',
      data: created,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar las modalidades',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener una modalidad por su ID (ej. /api/modalities/:id)
 */
export async function getModalityById(req, res, next) {
  try {
    const { id } = req.params;
    const modality = await modalityService.fetchById(id);

    // Validación si no existe el registro en la BD
    if (!modality) {
      return res.status(404).json({
        success: false,
        message: 'Modalidad no encontrada',
        data: null,
        error: `No existe la modalidad con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Modalidad obtenida con éxito',
      data: modality,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar la modalidad',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear una nueva modalidad (POST)
 */
export async function createModality(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newModality = await modalityService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log(newModality);
    console.log('2 ++++++++++++++++++++');
    return res.status(201).json({
      success: true,
      message: 'Modalidad  creada con éxito',
      data: newModality,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la modalidad',
      data: null,
      error: error.message
    });
  }
}
export async function modalityNueva(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newModality = await modalityService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log(newModality);
    console.log('2 ++++++++++++++++++++');
    return res.status(201).json({
      success: true,
      message: 'Modalidad creada con éxito',
      data: null, //newModality,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la modalidad',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar una modalidad existente (PUT)
 */
export async function updateModality(req, res) {
  try {
    const { id } = req.params;
    const updatedModality = await modalityService.update(id, req.body);

    if (!updatedModality) {
      return res.status(404).json({
        success: false,
        message: 'Modalidad no encontrada',
        data: null,
        error: `No existe la modalidad con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Modalidad actualizada con éxito',
      data: updatedModality,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la modalidad',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar una modalidad (DELETE)
 */
export async function deleteModality(req, res) {
  try {
    const { id } = req.params;
    const deleted = await modalityService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Modalidad no encontrada',
        data: null,
        error: `No existe la modalidad con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Modalidad eliminada con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la modalidad',
      data: null,
      error: error.message
    });
  }
}