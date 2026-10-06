CREATE TABLE IF NOT EXISTS order_item_options (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    option_name       VARCHAR(50) NOT NULL,      -- copia histórica
    additional_price  DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (additional_price >= 0),
    order_item_id     INTEGER NOT NULL,
    product_option_id INTEGER,
    FOREIGN KEY (order_item_id)     REFERENCES order_items(id)     ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_option_id) REFERENCES product_options(id) ON UPDATE CASCADE ON DELETE SET NULL
);
