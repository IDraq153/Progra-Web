// admin/repositories/modality_repository.js
import Modality from '../models/modality.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class ModalityRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await Modality.findAll();
    } catch (error) {
      if (showLogs) console.error('🔥 [ModalityRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllSimple(options = {}) {
    try {
      const { order = [['id', 'ASC']] } = options;
      return await Modality.findAll({
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [ModalityRepo.findAllSimple] Error:', error);
      throw error;
    }
  }
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await Modality.findAll({
        where,
        offset,
        limit,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [ModalityRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await Modality.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [ModalityRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca modalidad por ID
   */
  async findById(id) {
    try {
      return await Modality.findByPk(id);
    } catch (error) {
      if (showLogs) console.error(`🔥 [ModalityRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await Modality.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [ModalityRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const modality = await Modality.findByPk(id);
      if (!modality) return null;
      return await modality.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [ModalityRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const modality = await Modality.findByPk(id);
      if (!modality) return null;
      await modality.destroy();
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [ModalityRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new ModalityRepository();