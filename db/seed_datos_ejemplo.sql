-- db/seed_datos_ejemplo.sql
-- Datos de ejemplo para que la página no se vea vacía. Se puede ejecutar varias veces (no duplica).
-- Contraseñas '123' en texto plano, igual que los usuarios de prueba (solo desarrollo).
-- Ejecutar en Supabase -> SQL Editor (o con psql). Requiere haber corrido `npm run db:up`.

BEGIN;

-- 1) Descripciones de los locales (solo si aún no tienen)
UPDATE stores s SET description = v.descripcion
FROM users u, (VALUES
  ('admin@admin',      'Desayunos, menú del día y bebidas frescas para tus pausas entre clases.'),
  ('sanguches@admin',  'Sánguches calientes, triples, empanadas y bebidas para una pausa rápida.'),
  ('cafe@admin',       'Espresso, postres, croissants y snacks cerca de la zona de estudio.')
) AS v(email, descripcion)
WHERE u.id = s.user_id AND u.email = v.email AND s.description IS NULL;

-- 2) Carta del local de prueba (admin@admin), solo si no tiene categorías
INSERT INTO categories (name, display_order, store_id)
SELECT c.name, c.display_order, s.id
FROM stores s
JOIN users u ON u.id = s.user_id AND u.email = 'admin@admin'
CROSS JOIN (VALUES ('Menú', 1), ('Bebidas', 2), ('Postres', 3)) AS c(name, display_order)
WHERE NOT EXISTS (SELECT 1 FROM categories x WHERE x.store_id = s.id);

INSERT INTO products (name, description, price, available, preparation_time, category_id, store_id)
SELECT p.name, p.description, p.price, TRUE, p.prep, c.id, c.store_id
FROM (VALUES
  ('Menú',    'Menú del día',       'Entrada, segundo y refresco',   14.00, 10),
  ('Menú',    'Ensalada fresca',    'Verduras de estación con pollo', 9.50,  5),
  ('Bebidas', 'Jugo de naranja',    'Vaso de 12 oz',                  5.00,  3),
  ('Postres', 'Gelatina',           'Porción individual',             3.00,  1)
) AS p(categoria, name, description, price, prep)
JOIN categories c ON c.name = p.categoria
JOIN stores s ON s.id = c.store_id
JOIN users u ON u.id = s.user_id AND u.email = 'admin@admin'
WHERE NOT EXISTS (SELECT 1 FROM products x WHERE x.store_id = s.id);

-- 3) Opciones y agregados de ejemplo
INSERT INTO option_groups (name, selection_type, is_required, product_id)
SELECT g.grupo, g.tipo, g.requerido, p.id
FROM (VALUES
  ('Sándwich de pollo', 'Extras',  'multiple', FALSE),
  ('Menú del día',      'Bebida',  'unica',    TRUE)
) AS g(producto, grupo, tipo, requerido)
JOIN products p ON p.name = g.producto
WHERE NOT EXISTS (SELECT 1 FROM option_groups x WHERE x.product_id = p.id AND x.name = g.grupo);

INSERT INTO product_options (name, additional_price, option_group_id)
SELECT o.opcion, o.precio, og.id
FROM (VALUES
  ('Sándwich de pollo', 'Extras', 'Queso extra', 2.00),
  ('Sándwich de pollo', 'Extras', 'Papas',       3.00),
  ('Menú del día',      'Bebida', 'Chicha',      0.00),
  ('Menú del día',      'Bebida', 'Limonada',    0.00)
) AS o(producto, grupo, opcion, precio)
JOIN products p ON p.name = o.producto
JOIN option_groups og ON og.product_id = p.id AND og.name = o.grupo
WHERE NOT EXISTS (SELECT 1 FROM product_options x WHERE x.option_group_id = og.id AND x.name = o.opcion);

-- 4) Dos comensales más (además de comensal@comensal)
INSERT INTO users (email, phone, password, status, role_id)
SELECT v.email, NULL, '123', 'activo', (SELECT id FROM roles WHERE name = 'comensal')
FROM (VALUES ('ana@comensal'), ('luis@comensal')) AS v(email)
ON CONFLICT (email) DO NOTHING;

INSERT INTO diners (first_name, last_name, user_id)
SELECT v.nombre, v.apellido, u.id
FROM (VALUES ('ana@comensal', 'Ana', 'Pérez'), ('luis@comensal', 'Luis', 'Torres')) AS v(email, nombre, apellido)
JOIN users u ON u.email = v.email
WHERE NOT EXISTS (SELECT 1 FROM diners d WHERE d.user_id = u.id);

-- 5) Pedidos (fecha de recojo en hora de Lima: dias = 0 hoy, -1 ayer...)
INSERT INTO orders (code, pickup_date, pickup_time, total_amount, diner_id, store_id, status_id)
SELECT v.code,
       ((NOW() AT TIME ZONE 'America/Lima')::date + v.dias),
       v.hora::time, 0, d.id, s.id, st.id
