
import { Router } from 'express';
import * as admins from '../controllers/admin_controllers.js';
import * as carrers from '../controllers/carrer_controllers.js';
import * as owners from '../controllers/owner_controllers.js';
import * as enterprises from '../controllers/enterprise_controllers.js';
import * as nationApis from '../apis/nations_apis.js';
import * as carrerApis from '../apis/carrers_apis.js';
import * as studentApis from '../apis/students_apis.js';
import * as semesterApis from '../apis/semesters_apis.js';
import * as districtApis from '../apis/districts_apis.js';

import {
  redirectIfAuthenticated,
  requireAuth,
  soloOwner,
  soloEnterprise,
  soloLogueado
} from '../../configs/middlewares.js';

const router = Router();

// react views
router.get('/admin', requireAuth, admins.home);
router.get('/admin/players', requireAuth, admins.home);
router.get('/admin/teams', requireAuth, admins.home);
router.get('/admin/leagues', requireAuth, admins.home);
router.get('/admin/nations', requireAuth, admins.home);
router.get('/admin/catalogs', requireAuth, admins.home);

// api nations
router.get('/api/v1/nations', nationApis.listNations);
router.get('/api/v1/nations/:id', nationApis.getNationById);
router.post('/api/v1/nations', nationApis.createNation);
router.put('/api/v1/nations/:id', nationApis.updateNation);
router.delete('/api/v1/nations/:id', nationApis.deleteNation);

// api carrers
router.get('/api/v1/carrers', carrerApis.listCarrersSimple);
router.post('/api/v1/carrers', carrerApis.carreraNueva);
router.delete('/api/v1/carrers/:id', carrerApis.deleteCarrer);
router.get('/api/v1/carrers/:id', carrerApis.getCarrerById);
router.put('/api/v1/carrers/:id', carrerApis.updateCarrer);

// api semesters
router.get('/api/v1/semesters', semesterApis.listSemestersSimple);

// api districts
router.get('/api/v1/districts', districtApis.listDistrictsSimple);

// api students
router.get('/api/v1/students', studentApis.listStudentsSimple);
router.post('/api/v1/students', studentApis.createStudent);
router.delete('/api/v1/students/:id', studentApis.deleteStudent);
router.get('/api/v1/students/:id', studentApis.getStudentById);
router.put('/api/v1/students/:id', studentApis.updateStudent);

// carrers
router.get('/admin/carrers', carrers.home);

// students
// Agrega aquí la vista de administración de estudiantes cuando la tengas definida.

router.get('/owner', soloLogueado, soloOwner, owners.home);
router.get('/enterprise', enterprises.home);
router.get('/enterprise/carrers', enterprises.home);
router.get('/enterprise/carrers/new', enterprises.home);
router.get('/enterprise/convocatorias', enterprises.home);
router.get('/enterprise/convocatorias/nueva', enterprises.home);
router.get('/enterprise/postulantes', enterprises.home);
router.get('/enterprise/perfil', enterprises.home);
router.get('/enterprise/resenas', enterprises.home);
router.get('/enterprise/cambiar-contrasena', enterprises.home);
router.get('/enterprise/carrers/:id/edit', enterprises.home);
router.get('/enterprise/students', enterprises.home);
router.get('/enterprise/students/new', enterprises.home);

export default router;
