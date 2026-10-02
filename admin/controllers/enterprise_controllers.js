// admin\controllers\enterprise_controllers.js

export function home(req, res) {
  return res.render('enterprises/home', {
    title: 'Bienvenido Empresa',
    currentPage: 'home',
  });
}

export function bandeja(req, res) {
  return res.render('enterprises/bandeja', {
    title: 'Bienvenido Empresa',
    currentPage: 'bandeja',
  });
}