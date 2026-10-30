// admin/repositories/carrers_repository.js
import Carrer from '../models/carrer.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class CarrerRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await Carrer.findAll();
    } catch (error) {
      if (showLogs) console.error('🔥 [CarrerRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await Carrer.findAll({
        where,
        offset,
        limit,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [CarrerRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await Carrer.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [CarrerRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca carrera por ID
   */
  async findById(id) {
    try {
      return await Carrer.findByPk(id);
    } catch (error) {
      if (showLogs) console.error(`🔥 [CarrerRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await Carrer.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [CarrerRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const carrer = await Carrer.findByPk(id);
      if (!carrer) return null;
      return await carrer.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [CarrerRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const carrer = await Carrer.findByPk(id);
      if (!carrer) return null;
      await carrer.destroy();
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [CarrerRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new CarrerRepository();