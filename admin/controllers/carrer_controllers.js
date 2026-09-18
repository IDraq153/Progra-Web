// admin\controllers\carrer_controllers.js



export function home(req, res) {
    let carrers = [
        { id: 1, name: "Ingeniería de Sistemas"},
        { id: 2, name: "Ingeniería Civil" },
        { id: 3, name: "Ingeniería Industrial" },
        { id: 4, name: "Ingeniería Mecánica" },
        { id: 5, name: "Ingeniería Electrónica" },
        { id: 6, name: "Ingeniería Ambiental" },
        { id: 7, name: "Medicina Humana" },
        { id: 8, name: "Enfermería" },
        { id: 9, name: "Odontología" },
        { id: 10, name: "Psicología" },
        { id: 11, name: "Derecho" },
        { id: 12, name: "Administración" },
        { id: 13, name: "Contabilidad" },
        { id: 14, name: "Economía" },
        { id: 15, name: "Arquitectura" },
        { id: 16, name: "Comunicación" },
        { id: 17, name: "Marketing" },
        { id: 18, name: "Educación" },
        { id: 19, name: "Ciencias Políticas" },
        { id: 20, name: "Diseño Gráfico" },
    ];

  return res.render('admin/carrers', {
    title: 'Carrers',
    currentPage: 'carrers',
    carrers: carrers,
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}