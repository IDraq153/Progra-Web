
import Carrer from './carrer.js';
import User from './user.js';
import Student from './student.js';
import Experience from './experience.js';
import Skill from './skill.js';
import SkillLevel from './skill_level.js';
import StudentsSkillsSkillLevels from './students_skills_skill_level.js';
import Application from './applications.js';
import ApplicationsStudents from './applications_students.js';
import ApplicationsStudentsReviews from './applications_students_review.js';
import StatusApplicationsStudents from './status_applications_students.js';
import StudentsApplicationsSaved from './students_applications_saved.js';
import ApplicationsSkills from './applications_skills.js';
import ApplicationsCarrers from './applications_carrers.js';
import Enterprise from './enterprise.js';
import Link from './link.js';
import Log from './log.js';
import Profile from './profile.js';
import Semester from './semester.js';
import Workday from './workday.js';
import Modality from './modality.js';
import District from './district.js';

// =====================================
// CARRERS
// =====================================

Carrer.hasMany(Student, {
    foreignKey: 'carrere_id',
    as: 'students',
});

Student.belongsTo(Carrer, {
    foreignKey: 'carrere_id',
    as: 'carrer',
});

Carrer.hasMany(ApplicationsCarrers, {
    foreignKey: 'carrer_id',
    as: 'applicationsCarrers',
});

ApplicationsCarrers.belongsTo(Carrer, {
    foreignKey: 'carrer_id',
    as: 'carrer',
});

// =====================================
// USERS
// =====================================

User.hasOne(Student, {
    foreignKey: 'user_id',
    as: 'student',
});

Student.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

User.hasMany(Enterprise, {
    foreignKey: 'user_id',
    as: 'enterprises',
});

Enterprise.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

User.hasMany(Log, {
    foreignKey: 'user_id',
    as: 'logs',
});

Log.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Profile.hasMany(User, {
    foreignKey: 'profile_id',
    as: 'users',
});

User.belongsTo(Profile, {
    foreignKey: 'profile_id',
    as: 'profile',
});

// =====================================
// STUDENTS
// =====================================

Student.hasMany(StudentsSkillsSkillLevels, {
    foreignKey: 'student_id',
    as: 'studentSkills',
});

StudentsSkillsSkillLevels.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student',
});

Student.hasMany(Experience, {
    foreignKey: 'student_id',
    as: 'experiences',
});

Experience.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student',
});

Student.hasMany(ApplicationsStudents, {
    foreignKey: 'student_id',
    as: 'applicationsStudents',
});

ApplicationsStudents.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student',
});

Student.hasMany(StudentsApplicationsSaved, {
    foreignKey: 'student_id',
    as: 'savedApplications',
});

StudentsApplicationsSaved.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student',
});

Student.hasMany(Link, {
    foreignKey: 'student_id',
    as: 'links',
});

Link.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student',
});

// =====================================
// SKILLS
// =====================================

Skill.hasMany(StudentsSkillsSkillLevels, {
    foreignKey: 'skill_id',
    as: 'studentSkills',
});

StudentsSkillsSkillLevels.belongsTo(Skill, {
    foreignKey: 'skill_id',
    as: 'skill',
});

SkillLevel.hasMany(StudentsSkillsSkillLevels, {
    foreignKey: 'skill_level_id',
    as: 'studentSkills',
});

StudentsSkillsSkillLevels.belongsTo(SkillLevel, {
    foreignKey: 'skill_level_id',
    as: 'skillLevel',
});

// Relación muchos a muchos: Students <-> Skills

Student.belongsToMany(Skill, {
    through: StudentsSkillsSkillLevels,
    foreignKey: 'student_id',
    otherKey: 'skill_id',
    as: 'skills',
});

Skill.belongsToMany(Student, {
    through: StudentsSkillsSkillLevels,
    foreignKey: 'skill_id',
    otherKey: 'student_id',
    as: 'students',
});

// =====================================
// SEMESTERS
// =====================================

Semester.hasMany(Student, {
    foreignKey: 'sementer_id',
    as: 'students',
});

Student.belongsTo(Semester, {
    foreignKey: 'sementer_id',
    as: 'semester',
});

Semester.hasMany(Application, {
    foreignKey: 'sementer_id',
    as: 'applications',
});

Application.belongsTo(Semester, {
    foreignKey: 'sementer_id',
    as: 'semester',
});

// =====================================
// ENTERPRISES
// =====================================

Enterprise.hasMany(Application, {
    foreignKey: 'enterprise_id',
    as: 'applications',
});

Application.belongsTo(Enterprise, {
    foreignKey: 'enterprise_id',
    as: 'enterprise',
});

// =====================================
// APPLICATIONS
// =====================================

Application.hasMany(ApplicationsStudents, {
    foreignKey: 'application_id',
    as: 'applicationsStudents',
});

ApplicationsStudents.belongsTo(Application, {
    foreignKey: 'application_id',
    as: 'application',
});

