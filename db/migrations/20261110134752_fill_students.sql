-- migrate:up
INSERT INTO students (
    names,
    last_names,
    email,
    phone,
    district_id,
    picture_url,
    summary,
    carrere_id,
    sementer_id,
    user_id,
    created,
    updated
)
VALUES
(
    'Dario',
    'Rua Perez',
    'dario.rua@gmail.com',
    '987654321',
    1,
    'https://example.com/dario.jpg',
    'Estudiante de Ingeniería de Sistemas interesado en desarrollo de software y ciberseguridad.',
    1,
    1,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Carlos',
    'Mendoza Lopez',
    'carlos.mendoza@gmail.com',
    '987654322',
    2,
    'https://example.com/carlos.jpg',
    'Estudiante interesado en programación y desarrollo web.',
    1,
    2,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Andrea',
    'Fernandez Torres',
    'andrea.fernandez@gmail.com',
    '987654323',
    3,
    'https://example.com/andrea.jpg',
    'Estudiante con interés en análisis de datos y tecnología.',
    2,
    3,
    3,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Luis',
    'Garcia Ramirez',
    'luis.garcia@gmail.com',
    '987654324',
    1,
    'https://example.com/luis.jpg',
    'Estudiante interesado en computación en la nube y DevOps.',
    1,
    4,
    4,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Maria',
    'Castillo Vega',
    'maria.castillo@gmail.com',
    '987654325',
    2,
    'https://example.com/maria.jpg',
    'Estudiante interesada en inteligencia artificial y desarrollo de software.',
    2,
    2,
    5,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- migrate:down

