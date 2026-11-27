-- db/seed_datos_ejemplo_2.sql
-- Segunda tanda de datos de ejemplo: 3 locales, 24 productos, 12 comensales,
-- 240 pedidos de los últimos 30 días y sus calificaciones.
-- Contraseñas '123' en texto plano (solo desarrollo). Se puede ejecutar varias veces (no duplica).
-- Ejecutar en Supabase -> SQL Editor, después de las migraciones.

BEGIN;

-- 1) Locales nuevos
CREATE TEMP TABLE s2_locales (email text, nombre text, ubicacion text, logo text, descripcion text) ON COMMIT DROP;
INSERT INTO s2_locales VALUES
  ('jugos@admin',     'Juguería La Pausa',   'Pabellón B',  '/assets/img/jugueria.png',         'Jugos al momento, batidos y ensaladas de fruta.'),
  ('central@admin',   'Comedor Central',     'Pabellón A',  '/assets/img/cafeteriaCentral.png', 'Menús y platos criollos para el almuerzo en el campus.'),
  ('saludable@admin', 'Verde Campus',        'Pabellón N',  '/assets/img/cafeteria-web.jpg',    'Bowls, wraps y bebidas ligeras preparadas en el día.');

INSERT INTO users (email, password, status, role_id)
SELECT email, '123', 'activo', (SELECT id FROM roles WHERE name = 'enterprises') FROM s2_locales
ON CONFLICT (email) DO NOTHING;

INSERT INTO stores (commercial_name, campus_location, logo_url, description, operative_status, user_id)
SELECT l.nombre, l.ubicacion, l.logo, l.descripcion, 'activo', u.id
FROM s2_locales l JOIN users u ON u.email = l.email
WHERE NOT EXISTS (SELECT 1 FROM stores s WHERE s.user_id = u.id);

INSERT INTO store_schedules (day_of_week, open_time, close_time, is_closed, store_id)
SELECT d, CASE WHEN d < 7 THEN TIME '07:00' END,
       CASE WHEN d < 6 THEN TIME '19:00' WHEN d = 6 THEN TIME '13:00' END,
       d = 7, s.id
FROM generate_series(1, 7) AS d
CROSS JOIN stores s
JOIN users u ON u.id = s.user_id
WHERE u.email IN (SELECT email FROM s2_locales)
ON CONFLICT (store_id, day_of_week) DO NOTHING;

-- 2) Cartas
CREATE TEMP TABLE s2_productos (email text, categoria text, orden int, nombre text, descripcion text, precio numeric, minutos int) ON COMMIT DROP;
INSERT INTO s2_productos VALUES
  ('jugos@admin',     'Jugos',     1, 'Jugo de fresa con leche', 'Vaso de 16 oz',                      8.00,  5),
  ('jugos@admin',     'Jugos',     1, 'Jugo de papaya',          'Vaso de 16 oz',                      6.50,  4),
  ('jugos@admin',     'Jugos',     1, 'Jugo de piña',            'Natural, sin azúcar añadida',        6.50,  4),
  ('jugos@admin',     'Batidos',   2, 'Batido de plátano',       'Con leche y avena',                  8.50,  5),
  ('jugos@admin',     'Batidos',   2, 'Batido de lúcuma',        'Cremoso, 16 oz',                     9.50,  5),
  ('jugos@admin',     'Frutas',    3, 'Ensalada de frutas',      'Frutas de estación con yogur',       8.00,  4),
  ('jugos@admin',     'Frutas',    3, 'Yogur con granola',       'Vaso con miel',                      7.00,  3),
  ('jugos@admin',     'Frutas',    3, 'Empanada de queso',       'Horneada en el día',                 5.00,  3),
  ('central@admin',   'Platos',    1, 'Lomo saltado',            'Con papas fritas y arroz',          18.00, 15),
  ('central@admin',   'Platos',    1, 'Ají de gallina',          'Con arroz y papa',                  15.00, 10),
  ('central@admin',   'Platos',    1, 'Arroz con pollo',         'Con salsa criolla',                 14.50, 10),
  ('central@admin',   'Platos',    1, 'Tallarines verdes',       'Con filete de pollo',               16.00, 12),
  ('central@admin',   'Entradas',  2, 'Papa a la huancaína',     'Porción individual',                 7.00,  4),
  ('central@admin',   'Entradas',  2, 'Causa de pollo',          'Rellena con palta',                  8.00,  4),
  ('central@admin',   'Refrescos', 3, 'Chicha morada',           'Vaso de 14 oz',                      4.00,  2),
  ('central@admin',   'Refrescos', 3, 'Maracuyá',                'Vaso de 14 oz',                      4.00,  2),
  ('saludable@admin', 'Bowls',     1, 'Bowl de quinua',          'Quinua, palta, verduras y huevo',   15.50,  8),
  ('saludable@admin', 'Bowls',     1, 'Bowl de pollo',           'Arroz integral y pollo a la plancha',16.50, 10),
  ('saludable@admin', 'Wraps',     2, 'Wrap de pollo',           'Con verduras y salsa de yogur',     13.00,  7),
  ('saludable@admin', 'Wraps',     2, 'Wrap vegetariano',        'Hummus y vegetales asados',         12.00,  7),
  ('saludable@admin', 'Wraps',     2, 'Ensalada César',          'Con pollo y crutones',              14.00,  6),
  ('saludable@admin', 'Bebidas',   3, 'Té helado',               'De hierbaluisa, 14 oz',              5.00,  2),
  ('saludable@admin', 'Bebidas',   3, 'Agua de pepino',          'Con limón',                          4.50,  2),
  ('saludable@admin', 'Bebidas',   3, 'Galleta de avena',        'Con chispas de chocolate',           3.50,  1);

