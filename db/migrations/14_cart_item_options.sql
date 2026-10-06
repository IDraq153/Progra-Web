CREATE TABLE IF NOT EXISTS cart_item_options (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_item_id      INTEGER NOT NULL,
    product_option_id INTEGER NOT NULL,
    FOREIGN KEY (cart_item_id)      REFERENCES cart_items(id)      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_option_id) REFERENCES product_options(id) ON UPDATE CASCADE ON DELETE CASCADE
);
