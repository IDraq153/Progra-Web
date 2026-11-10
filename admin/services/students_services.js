
import studentRepository from '../repositories/students_repository.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los estudiantes
 */
export const fetchAll = async () => {
  const students = await studentRepository.findAll();

  return students.map(student => student.toJSON());
};

/**
 * Obtener todos los estudiantes con ordenamiento
 */
export const fetchAllSimple = async () => {
  // Obtener registros
  const students = await studentRepository.findAllSimple({
    order: [['id', 'ASC']]
  });

  return students.map(student => student.toJSON());
};

/**
 * Obtener estudiantes paginados con filtro por nombre o apellido
 */
export const fetchAllPaginated = async (page = 1, limit = 10, name = '') => {
  const offset = (page - 1) * limit;

  // Construir filtros
  const whereClause = {};

  if (name) {
    whereClause[Op.or] = [
      { names: { [Op.iLike]: `%${name}%` } },
      { last_names: { [Op.iLike]: `%${name}%` } }
    ];
  }

  // Obtener total de registros
  const total = await studentRepository.count(whereClause);

  // Obtener registros paginados
  const students = await studentRepository.findAllPaginated({
    where: whereClause,
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);
  const offsetResult = offset;

  return {
    students: students.map(student => student.toJSON()),
    total,
    totalPages,
    offset: offsetResult,
    page,
    limit
  };
};

/**
 * Obtener un estudiante por su ID
 */
export const fetchById = async (id) => {
  const student = await studentRepository.findById(id);

  if (!student) {
    return null;
  }

  return student.toJSON();
};

/**
 * Servicio para crear un estudiante
 */
export const create = async (data) => {
  const newStudent = await studentRepository.create(data);

  return newStudent.toJSON();
};

/**
 * Servicio para actualizar un estudiante
 */
export const update = async (id, data) => {
  const updatedStudent = await studentRepository.update(id, data);

  if (!updatedStudent) {
    return null;
  }

  return updatedStudent.toJSON();
};

/**
 * Servicio para eliminar un estudiante
 */
export const remove = async (id) => {
  return await studentRepository.delete(id);
};
