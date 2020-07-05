Scripts to run: (npm run build, npm run lintFix, npm run start) or npm run task5

URL to test in Postman: http://localhost:8000/users, http://localhost:8000/groups, http://localhost:8000/groups/groupId/users

post user body json: {"login" : "login1", "password" : "password1", "age" : 11}
put user body json: {"login" : "login1", "password" : "password1", "age" : 11, "isDeleted" : false}
get user body json: {"loginSubstring" : "og", "limit" : 2}
post/put group json: {"name" : "a234" , "permissions" :["READ", "WRITE", "SHARE"]}
post users group body json: ["userId1", "userId2"]

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
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    permissions character varying(255)[] COLLATE pg_catalog."default",
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
	
CREATE TABLE public."UserGroups"
(
    group_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "UserGroups_pkey" PRIMARY KEY (group_id, user_id),
    CONSTRAINT "UserGroups_group_id_fkey" FOREIGN KEY (group_id)
        REFERENCES public."Groups" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "UserGroups_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."UserGroups"
    OWNER to postgres;