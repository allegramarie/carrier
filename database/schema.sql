DROP DATABASE IF EXISTS mail;

CREATE DATABASE mail;

\c mail;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email varchar(100) NOT NULL,
password varchar(50) NOT NULL,
UNIQUE (EMAIL)
);

CREATE TABLE campaigns (
id SERIAL PRIMARY KEY,
name varchar(500) NOT NULL,
status varchar(100) NOT NULL,
templateURL varchar(1000) NOT NULL,
subject varchar(500) NOT NULL,
content varchar(500) NOT NULL,
userID integer REFERENCES users(id)
);

CREATE TABLE contacts (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL,
email varchar(100) NOT NULL
);

CREATE TABLE campaignContacts (
id SERIAL PRIMARY KEY,
campaignID integer REFERENCES campaigns(id),
contactID integer REFERENCES contacts(id)
)

-- setting up postgreSQL:
-- start postgres: pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
-- create database: CREATE DATABASE databasename;
-- reference for psql: http://postgresguide.com/utilities/psql.html
-- to import schema, run psql -f schema.sql
-- run 'psql articlesDB' to run psql with the database
--run \list to see all databases
-- stop postgres: pg_ctl -D /usr/local/var/postgres stop && brew services stop postgresql
-- more commands: https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546



-- DROP DATABASE IF EXISTS mail;
--
-- CREATE DATABASE mail;
--
-- \c newsletterDB;
--
-- CREATE TABLE users (
-- id SERIAL PRIMARY KEY,
-- email varchar(100) NOT NULL,
-- password varchar(50) NOT NULL,
-- UNIQUE (EMAIL)
-- );
--
-- CREATE TABLE campaigns (
-- id SERIAL PRIMARY KEY,
-- name varchar(500) NOT NULL,
-- subject varchar(500) NOT NULL,
-- fromID varchar(100) NOT NULL ,
-- content varchar(500) NOT NULL
-- );
--
-- CREATE TABLE contacts (
-- id SERIAL PRIMARY KEY,
-- name varchar(100) NOT NULL,
-- email varchar(100) NOT NULL,
-- UNIQUE (EMAIL)
-- )
