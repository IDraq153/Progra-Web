// admin/controllers/entreprise_controllers.js

export function home(req, res) {
  return res.render('enterprise/home', {
    title: 'Bienvenido entreprise',
  });
}