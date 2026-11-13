-- migrate:up
-- Asigna el perfil "Student" (id 2) a todos los usuarios que son estudiantes
UPDATE users
SET profile_id = (SELECT id FROM profiles WHERE name = 'Student'),
    updated = NOW()
WHERE id IN (SELECT user_id FROM students WHERE user_id IS NOT NULL);

-- migrate:down
UPDATE users
SET profile_id = NULL,
    updated = NOW()
WHERE id IN (SELECT user_id FROM students WHERE user_id IS NOT NULL);
