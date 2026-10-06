CREATE TABLE IF NOT EXISTS product_reviews (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment         TEXT,
    created         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_review_id INTEGER NOT NULL,
    product_id      INTEGER NOT NULL,
    UNIQUE (order_review_id, product_id),
    FOREIGN KEY (order_review_id) REFERENCES order_reviews(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id)      REFERENCES products(id)      ON UPDATE CASCADE ON DELETE CASCADE
);
