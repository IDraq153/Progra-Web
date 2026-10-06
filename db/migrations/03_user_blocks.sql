CREATE TABLE IF NOT EXISTS user_blocks (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    reason             VARCHAR(100) NOT NULL,
    detail             TEXT,
    created            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id            INTEGER NOT NULL, 
    blocked_by_user_id INTEGER NOT NULL, 
    FOREIGN KEY (user_id)            REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (blocked_by_user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
