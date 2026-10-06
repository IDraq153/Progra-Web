CREATE TABLE IF NOT EXISTS product_options (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             VARCHAR(50) NOT NULL,
    additional_price DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (additional_price >= 0),
    option_group_id  INTEGER NOT NULL,
    FOREIGN KEY (option_group_id) REFERENCES option_groups(id) ON UPDATE CASCADE ON DELETE CASCADE
);
