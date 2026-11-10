-- migrate:up
INSERT INTO districts (id, name) VALUES
(1, 'Miraflores'),
(2, 'San Isidro'),
(3, 'Santiago de Surco'),
(4, 'La Molina'),
(5, 'San Borja');

INSERT INTO semesters (id, name) VALUES
(1, '2025-2'),
(2, '2026-0'),
(3, '2026-1'),
(4, '2026-2');

INSERT INTO profiles (id, name,created, updated) VALUES
(1, 'Admin', NOW(), NOW()),
(2, 'Student', NOW(), NOW()),
(3, 'Enterprise', NOW(), NOW()),
(4, 'Guest', NOW(), NOW()),
(5, 'Moderator', NOW(), NOW());


CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (
    id,
    email,
    password,
    reset_token,
    created,
    updated,
    profile_id
) VALUES
(1, 'user01@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(2, 'user02@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(3, 'user03@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(4, 'user04@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(5, 'user05@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(6, 'user06@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(7, 'user07@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(8, 'user08@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(9, 'user09@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(10, 'user10@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(11, 'user11@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(12, 'user12@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(13, 'user13@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(14, 'user14@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(15, 'user15@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(16, 'user16@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(17, 'user17@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(18, 'user18@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(19, 'user19@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(20, 'user20@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(21, 'user21@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(22, 'user22@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(23, 'user23@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(24, 'user24@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(25, 'user25@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(26, 'user26@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(27, 'user27@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(28, 'user28@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(29, 'user29@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL),
(30, 'user30@gmail.com', crypt('Demo123!', gen_salt('bf')), NULL, NOW(), NOW(), NULL);

SELECT setval('districts_id_seq', (SELECT MAX(id) FROM districts));
SELECT setval('semesters_id_seq', (SELECT MAX(id) FROM semesters));
SELECT setval('profiles_id_seq', (SELECT MAX(id) FROM profiles));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- migrate:down

DELETE FROM users
WHERE id BETWEEN 1 AND 30;

DELETE FROM semesters
WHERE id BETWEEN 1 AND 4;

DELETE FROM districts
WHERE id BETWEEN 1 AND 5;

DELETE FROM profiles
WHERE id BETWEEN 1 AND 5;