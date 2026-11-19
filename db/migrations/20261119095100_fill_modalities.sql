-- migrate:up

INSERT INTO modalities (id, name) VALUES
    (1, 'Presencial'),
    (2, 'Remoto'),
    (3, 'Híbrido');

SELECT setval(
    pg_get_serial_sequence('modalities', 'id'),
    (SELECT MAX(id) FROM modalities)
);

-- migrate:down

DELETE FROM modalities WHERE id IN (1, 2, 3);
