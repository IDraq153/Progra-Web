
import { Student, User, Profile, Semester } from '../models/index.js';

/**
 * Incluye el usuario del estudiante con su perfil (en lugar de solo profile_id).
 * No se expone password ni reset_token.
 */
const withProfile = {
  model: User,
  as: 'user',
  attributes: ['id'],
  include: [
    {
      model: Profile,
      as: 'profile',
      attributes: ['id', 'name']
    }
  ]
};

/**
 * Incluye el semestre del estudiante (id y nombre).
 */
const withSemester = {
  model: Semester,
  as: 'semester',
  attributes: ['id', 'name']
};

/**
 * Obtener todos los estudiantes
 */
const findAll = async () => {
  return await Student.findAll({ include: [withProfile, withSemester] });
};

/**
 * Obtener todos los estudiantes con opciones de ordenamiento
 */
const findAllSimple = async (options = {}) => {
  return await Student.findAll({ ...options, include: [withProfile, withSemester] });
};

/**
 * Obtener estudiantes paginados
 */
const findAllPaginated = async (options = {}) => {
  return await Student.findAll({ ...options, include: [withProfile, withSemester] });
};

/**
 * Contar estudiantes
 */
const count = async (where = {}) => {
  return await Student.count({ where });
};

/**
 * Obtener estudiante por ID
 */
const findById = async (id) => {
  return await Student.findByPk(id, { include: [withProfile, withSemester] });
};

/**
 * Crear estudiante
 */
const create = async (data) => {
  return await Student.create(data);
};

/**
 * Actualizar estudiante
 */
const update = async (id, data) => {
  const student = await Student.findByPk(id);

  if (!student) return null;

  return await student.update(data);
};

/**
 * Eliminar estudiante
 */
const deleteStudent = async (id) => {
  const student = await Student.findByPk(id);

  if (!student) return null;

  await student.destroy();
  return true;
};

const studentRepository = {
  findAll,
  findAllSimple,
  findAllPaginated,
  count,
  findById,
  create,
  update,
  delete: deleteStudent
};

export default studentRepository;
