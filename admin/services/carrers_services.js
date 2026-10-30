// admin/services/carrers_services.js
import carrerRepository from '../repositories/carrers_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todas las carreras
 */
export const fetchAll = async () => {
  const carrers = await carrerRepository.findAll();

  return carrers.map(carrer => carrer.toJSON());
};

/**
 * Obtener carreras paginadas con filtro por nombre
 */
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
  const total = await carrerRepository.count(whereClause);

  // Obtener registros paginados
  const carrers = await carrerRepository.findAllPaginated({
    where: whereClause,
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);
  const offsetResult = offset;

  return {
    carrers: carrers.map(carrer => carrer.toJSON()),
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
  const carrer = await carrerRepository.findById(id);

  if (!carrer) {
    return null;
  }

  return carrer.toJSON();
};

/**
 * Servicio para crear una carrera
 */
export const create = async (data) => {
  const newCarrer = await carrerRepository.create(data);
  return newCarrer.toJSON();
};

/**
 * Servicio para actualizar una carrera
 */
export const update = async (id, data) => {
  const updatedCarrer = await carrerRepository.update(id, data);
  if (!updatedCarrer) return null;
  return updatedCarrer.toJSON();
};

/**
 * Servicio para eliminar una carrera
 */
export const remove = async (id) => {
  return await carrerRepository.delete(id);
};