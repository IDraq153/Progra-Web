// website/controllers.js
export function home(req, res) { 
  return res.render('website/home', {
    title: 'Crear cuenta :)',
    currentPage: 'home',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}
export function convocatorias(req, res) { 
  return res.render('website/convocatorias', {
    title: 'Convocatorias',
    currentPage: 'convocatorias',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}
export function empresas(req, res) { 
  return res.render('website/empresas', {
    title: 'empresas',
    currentPage: 'empresas',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}
export function estudiantes(req, res) { 
  return res.render('website/estudiantes', {
    title: 'estudiantes',
    currentPage: 'estudiantes',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}
export function funcion(req, res) { 
  return res.render('website/como-funciona', {
    title: 'como-funciona',
    currentPage: 'como-funciona',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}
export function login(req, res) { 
  return res.render('website/login', {
    title: 'Login',
  });
}

export async function loginP(req, res) {
   const {username, password} = req.body;
   const usuarios = [ 
    {username: 'admin', password: '123', role: 'enterprises'}, 
    {username: 'owner', password: '123', role: 'owner'}, 
   ];

   let usuarioEncontrado = null;
   for(let i = 0; i < usuarios.length; i++) {
    if(usuarios[i].username == username && usuarios[i].password == password) {
      usuarioEncontrado = usuarios[i];
    }
   }

   if(usuarioEncontrado != null) {
     req.session.username = usuarioEncontrado.username;
     req.session.role = usuarioEncontrado.role;

     return req.session.save(() => {
      if(req.session.role == 'enterprises') {
        res.redirect('/enterprises'); 
      } else {
        res.redirect('/owner'); 
      }
     });
    } else {
      return res.render('website/login', {
        title: 'Login',
        mensaje: 'Usuario incorrecto',
      });   
    }
}

export function login3(req, res) { 
  return res.render('website/login3', {
    title: 'Login3',
  });
}

export function register(req, res) { 
  return res.render('website/register', {
    title: 'Registrarse',
    currentPage: 'register',
  });
}

export function password(req, res) { 
  return res.render('website/password', {
    title: '¿Olvidaste tu contraseña?',
  });
}

export function about(req, res) {
  return res.render('website/about', {
    title: 'Acerca de',
    currentPage: 'about',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}


export function contact(req, res) {
  return res.render('website/contact', {
    title: 'Acerca de',
    currentPage: 'contact',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}

export function players(req, res) {
  return res.render('website/players', {
    title: 'Acerca de',
    currentPage: 'players',
    description:
      'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'
  });
}

export function signIn(req, res) {
  return res.render('website/sign-in', {
    title: 'Bienvenido',
  });
}

export async function login2(req, res) {
  const { user, password } = req.body;
  const validUser = process.env.DEFAULT_USER || 'admin';
  const validPassword = process.env.DEFAULT_PASSWORD || '123';

  if (validUser == user && validPassword == password) {
    req.session.user = {id:1, username: user};

    req.flash('success', '¡Bienvenido! Has iniciado sesión correctamente.');
    
    return req.session.save(() => {
      res.redirect('/admin');
    });
  }

  // ❌ credenciales incorrectas
  req.flash('error', 'Credenciales incorrectas');
  
  // ✅ Extraer flash messages manualmente antes de renderizar
  const success_messages = req.flash('success');
  const error_messages = req.flash('error');
  const warning_messages = req.flash('warning');
  const info_messages = req.flash('info');
  
  const hasFlashMessages = 
    success_messages.length > 0 ||
    error_messages.length > 0 ||
    warning_messages.length > 0 ||
    info_messages.length > 0;

  console.log("1 +++++++++++++++++++++++++++++++++++++")

  res.render('website/sign-in', {
    title: 'Iniciar Sesión',
    user: user, // Mantener el usuario en el formulario
    
    // ✅ Pasar explícitamente los flash messages
    success_messages,
    error_messages,
    warning_messages,
    info_messages,
    hasFlashMessages
  });
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.redirect('/');
    }

    // Limpia la cookie de sesión (opcional pero recomendado)
    res.clearCookie('connect.sid');

    // Redirige al login
    res.redirect('/sign-in');
  });
}