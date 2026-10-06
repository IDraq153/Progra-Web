CREATE TABLE IF NOT EXISTS option_groups (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           VARCHAR(50) NOT NULL,
    selection_type VARCHAR(20) NOT NULL DEFAULT 'single'
                   CHECK (selection_type IN ('single','multiple')),
    is_required    BOOLEAN NOT NULL DEFAULT 0 CHECK (is_required IN (0,1)),
    product_id     INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
