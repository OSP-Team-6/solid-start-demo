create table users(id SERIAL PRIMARY KEY, name VARCHAR(100), password VARCHAR(100), email VARCHAR(100));
INSERT INTO users(name, password, email) VALUES ('ryan', '123', 'ryan@example.com');
