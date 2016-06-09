/*
	Serial primary keys are more transparent and susceptible to attacks.
	A more secure indexing system could use UUIDs.

	http://www.starkandwayne.com/blog/uuid-primary-keys-in-postgresql/
*/

CREATE TABLE IF NOT EXISTS users(
	user_id SERIAL PRIMARY KEY,
	username text UNIQUE NOT NULL,
	pass_hash varchar(246) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS customers(
	customer_id SERIAL PRIMARY KEY,
	name text NOT NULL check(char_length(name) > 0),
	email text UNIQUE NOT NULL check(char_length(email) > 0),
	phone text,
	notes text[]
);

CREATE TABLE IF NOT EXISTS homes(
	home_id SERIAL PRIMARY KEY,
	address text, /* unique? */
	sqft integer,
	stories integer,
	bath_count integer,
	bedroom_count integer,
	heater_type text,
	heater_install_date text,
	ac_type text,
	ac_install_date text
);

/*
*		I imagine a many:many customer:home relationship.
* 		- Homes may change owners
*			- Different members of the same home may comission consultations
*/
CREATE TABLE IF NOT EXISTS customers_homes(
	home_id integer REFERENCES homes ON DELETE CASCADE,
	customer_id integer REFERENCES customers ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rooms(
	room_id SERIAL PRIMARY KEY,
	type text,
	sqft integer,
	window_count integer DEFAULT 0, /* for ease of entry, or no? */
	story integer,
	home_id integer REFERENCES homes ON DELETE SET NULL
);

/* store photos locally or submit to aws/imgur/etc? */
CREATE TABLE IF NOT EXISTS images(
	image_id SERIAL PRIMARY KEY,
	image_url text NOT NULL,
	customer_id integer REFERENCES customers ON DELETE SET NULL,
	home_id integer REFERENCES homes ON DELETE SET NULL,
	room_id integer REFERENCES rooms ON DELETE SET NULL
);
