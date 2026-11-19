// admin/repositories/profiles_repository.js
import Profile from '../models/profile.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class ProfileRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await Profile.findAll();
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllSimple(options = {}) {
    try {
      const { order = [['id', 'ASC']] } = options;
      return await Profile.findAll({
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await Profile.findAll({
        where,
        offset,
        limit,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await Profile.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca carrera por ID
   */
  async findById(id) {
    try {
      return await Profile.findByPk(id);
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await Profile.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) return null;
      return await profile.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) return null;
      await profile.destroy();
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new ProfileRepository();