CREATE TABLE IF NOT EXISTS orders (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    code             VARCHAR(10) NOT NULL UNIQUE,
    pickup_date      DATE NOT NULL,
    pickup_time      TIME NOT NULL,
    subtotal         DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    total_amount     DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    rejection_reason VARCHAR(160),
    created          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diner_id         INTEGER NOT NULL,
    store_id         INTEGER NOT NULL,
    status_id        INTEGER NOT NULL,
    FOREIGN KEY (diner_id)  REFERENCES diners(id)         ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (store_id)  REFERENCES stores(id)         ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (status_id) REFERENCES order_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
