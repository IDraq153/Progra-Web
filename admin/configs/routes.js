// admin/configs/routes.js
import { Router } from 'express';
import * as admins from '../controllers/admin_controllers.js';
import * as carrers from '../controllers/carrer_controllers.js';
import * as owners from '../controllers/owner_controllers.js';
import * as enterprises from '../controllers/enterprise_controllers.js';
import * as nationApis from '../apis/nations_apis.js';
import { redirectIfAuthenticated, requireAuth, soloRolEnterprise, soloRolOwner } from '../../configs/middlewares.js'; 

const router = Router();

// Entrar a administrador para dar mantenimiento a tablas fuertes
// react views
router.get('/admin', admins.home);
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

router.get('/admin/carrers', carrers.home);
router.get('/owner', soloRolOwner, owners.home);

// rutas panel de control
router.get('/enterprises', soloRolEnterprise, enterprises.home);
router.get('/enterprises/bandeja', soloRolEnterprise, enterprises.bandeja);
router.get('/enterprises/resumenDia', soloRolEnterprise, enterprises.resumenDia);
router.get('/enterprises/entrega', soloRolEnterprise, enterprises.entrega);
router.get('/enterprises/opcionesAgregados', soloRolEnterprise, enterprises.opcionesAgregados);
router.get('/enterprises/Micarta', soloRolEnterprise, enterprises.Micarta);
router.get('/enterprises/agotados', soloRolEnterprise, enterprises.agotados);
router.get('/enterprises/perfil', soloRolEnterprise, enterprises.perfil);
router.get('/enterprises/horario', soloRolEnterprise, enterprises.horario);

export default router;