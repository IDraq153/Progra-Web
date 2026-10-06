CREATE TABLE IF NOT EXISTS products (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    name               VARCHAR(60) NOT NULL,
    description        TEXT,
    price              DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    picture_url        VARCHAR(150),
    prep_time_minutes  INTEGER CHECK (prep_time_minutes >= 0),
    status             VARCHAR(20) NOT NULL DEFAULT 'available',
    category_id        INTEGER,
    store_id           INTEGER NOT NULL,
    created            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (store_id)    REFERENCES stores(id)     ON UPDATE CASCADE ON DELETE CASCADE
);
