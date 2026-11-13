//admin\apis\districts_apis.js
import District from '../models/district.js';

export async function listDistrictsSimple(req, res) {
  try {
    const districts = await District.findAll({ order: [['name', 'ASC']] });

    return res.status(200).json({
      success: true,
      message: 'Distritos listados con éxito',
      data: districts.map((district) => district.toJSON()),
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los distritos',
      data: null,
      error: error.message
    });
  }
}
