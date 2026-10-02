// admin\controllers\enterprise_controllers.js

export function home(req, res) {
  return res.render('enterprises/home', {
    title: 'Bienvenido Empresa',
    currentPage: 'home',
  });
}