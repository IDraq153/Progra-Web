-- db/seed_imagenes.sql
-- Asigna fotos a los productos. Antes de ejecutarlo:
--   1. Guarda cada foto en public/assets/img/productos/ con el nombre indicado.
--   2. Haz commit y push.
-- Borra las líneas de las fotos que todavía no tengas.

UPDATE products p SET picture_url = '/assets/img/productos/' || v.archivo
FROM (VALUES
  ('Jugo de fresa con leche', 'jugo-fresa.jpeg'),
  ('Jugo de papaya',          'jugo-papaya.jpg'),
  ('Jugo de piña',            'jugo-pina.jpg'),
  ('Batido de plátano',       'batido-platano.jpg'),
  ('Batido de lúcuma',        'batido-lucuma.jpg'),
  ('Ensalada de frutas',      'ensalada-frutas.jpg'),
  ('Yogur con granola',       'yogur-granola.jpg'),
  ('Empanada de queso',       'empanada-queso.jpg'),
  ('Lomo saltado',            'lomo-saltado.jpg'),
  ('Ají de gallina',          'aji-gallina.jpg'),
  ('Arroz con pollo',         'arroz-pollo.jpg'),
  ('Tallarines verdes',       'tallarines-verdes.jpg'),
  ('Papa a la huancaína',     'papa-huancaina.jpg'),
  ('Causa de pollo',          'causa-pollo.jpg'),
  ('Chicha morada',           'chicha-morada.jpg'),
  ('Maracuyá',                'maracuya.jpg'),
  ('Bowl de quinua',          'bowl-quinua.jpg'),
  ('Bowl de pollo',           'bowl-pollo.jpg'),
  ('Wrap de pollo',           'wrap-pollo.jpg'),
  ('Wrap vegetariano',        'wrap-vegetariano.jpg'),
  ('Ensalada César',          'ensalada-cesar.jpg'),
  ('Té helado',               'te-helado.jpg'),
  ('Agua de pepino',          'agua-pepino.jpg'),
  ('Galleta de avena',        'galleta-avena.jpg')
) AS v(producto, archivo)
WHERE p.name = v.producto;