Application.hasMany(StudentsApplicationsSaved, {
    foreignKey: 'application_id',
    as: 'savedByStudents',
});

StudentsApplicationsSaved.belongsTo(Application, {
    foreignKey: 'application_id',
    as: 'application',
});

Application.hasMany(ApplicationsSkills, {
    foreignKey: 'application_id',
    as: 'applicationSkills',
});

ApplicationsSkills.belongsTo(Application, {
    foreignKey: 'application_id',
    as: 'application',
});

Application.hasMany(ApplicationsCarrers, {
    foreignKey: 'application_id',
    as: 'applicationCarrers',
});

ApplicationsCarrers.belongsTo(Application, {
    foreignKey: 'application_id',
    as: 'application',
});

// =====================================
// MANY TO MANY: APPLICATIONS <-> SKILLS
// =====================================

Application.belongsToMany(Skill, {
    through: ApplicationsSkills,
    foreignKey: 'application_id',
    otherKey: 'skill_id',
    as: 'skills',
});

Skill.belongsToMany(Application, {
    through: ApplicationsSkills,
    foreignKey: 'skill_id',
    otherKey: 'application_id',
    as: 'applications',
});

// =====================================
// MANY TO MANY: APPLICATIONS <-> CARRERS
// =====================================

Application.belongsToMany(Carrer, {
    through: ApplicationsCarrers,
    foreignKey: 'application_id',
    otherKey: 'carrer_id',
    as: 'carrers',
});

Carrer.belongsToMany(Application, {
    through: ApplicationsCarrers,
    foreignKey: 'carrer_id',
    otherKey: 'application_id',
    as: 'applications',
});

// =====================================
// MANY TO MANY: STUDENTS <-> APPLICATIONS
// =====================================

Student.belongsToMany(Application, {
    through: ApplicationsStudents,
    foreignKey: 'student_id',
    otherKey: 'application_id',
    as: 'applications',
});

Application.belongsToMany(Student, {
    through: ApplicationsStudents,
    foreignKey: 'application_id',
    otherKey: 'student_id',
    as: 'students',
});

// =====================================
// MANY TO MANY: STUDENTS <-> SAVED APPLICATIONS
// =====================================

Student.belongsToMany(Application, {
    through: StudentsApplicationsSaved,
    foreignKey: 'student_id',
    otherKey: 'application_id',
    as: 'savedApplicationsMany',
});

Application.belongsToMany(Student, {
    through: StudentsApplicationsSaved,
    foreignKey: 'application_id',
    otherKey: 'student_id',
    as: 'studentsWhoSaved',
});

// =====================================
// APPLICATIONS STUDENTS REVIEWS
// =====================================

ApplicationsStudents.hasMany(ApplicationsStudentsReviews, {
    foreignKey: 'applications_students_reviews',
    as: 'reviews',
});

ApplicationsStudentsReviews.belongsTo(ApplicationsStudents, {
    foreignKey: 'applications_students_reviews',
    as: 'applicationStudent',
});

// =====================================
// STATUS APPLICATIONS STUDENTS
// =====================================

StatusApplicationsStudents.hasMany(ApplicationsStudents, {
    foreignKey: 'status_applications_student_id',
    as: 'applicationsStudents',
});

ApplicationsStudents.belongsTo(StatusApplicationsStudents, {
    foreignKey: 'status_applications_student_id',
    as: 'status',
});

// =====================================
// MODALITIES
// =====================================

Modality.hasMany(Application, {
    foreignKey: 'modality_id',
    as: 'applications',
});

Application.belongsTo(Modality, {
    foreignKey: 'modality_id',
    as: 'modality',
});

// =====================================
// DISTRICTS
// =====================================

District.hasMany(Application, {
    foreignKey: 'district_id',
    as: 'applications',
});

Application.belongsTo(District, {
    foreignKey: 'district_id',
    as: 'district',
});

District.hasMany(Student, {
    foreignKey: 'district_id',
    as: 'students',
});

Student.belongsTo(District, {
    foreignKey: 'district_id',
    as: 'district',
});

District.hasMany(Enterprise, {
    foreignKey: 'district_id',
    as: 'enterprises',
});

Enterprise.belongsTo(District, {
    foreignKey: 'district_id',
    as: 'district',
});

// =====================================
// WORKDAYS
// =====================================

Workday.hasMany(Application, {
    foreignKey: 'workday_id',
    as: 'applications',
});

Application.belongsTo(Workday, {
    foreignKey: 'workday_id',
    as: 'workday',
});

export {
    Carrer,
    User,
    Student,
    Experience,
    Skill,
    SkillLevel,
    StudentsSkillsSkillLevels,
    Application,
    ApplicationsStudents,
    ApplicationsStudentsReviews,
    StatusApplicationsStudents,
    StudentsApplicationsSaved,
    ApplicationsSkills,
    ApplicationsCarrers,
    Enterprise,
    Link,
    Log,
    Profile,
    Semester,
    Workday,
    Modality,
    District,
};
