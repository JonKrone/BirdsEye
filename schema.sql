CREATE SCHEMA BirdsEye

CREATE TABLE IF NOT EXISTS BirdsEye.users(
	user_id integer PRIMARY KEY,
	username varchar(50) UNIQUE NOT NULL,
	pass_hash varchar(246) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS BirdsEye.customers(
	customer_id PRIMARY KEY,
	name varchar(50) NOT NULL,
	phone integer,
	aspirations text[]
);