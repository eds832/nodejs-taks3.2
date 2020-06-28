Scripts to run: (npm run build, npm run lintFix, npm run start) or npm run task4.1

URL to test in Postman: http://localhost:8000/users, http://localhost:8000/groups

post body json: {"login" : "login1", "password" : "password1", "age" : 11}
put body json: {"login" : "login1", "password" : "password1", "age" : 11, "isDeleted" : false}
get body json: {"loginSubstring" : "og", "limit" : 2}
post/put group json: {"name" : "a234" , "permissions" :["READ", "WRITE", "SHARE"]}

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
	
CREATE TABLE public."Groups"
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    permissions character varying[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Groups_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Groups"
    OWNER to postgres;

INSERT INTO public."Groups"(
	id, name, permissions)
	VALUES (?, ?, ?);