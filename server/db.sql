
DROP TABLE IF EXISTS public.user CASCADE;
DROP TABLE IF EXISTS public.contact CASCADE;
DROP TABLE IF EXISTS public.message CASCADE;

CREATE TABLE public.user (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  user_name VARCHAR(100)

);

CREATE TABLE public.contact (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  contact_id VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  user_id VARCHAR(100) NOT NULL ,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public.user(id),
  CONSTRAINT unique_contact UNIQUE (contact_id, user_id)
);

CREATE TABLE public.message (
  id VARCHAR(100) NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id VARCHAR(100) NOT NULL,
  contact_id VARCHAR(100) NOT NULL,
  sent_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public.user(id),
  CONSTRAINT fk_contact FOREIGN KEY(contact_id, user_id) REFERENCES public.contact(contact_id, user_id)
);