INSERT INTO categories (name, display_order, store_id)
SELECT DISTINCT p.categoria, p.orden, s.id
FROM s2_productos p
JOIN users u ON u.email = p.email
JOIN stores s ON s.user_id = u.id
WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.store_id = s.id AND c.name = p.categoria);

INSERT INTO products (name, description, price, preparation_time, category_id, store_id)
SELECT p.nombre, p.descripcion, p.precio, p.minutos, c.id, s.id
FROM s2_productos p
JOIN users u ON u.email = p.email
JOIN stores s ON s.user_id = u.id
JOIN categories c ON c.store_id = s.id AND c.name = p.categoria
WHERE NOT EXISTS (SELECT 1 FROM products x WHERE x.store_id = s.id AND x.name = p.nombre);

-- 3) Comensales
CREATE TEMP TABLE s2_comensales (email text, nombre text, apellido text) ON COMMIT DROP;
INSERT INTO s2_comensales VALUES
  ('maria@comensal','María','Quispe'),      ('jorge@comensal','Jorge','Ramírez'),
  ('lucia@comensal','Lucía','Fernández'),   ('diego@comensal','Diego','Salazar'),
  ('valeria@comensal','Valeria','Rojas'),   ('mateo@comensal','Mateo','Vargas'),
  ('camila@comensal','Camila','Chávez'),    ('andres@comensal','Andrés','Mendoza'),
  ('sofia@comensal','Sofía','Castillo'),    ('renato@comensal','Renato','Gutiérrez'),
  ('paola@comensal','Paola','Huamán'),      ('sebastian@comensal','Sebastián','Núñez');

INSERT INTO users (email, password, status, role_id)
SELECT email, '123', 'activo', (SELECT id FROM roles WHERE name = 'comensal') FROM s2_comensales
ON CONFLICT (email) DO NOTHING;

INSERT INTO diners (first_name, last_name, user_id)
SELECT c.nombre, c.apellido, u.id
FROM s2_comensales c JOIN users u ON u.email = c.email
WHERE NOT EXISTS (SELECT 1 FROM diners d WHERE d.user_id = u.id);

-- 4) 240 pedidos repartidos en 30 días entre todos los locales activos con productos
WITH locales AS (
  SELECT s.id, ROW_NUMBER() OVER (ORDER BY s.id) - 1 AS pos, COUNT(*) OVER () AS total
  FROM stores s
  WHERE s.operative_status = 'activo'
    AND EXISTS (SELECT 1 FROM products p WHERE p.store_id = s.id AND p.available)
), comensales AS (
  SELECT d.id, ROW_NUMBER() OVER (ORDER BY d.id) - 1 AS pos, COUNT(*) OVER () AS total
  FROM diners d JOIN users u ON u.id = d.user_id
  WHERE u.email IN (SELECT email FROM s2_comensales)
), base AS (
  SELECT n,
         (n - 1) % 30 AS atras,
         ABS(('x' || SUBSTR(MD5('local'  || n), 1, 7))::bit(28)::int) AS h1,
         ABS(('x' || SUBSTR(MD5('hora'   || n), 1, 7))::bit(28)::int) AS h2,
         ABS(('x' || SUBSTR(MD5('cliente'|| n), 1, 7))::bit(28)::int) AS h3
  FROM generate_series(1, 240) AS n
)
INSERT INTO orders (code, pickup_date, pickup_time, total_amount, created, diner_id, store_id, status_id)
SELECT 'S2-' || LPAD(b.n::text, 4, '0'), f.fecha, f.hora, 0,
       f.fecha + f.hora - INTERVAL '1 hour',
       c.id, l.id, st.id
