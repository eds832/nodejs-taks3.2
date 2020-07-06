Scripts to run: (npm run build, npm run lintFix, npm run start) or npm run task6

crate DB with an insert in Users table (scripts are at the bottom of the page)

set up Postman headers 
Origin: http://127.0.0.1:8000
Content-Type: application/json

call post in Postman http://localhost:8000/login 
with body {"username": "login1","password": "password1"} to get tokenValue

set up Postman header Authorization: Bearer tokenValue

post user http://localhost:8000/users 
body json: {"login" : "login1", "password" : "password1", "age" : 11}

put user http://localhost:8000/users/userId 
body json: {"login" : "login1", "password" : "password1", "age" : 11, "isDeleted" : false}

get user http://localhost:8000/users 
body json: {"loginSubstring" : "og", "limit" : 2}

post group http://localhost:8000/groups 
body json: {"name" : "a234" , "permissions" :["READ", "WRITE", "SHARE"]}

put group http://localhost:8000/groups/groupId 
body json: {"name" : "a234" , "permissions" :["READ", "WRITE", "SHARE"]}

post add users to group http://localhost:8000/groups/groupId/users 
body json: ["userId1", "userId2"]

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
	id, login, password, age, "isDeleted") 						-- password1 encripted by bcrypt
	VALUES ('244d4868-0c3a-4b87-9fea-72f4a0c66932', 'login1', '$2a$10$ymg3HD3VCTHAQU0J9E232.d2JuEHPqOqDXBpaBBxmOjeUxIaYmcli', 11, false);
	
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
