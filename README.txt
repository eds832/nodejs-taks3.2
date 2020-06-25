Scripts to run: (npm run build, npm run lintFix, npm run start) or npm run task3.2

URL to test in Postman: http://localhost:8000/users

post body json: {"login" : "login1", "password" : "password1", "age" : 11}
put body json: {"login" : "login1", "password" : "password1", "age" : 11, "isDeleted" : false}
get body json: {"loginSubstring" : "og", "limit" : 2}


Scripts to create DB:

CREATE DATABASE usersdb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
CREATE TABLE public."Users"
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    login character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to postgres;
	
INSERT INTO public."Users"(
	id, login, password, age, "isDeleted")
	VALUES (?, ?, ?, ?, ?);