FROM base b
CROSS JOIN LATERAL (
  SELECT (NOW() AT TIME ZONE 'America/Lima')::date - b.atras AS fecha,
         (ARRAY['08:00','09:30','11:00','12:30','13:00','13:00','13:30','13:30','15:00','17:00'])[1 + b.h2 % 10]::time AS hora
) f
JOIN locales l ON l.pos = b.h1 % l.total
JOIN comensales c ON c.pos = b.h3 % c.total
JOIN order_statuses st ON st.name = CASE
  WHEN b.atras = 0 THEN (ARRAY['recibido','preparacion','listo'])[1 + b.h2 % 3]
  WHEN b.n % 14 = 0 THEN 'rechazado'
  ELSE 'entregado' END
ON CONFLICT (code) DO NOTHING;

-- 5) Productos de cada pedido (1 o 2 distintos)
INSERT INTO order_items (product_name, unit_price, quantity, subtotal, order_id, product_id)
SELECT p.name, p.price, q.cantidad, p.price * q.cantidad, o.id, p.id
FROM orders o
CROSS JOIN LATERAL (
  SELECT x.id, x.name, x.price
  FROM products x
  WHERE x.store_id = o.store_id AND x.available
  ORDER BY MD5(o.code || x.id)
  LIMIT 1 + (o.id % 2)
) p
CROSS JOIN LATERAL (SELECT CASE WHEN (o.id + p.id) % 5 = 0 THEN 2 ELSE 1 END AS cantidad) q
WHERE o.code LIKE 'S2-%'
  AND NOT EXISTS (SELECT 1 FROM order_items i WHERE i.order_id = o.id);

UPDATE orders o
SET total_amount = (SELECT COALESCE(SUM(subtotal), 0) FROM order_items i WHERE i.order_id = o.id)
WHERE o.code LIKE 'S2-%';

-- 6) Calificaciones de parte de los pedidos entregados
INSERT INTO order_reviews (store_rating, comment, created_at, order_id, diner_id, store_id)
SELECT v.estrellas,
       CASE v.estrellas
         WHEN 5 THEN (ARRAY['Excelente, muy rico y puntual.','Lo recogí sin hacer cola.','Volveré a pedir.'])[1 + o.id % 3]
         WHEN 4 THEN (ARRAY['Buen sabor y buena porción.','Todo bien, demoró un poco.'])[1 + o.id % 2]
         WHEN 3 THEN 'Estuvo correcto, puede mejorar.'
         ELSE 'Llegó frío y tuve que esperar.' END,
       (o.pickup_date + o.pickup_time + INTERVAL '1 hour') AT TIME ZONE 'America/Lima',
       o.id, o.diner_id, o.store_id
FROM orders o
JOIN order_statuses st ON st.id = o.status_id AND st.name = 'entregado'
CROSS JOIN LATERAL (SELECT (ARRAY[5,5,4,5,4,3,5,4,2,5,4])[1 + (o.id / 2) % 11] AS estrellas) v
WHERE o.code LIKE 'S2-%' AND RIGHT(o.code, 1)::int % 3 <> 0
ON CONFLICT (order_id) DO NOTHING;

INSERT INTO product_reviews (rating, order_review_id, product_id)
SELECT r.store_rating, r.id, i.product_id
FROM order_reviews r
JOIN orders o ON o.id = r.order_id AND o.code LIKE 'S2-%'
JOIN order_items i ON i.order_id = o.id
WHERE i.product_id IS NOT NULL
ON CONFLICT (order_review_id, product_id) DO NOTHING;

COMMIT;
