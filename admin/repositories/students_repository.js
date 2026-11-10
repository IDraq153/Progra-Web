
import Student from '../models/student.js';

/**
 * Obtener todos los estudiantes
 */
const findAll = async () => {
  return await Student.findAll();
};

/**
 * Obtener todos los estudiantes con opciones de ordenamiento
 */
const findAllSimple = async (options = {}) => {
  return await Student.findAll(options);
};

/**
 * Obtener estudiantes paginados
 */
const findAllPaginated = async (options = {}) => {
  return await Student.findAll(options);
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
  return await Student.findByPk(id);
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
