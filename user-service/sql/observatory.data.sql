CREATE DOMAIN dm_username VARCHAR(255);	

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY NOT NULL,
	user_name dm_username NOT NULL,
	user_email dm_username UNIQUE NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_username dm_username UNIQUE NOT NULL,
	user_birthday DATE,
	created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
	updated_at timestamp with time zone
);

INSERT INTO users (user_name, user_email, user_password, user_username, user_birthday)
VALUES ('Test User', 'test@example.com', 'password123', 'testuser', '1995-08-29');