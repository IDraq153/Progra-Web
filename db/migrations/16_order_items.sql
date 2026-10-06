CREATE TABLE IF NOT EXISTS order_items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(60) NOT NULL,           -- copia histórica del nombre
    unit_price   DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    quantity     INTEGER NOT NULL CHECK (quantity > 0),
    subtotal     DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    notes        VARCHAR(120),
    order_id     INTEGER NOT NULL,
    product_id   INTEGER,
    FOREIGN KEY (order_id)   REFERENCES orders(id)   ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE SET NULL
);
