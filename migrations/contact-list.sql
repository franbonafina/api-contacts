-- Script para crear la base de datos 'contact-list.db' con las tablas Person, Phone, PhoneType y Address

-- Crear la tabla Person
CREATE TABLE IF NOT EXISTS Person (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    dateOfBirth TEXT,
    email TEXT NOT NULL
);

-- Crear la tabla PhoneType
CREATE TABLE IF NOT EXISTS PhoneType (
    id INTEGER PRIMARY KEY,
    typeName TEXT UNIQUE NOT NULL CHECK (typeName IN ('LANDLINE', 'MOBILE'))
);

-- Insertar valores iniciales en la tabla PhoneType
INSERT OR IGNORE INTO PhoneType (id, typeName) VALUES (1, 'LANDLINE');
INSERT OR IGNORE INTO PhoneType (id, typeName) VALUES (2, 'MOBILE');

-- Crear la tabla Phone
CREATE TABLE IF NOT EXISTS Phone (
    id INTEGER PRIMARY KEY,
    number TEXT NOT NULL,
    personId INTEGER NOT NULL,
    phoneTypeId INTEGER NOT NULL,
    UNIQUE (number, phoneTypeId),
    FOREIGN KEY (personId) REFERENCES Person(id),
    FOREIGN KEY (phoneTypeId) REFERENCES PhoneType(id)
);

-- Crear la tabla Address
CREATE TABLE IF NOT EXISTS Address (
    id INTEGER PRIMARY KEY,
    personId INTEGER NOT NULL,
    locality TEXT NOT NULL,
    street TEXT NOT NULL,
    number INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (personId) REFERENCES Person(id)
);

-- Insertar valores de ejemplo en la tabla Person
INSERT OR IGNORE INTO Person (id, firstName, lastName, dateOfBirth, email) VALUES (1, 'Alice', 'Smith', '1985-05-15', 'alice.smith@example.com');

-- Insertar valores de ejemplo en la tabla Address
INSERT OR IGNORE INTO Address (id, personId, locality, street, number, notes) VALUES (1, 1, 'Ciudad Autónoma de Buenos Aires', 'Avenida de Mayo', 1234, 'Departamento 1A');
INSERT OR IGNORE INTO Address (id, personId, locality, street, number, notes) VALUES (2, 1, 'La Plata', 'Calle Falsa', 123, NULL);

-- Insertar valores de ejemplo en la tabla Phone
INSERT OR IGNORE INTO Phone (id, number, personId, phoneTypeId) VALUES (1, '123-456-7890', 1, 1);
INSERT OR IGNORE INTO Phone (id, number, personId, phoneTypeId) VALUES (2, '098-765-4321', 1, 2);

-- Mostrar la información de ejemplo
SELECT p.firstName, p.lastName, a.locality, a.street, a.number, a.notes, ph.number AS phoneNumber, pt.typeName AS phoneType
FROM Person p
JOIN Address a ON p.id = a.personId
JOIN Phone ph ON p.id = ph.personId
JOIN PhoneType pt ON ph.phoneTypeId = pt.id;