FROM (VALUES
  ('CP-1001', 'comensal@comensal', 'sanguches@admin', -3, '13:00', 'entregado'),
  ('CP-1002', 'ana@comensal',      'sanguches@admin', -2, '12:30', 'entregado'),
  ('CP-1003', 'luis@comensal',     'cafe@admin',      -1, '10:00', 'entregado'),
  ('CP-1004', 'comensal@comensal', 'cafe@admin',      -1, '15:30', 'entregado'),
  ('CP-1008', 'comensal@comensal', 'admin@admin',     -2, '13:00', 'entregado'),
  ('CP-1005', 'comensal@comensal', 'sanguches@admin',  0, '13:30', 'recibido'),
  ('CP-1006', 'ana@comensal',      'cafe@admin',       0, '12:00', 'preparacion'),
  ('CP-1007', 'luis@comensal',     'sanguches@admin',  0, '12:30', 'listo'),
  ('CP-1009', 'ana@comensal',      'admin@admin',      0, '13:00', 'recibido')
) AS v(code, comensal, local, dias, hora, estado)
JOIN users ud ON ud.email = v.comensal
JOIN diners d ON d.user_id = ud.id
JOIN users us ON us.email = v.local
JOIN stores s ON s.user_id = us.id
JOIN order_statuses st ON st.name = v.estado
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.code = v.code);

-- 6) Productos de cada pedido (solo en pedidos que aún no tienen items)
INSERT INTO order_items (product_name, unit_price, quantity, subtotal, order_id, product_id)
SELECT p.name, p.price, v.cantidad, p.price * v.cantidad, o.id, p.id
FROM (VALUES
  ('CP-1001', 'Sándwich de pollo',  1),
  ('CP-1001', 'Limonada',           2),
  ('CP-1002', 'Sándwich de jamón',  2),
  ('CP-1002', 'Jugo surtido',       1),
  ('CP-1003', 'Capuchino',          2),
  ('CP-1003', 'Brownie',            1),
  ('CP-1004', 'Café pasado',        1),
  ('CP-1004', 'Torta de zanahoria', 1),
  ('CP-1008', 'Menú del día',       2),
  ('CP-1008', 'Jugo de naranja',    2),
  ('CP-1005', 'Sándwich de pollo',  2),
  ('CP-1006', 'Capuchino',          1),
  ('CP-1007', 'Sándwich de jamón',  1),
  ('CP-1007', 'Limonada',           1),
  ('CP-1009', 'Ensalada fresca',    1)
) AS v(code, producto, cantidad)
JOIN orders o ON o.code = v.code
JOIN products p ON p.name = v.producto AND p.store_id = o.store_id
WHERE NOT EXISTS (SELECT 1 FROM order_items x WHERE x.order_id = o.id);

UPDATE orders o
SET total_amount = (SELECT COALESCE(SUM(subtotal), 0) FROM order_items i WHERE i.order_id = o.id)
WHERE o.code IN ('CP-1001','CP-1002','CP-1003','CP-1004','CP-1005','CP-1006','CP-1007','CP-1008','CP-1009');

-- 7) Calificaciones de los pedidos entregados (algunas con respuesta del local)
INSERT INTO order_reviews (store_rating, comment, store_reply, created_at, order_id, diner_id, store_id)
SELECT v.estrellas, v.comentario, v.respuesta, NOW() - (v.dias || ' days')::interval, o.id, o.diner_id, o.store_id
FROM (VALUES
  ('CP-1001', 5, 'Todo rápido y rico, lo recogí sin hacer cola.', '¡Gracias por tu pedido!',            2),
  ('CP-1002', 4, 'Buen sabor, aunque tardaron un poco en entregarlo.', NULL,                           1),
  ('CP-1003', 5, 'El capuchino estaba perfecto.',                 'Nos alegra que te haya gustado.',   1),
  ('CP-1004', 3, 'Estaba bien, pero la torta llegó algo seca.',   NULL,                                0),
  ('CP-1008', 5, 'Buen menú por el precio.',                      '¡Te esperamos mañana!',             1)
) AS v(code, estrellas, comentario, respuesta, dias)
JOIN orders o ON o.code = v.code
ON CONFLICT (order_id) DO NOTHING;

INSERT INTO product_reviews (rating, comment, order_review_id, product_id)
SELECT v.estrellas, v.comentario, r.id, p.id
FROM (VALUES
  ('CP-1001', 'Sándwich de pollo',  5, 'Muy buena porción.'),
  ('CP-1001', 'Limonada',           4, NULL),
  ('CP-1002', 'Sándwich de jamón',  4, NULL),
  ('CP-1003', 'Capuchino',          5, 'Con buena espuma.'),
  ('CP-1004', 'Torta de zanahoria', 3, 'Algo seca.'),
  ('CP-1008', 'Menú del día',       5, NULL)
) AS v(code, producto, estrellas, comentario)
JOIN orders o ON o.code = v.code
JOIN order_reviews r ON r.order_id = o.id
JOIN products p ON p.name = v.producto AND p.store_id = o.store_id
ON CONFLICT (order_review_id, product_id) DO NOTHING;

COMMIT;
