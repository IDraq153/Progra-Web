//admin/apis/profiles_apis.js
import * as profileService from '../services/profiles_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listProfilesSimple(req, res, next) {
  try {
    const result = await profileService.fetchAllSimple();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Perfiles listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los perfiles',
      data: null,
      error: error.message
    });
  }
}
export async function listProfiles(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    console.log(`Listando perfiles - Página: ${page}, Límite: ${limit}, Filtro: ${name}`);

    // Llamamos al servicio con paginación
    const result = await profileService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Perfiles listados con éxito',
      data: {
        list: result.profiles,
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
      message: 'Error al listar los perfiles',
      data: null,
      error: error.message
    });
  }
}

/**
 * Guardar cambios múltiples (nuevos, editados, eliminados)
 */
export async function saveProfiles(req, res, next) {
  try {
    const { news = [], edits = [], deletes = [] } = req.body;

    console.log('Guardando cambios - Nuevos:', news.length, 'Editados:', edits.length, 'Eliminados:', deletes.length);

    // Procesar eliminaciones
    for (const id of deletes) {
      await profileService.remove(id);
    }

    // Procesar ediciones
    for (const edit of edits) {
      await profileService.update(edit.id, { name: edit.name });
    }

    // Procesar nuevos perfiles
    const created = [];
    for (const newProfile of news) {
      const createdProfile = await profileService.create({ name: newProfile.name });
      // Guardar la relación entre el ID temporal y el real
      created.push({
        tmp: newProfile.id,
        id: createdProfile.id
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfiles guardados con éxito',
      data: created,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar los perfiles',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener un perfil por su ID (ej. /api/profiles/:id)
 */
export async function getProfileById(req, res, next) {
  try {
    const { id } = req.params;
    const profile = await profileService.fetchById(id);

    // Validación si no existe el registro en la BD
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
        data: null,
        error: `No existe el perfil con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil obtenido con éxito',
      data: profile,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el perfil',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear una nueva carrera (POST)
 */
export async function createProfile(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newProfile = await profileService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log(newProfile);
    console.log('2 ++++++++++++++++++++');
    return res.status(201).json({
      success: true,
      message: 'Perfil creado con éxito',
      data: newProfile,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el perfil',
      data: null,
      error: error.message
    });
  }
}
export async function profileNuevo(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newProfile = await profileService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log(newProfile);
    console.log('2 ++++++++++++++++++++');
    return res.status(201).json({
      success: true,
      message: 'Perfil creado con éxito',
      data: null, //newProfile,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el perfil',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar un perfil existente (PUT)
 */
export async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const updatedProfile = await profileService.update(id, req.body);

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
        data: null,
        error: `No existe el perfil con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil actualizado con éxito',
      data: updatedProfile,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el perfil',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar un perfil (DELETE)
 */
export async function deleteProfile(req, res) {
  try {
    const { id } = req.params;
    const deleted = await profileService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado',
        data: null,
        error: `No existe el perfil con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el perfil',
      data: null,
      error: error.message
    });
  }
}