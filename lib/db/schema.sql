/*
	Serial primary keys are more transparent and susceptible to attacks.
	A more secure indexing system could use UUIDs.

	http://www.starkandwayne.com/blog/uuid-primary-keys-in-postgresql/
*/

CREATE TABLE IF NOT EXISTS customers(
	customer_id serial PRIMARY KEY,
	name text NOT NULL check(char_length(name) > 0),
	email text UNIQUE NOT NULL check(char_length(email) > 0),
	phone text
	/* For ease of programming, I have created a new table for notes.
		The table could overflow its bounds but I don't have internet right now
		and am short on time to figure out postgres array operations.
	notes text[] */
);

CREATE TABLE IF NOT EXISTS homes(
	home_id serial PRIMARY KEY,
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
	room_id serial PRIMARY KEY,
	type text,
	sqft integer,
	windows integer DEFAULT 0, /* for ease of entry, or no? */
	story integer,
	home_id integer REFERENCES homes ON DELETE SET NULL
);

/* We store photos via aws S3 buckets and store the url here. */
CREATE TABLE IF NOT EXISTS images(
	image_id serial PRIMARY KEY,
	image_url text NOT NULL,
	customer_id integer REFERENCES customers ON DELETE SET NULL,
	home_id integer REFERENCES homes ON DELETE SET NULL,
	room_id integer REFERENCES rooms ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notes(
	note_id serial PRIMARY KEY,
	content text NOT NULL,
	author text, /* user_id of consultant from Auth0 db */
	customer_id integer REFERENCES customers ON DELETE SET NULL,
	home_id integer REFERENCES homes ON DELETE SET NULL,
	room_id integer REFERENCES rooms ON DELETE SET NULL
);