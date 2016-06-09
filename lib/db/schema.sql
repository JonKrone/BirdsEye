/* TODO: How to store general notes? */

/*
	Serial primary keys are more transparent and susceptible to attacks.
	A more secure indexing system could use UUIDs.
*/

CREATE TABLE IF NOT EXISTS users(
	user_id integer PRIMARY KEY,
	username text UNIQUE NOT NULL,
	pass_hash varchar(246) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS customers(
	customer_id integer PRIMARY KEY,
	name text NOT NULL,
	email text UNIQUE NOT NULL,
	phone integer,
	aspirations text[]
);

CREATE TABLE IF NOT EXISTS homes(
	home_id integer PRIMARY KEY,
	address text, /* unique? */
	sqft integer,
	stories integer,
	bath_count integer,
	bedroom_count integer,
	HV_type text,
	HV_install_date date,
	AC_type text,
	AC_install_date date
);

/*
*		I imagine a many:many customer:home relationship.
* 		- Homes may change owners
*			- Different members of the same home may comission consultations
*/
CREATE TABLE IF NOT EXISTS customer_homes(
	home_id integer REFERENCES homes,
	customer_id integer REFERENCES customers
);

CREATE TABLE IF NOT EXISTS rooms(
	room_id integer PRIMARY KEY,
	type text,
	sqft integer,
	window_count integer DEFAULT 0, /* for ease of entry, or no? */
	story integer,
	home_id integer REFERENCES homes
);

/* store photos locally or submit to aws/imgur/etc? */
CREATE TABLE IF NOT EXISTS images(
	image_id integer PRIMARY KEY,
	image_url text NOT NULL,
	customer_id integer REFERENCES customers NOT NULL,
	home_id integer REFERENCES homes,
	room_id integer REFERENCES rooms
);
