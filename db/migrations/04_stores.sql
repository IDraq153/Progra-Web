CREATE TABLE IF NOT EXISTS stores (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    commercial_name VARCHAR(60)  NOT NULL,
    ruc             VARCHAR(11)  NOT NULL UNIQUE,
    campus_seat     VARCHAR(50),
    campus_location VARCHAR(100),
    email           VARCHAR(60),
    phone           VARCHAR(15),
    description     TEXT,
    logo_url        VARCHAR(150),
    banner_url      VARCHAR(150),
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    created         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id         INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
