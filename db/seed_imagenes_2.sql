-- db/seed_imagenes_2.sql
-- Fotos de los 3 locales iniciales. Antes de ejecutarlo, guarda las fotos en
-- public/assets/img/productos/ y haz commit y push.

UPDATE products p SET picture_url = '/assets/img/productos/' || v.archivo
FROM (VALUES
  ('Menú del día',       'menu-dia.png'),
  ('Ensalada fresca',    'ensalada-fresca.jpg'),
  ('Jugo de naranja',    'jugo-naranja.jpg'),
  ('Gelatina',           'gelatina.jpg'),
  ('Sándwich de pollo',  'sandwich-pollo.jpg'),
  ('Sándwich de jamón',  'sandwich-jamon.jpg'),
  ('Triple clásico',     'triple-clasico.jpg'),
  ('Jugo surtido',       'jugo-surtido.jpg'),
  ('Limonada',           'limonada.jpg'),
  ('Café pasado',        'cafe-pasado.jpg'),
  ('Capuchino',          'capuchino.jpg'),
  ('Brownie',            'brownie.jpg'),
  ('Torta de zanahoria', 'torta-zanahoria.jpg')
) AS v(producto, archivo)
WHERE p.name = v.producto AND p.picture_url IS NULL;

-- Imagen de cada local: la misma que ya muestra la página de inicio
-- (misma regla que website/controllers.js: primero por nombre, luego por ID)
UPDATE stores s
SET logo_url = CASE
  WHEN s.commercial_name = 'Café de Biblioteca' THEN '/assets/img/cafeBiblioteca.png'
  WHEN s.commercial_name = 'Local de prueba'    THEN '/assets/img/sangucheria.png'
  WHEN s.id = 1 THEN '/assets/img/cafeteriaCentral.png'
  WHEN s.id = 2 THEN '/assets/img/sangucheria.png'
  WHEN s.id = 3 THEN '/assets/img/cafeBiblioteca.png'
  ELSE '/assets/img/cafeteria-web.jpg'
END
FROM users u
WHERE u.id = s.user_id
  AND u.email IN ('admin@admin', 'sanguches@admin', 'cafe@admin')
  AND s.logo_url IS NULL;
