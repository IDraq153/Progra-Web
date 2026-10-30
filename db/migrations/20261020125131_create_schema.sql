-- migrate:up

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carrers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE semesters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE skill_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE status_applications_students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE modalities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE workdays (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    reset_token VARCHAR(100),
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    profile_id INT REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description VARCHAR(100) NOT NULL,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    names VARCHAR(45) NOT NULL,
    last_names VARCHAR(100) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    phone VARCHAR(15),
    district_id INT REFERENCES districts(id) ON DELETE SET NULL,
    picture_url VARCHAR(100),
    summary TEXT,
    carrere_id INT REFERENCES carrers(id) ON DELETE SET NULL,
    sementer_id INT REFERENCES semesters(id) ON DELETE SET NULL,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enterprises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    ruc VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(45) NOT NULL,
    phone VARCHAR(15),
    website_url VARCHAR(100),
    description TEXT,
    address VARCHAR(100),
    picture_url VARCHAR(100),
    district_id INT REFERENCES districts(id) ON DELETE SET NULL,
    sector_id INT,
    size_id INT,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    enterprise VARCHAR(60) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    url VARCHAR(100) NOT NULL,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE students_skills_skill_levels (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    skill_level_id INT NOT NULL REFERENCES skill_levels(id) ON DELETE CASCADE,
    CONSTRAINT unique_student_skill UNIQUE (student_id, skill_id)
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    description TEXT,
    benefits TEXT,
    functions TEXT,
    vacancies INT DEFAULT 1,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published TIMESTAMP WITHOUT TIME ZONE,
    email_notification BOOLEAN DEFAULT FALSE,
    closed TIMESTAMP WITHOUT TIME ZONE,
    salarry DECIMAL(10,2),
    is_draft BOOLEAN DEFAULT TRUE,
    modality_id INT REFERENCES modalities(id) ON DELETE SET NULL,
    sementer_id INT REFERENCES semesters(id) ON DELETE SET NULL,
    district_id INT REFERENCES districts(id) ON DELETE SET NULL,
    workday_id INT REFERENCES workdays(id) ON DELETE SET NULL,
    enterprise_id INT NOT NULL REFERENCES enterprises(id) ON DELETE CASCADE
);

CREATE TABLE applications_skills (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE applications_carrers (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    carrer_id INT NOT NULL REFERENCES carrers(id) ON DELETE CASCADE
);

CREATE TABLE students_applications_saved (
    id SERIAL PRIMARY KEY,
    created DATE DEFAULT CURRENT_DATE,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    CONSTRAINT unique_student_saved_application UNIQUE (student_id, application_id)
);

CREATE TABLE applications_students (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    status_applications_student_id INT REFERENCES status_applications_students(id) ON DELETE SET NULL,
    notes TEXT,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications_students_reviews (
    id SERIAL PRIMARY KEY,
    applications_students_reviews INT REFERENCES applications_students(id) ON DELETE CASCADE,
    points INT CHECK (points BETWEEN 1 AND 5),
    enviroment INT,
    learning INT,
    work_load INT,
    title VARCHAR(50),
    comment TEXT,
    created TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    start TIMESTAMP WITHOUT TIME ZONE,
    end_date TIMESTAMP WITHOUT TIME ZONE,
    anonimous BOOLEAN DEFAULT FALSE
);

-- migrate:down

DROP TABLE IF EXISTS applications_students_reviews CASCADE;
DROP TABLE IF EXISTS applications_students CASCADE;
DROP TABLE IF EXISTS students_applications_saved CASCADE;
DROP TABLE IF EXISTS applications_carrers CASCADE;
DROP TABLE IF EXISTS applications_skills CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS students_skills_skill_levels CASCADE;
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS enterprises CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS logs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workdays CASCADE;
DROP TABLE IF EXISTS modalities CASCADE;
DROP TABLE IF EXISTS status_applications_students CASCADE;
DROP TABLE IF EXISTS skill_levels CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS semesters CASCADE;
DROP TABLE IF EXISTS districts CASCADE;
DROP TABLE IF EXISTS carrers CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;