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

CREATE TABLE IF NOT EXISTS BirdsEye.homes(
	home_id PRIMARY KEY,
	address varchar(150), /* unique? */
	sqft integer,
	stories integer,
	bath_count integer,
	bedroom_count integer,
	HV_type varchar(50),
	HV_install_date date,
	AC_type varchar(50),
	AC_install_date date,
);

/*
*		I imagine a many:many customer:home relationship.
* 		- Homes may change owners
*			- Different members of the same home may comission consultations
*/
CREATE TABLE IF NOT EXISTS BirdsEye.customer_homes(
	FOREIGN KEY home_id REFERENCES BirdsEye.homes,
	FOREIGN KEY customer_id REFERENCES BirdsEye.customers
);

CREATE TABLE IF NOT EXISTS BirdsEye.rooms(
	room_id PRIMARY KEY,
	type varchar(50),
	sqft integer,
	window_count integer DEFAULT 0,
	story integer,
	FOREIGN KEY home_id REFERENCES BirdsEye.homes NOT NULL
);

/* store photos locally or submit to aws/imgur/etc? */
CREATE TABLE IF NOT EXISTS BirdsEye.images(
	image_id PRIMARY KEY,
	image_url NOT NULL,
	FOREIGN KEY customer_id REFERENCES BirdsEye.customers NOT NULL,
	FOREIGN KEY home_id REFERENCES BirdsEye.homes,
	FOREIGN KEY room_id RFERENCES BirdsEye.rooms, 
);