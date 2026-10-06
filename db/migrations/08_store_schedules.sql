CREATE TABLE IF NOT EXISTS store_schedules (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Domingo ... 6=Sábado
    open_time   TIME,
    close_time  TIME,
    is_closed   BOOLEAN NOT NULL DEFAULT 0 CHECK (is_closed IN (0,1)),
    store_id    INTEGER NOT NULL,
    UNIQUE (store_id, day_of_week),
    FOREIGN KEY (store_id) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE CASCADE
);
