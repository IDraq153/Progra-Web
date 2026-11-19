// admin/services/modality_services.js
import modalityRepository from '../repositories/modality_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todas las modalidades
 */
export const fetchAll = async () => {
  const modalities = await modalityRepository.findAll();

  return modalities.map(modality => modality.toJSON());
};

/**
 * Obtener modalidades paginadas con filtro por nombre
 */
export const fetchAllSimple = async () => {  
  // Obtener registros paginados
  // aca nos vamos al repository para hacer la consulta
  const modalities = await modalityRepository.findAllSimple({
    order: [['id', 'ASC']]
  });

  return modalities.map(modality => modality.toJSON());
};

export const fetchAllPaginated = async (page = 1, limit = 10, name = '') => {
  const offset = (page - 1) * limit;

  // Construir filtros
  const whereClause = {};
  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`
    };
  }

  // Obtener total de registros
  const total = await modalityRepository.count(whereClause);

  // Obtener registros paginados
  const modalities = await modalityRepository.findAllPaginated({
    where: whereClause,
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);
  const offsetResult = offset;

  return {
    modalities: modalities.map(modality => modality.toJSON()),
    total,
    totalPages,
    offset: offsetResult,
    page,
    limit
  };
};


/**
 * Obtener una carrera por su ID
 */
export const fetchById = async (id) => {
  const modality = await modalityRepository.findById(id);

  if (!modality) {
    return null;
  }

  return modality.toJSON();
};

/**
 * Servicio para crear una modalidad
 */
export const create = async (data) => {
  const newModality = await modalityRepository.create(data);
  return newModality.toJSON();
};

/**
 * Servicio para actualizar una modalidad
 */
export const update = async (id, data) => {
  const updatedModality = await modalityRepository.update(id, data);
  if (!updatedModality) return null;
  return updatedModality.toJSON();
};

/**
 * Servicio para eliminar una modalidad
 */
export const remove = async (id) => {
  return await modalityRepository.delete(id);
};