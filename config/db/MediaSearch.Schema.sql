DROP DATABASE IF EXISTS media_search_db;
CREATE database media_search_db;

USE media_search_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	user_email varchar(255) NOT NULL,
	user_password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE media 
(
	id int NOT NULL AUTO_INCREMENT,
	media_name varchar(255) NOT NULL,
	media_type varchar(255) NOT NULL,
	media_artist varchar(255) NOT NULL,
	media_location varchar(255) NOT NULL,
	media_rating int NOT NULL,
	user_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
