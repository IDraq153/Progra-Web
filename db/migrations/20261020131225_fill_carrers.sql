-- migrate:up

INSERT INTO carrers (id, name) VALUES
    (1, 'Ingeniería de Sistemas'),
    (2, 'Ingeniería Software'),
    (3, 'Administración de Empresas'),
    (4, 'Contabilidad y Finanzas'),
    (5, 'Medicina Humana'),
    (6, 'Derecho'),
    (7, 'Psicología'),
    (8, 'Ingeniería Industrial'),
    (9, 'Arquitectura'),
    (10, 'Marketing y Publicidad');

-- migrate:down

DELETE FROM carrers;