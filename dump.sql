--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "movie-buster";
--
-- Name: movie-buster; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "movie-buster" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'es_SV.UTF-8' LC_CTYPE = 'es_SV.UTF-8';


ALTER DATABASE "movie-buster" OWNER TO postgres;

\connect -reuse-previous=on "dbname='movie-buster'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: access_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.access_token (
    jti character varying NOT NULL,
    "userId" character varying NOT NULL
);


ALTER TABLE public.access_token OWNER TO postgres;

--
-- Name: like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."like" (
    "movieMovieId" uuid NOT NULL,
    "userUserId" uuid NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    "movieId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(500) NOT NULL,
    poster character varying NOT NULL,
    trailer character varying NOT NULL,
    "rentPrice" integer NOT NULL,
    "salePrice" integer NOT NULL,
    stock integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- Name: movie_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_tag (
    "movieMovieId" uuid NOT NULL,
    "tagTagId" uuid NOT NULL
);


ALTER TABLE public.movie_tag OWNER TO postgres;

--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    "orderId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "boughtAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "movieMovieId" uuid
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: rent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rent (
    "rentId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "rentedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    "userUserId" uuid,
    "movieMovieId" uuid
);


ALTER TABLE public.rent OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    "rolId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    "tagId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "userId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying(50) NOT NULL,
    "roleRolId" uuid
);


ALTER TABLE public."user" OWNER TO postgres;



--
-- Name: rent PK_1d46ea7203310bfcc41c9994453; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "PK_1d46ea7203310bfcc41c9994453" PRIMARY KEY ("rentId");


--
-- Name: tag PK_42bce6149e744e5cb7b11893348; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_42bce6149e744e5cb7b11893348" PRIMARY KEY ("tagId");


--
-- Name: like PK_93947e19dc88a6ecce317c33625; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "PK_93947e19dc88a6ecce317c33625" PRIMARY KEY ("movieMovieId", "userUserId");


--
-- Name: movie PK_9fb5b27579ee465fa6c03dc09c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_9fb5b27579ee465fa6c03dc09c9" PRIMARY KEY ("movieId");


--
-- Name: movie_tag PK_aed6db96789566cbdc35e8972c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tag
    ADD CONSTRAINT "PK_aed6db96789566cbdc35e8972c5" PRIMARY KEY ("movieMovieId", "tagTagId");


--
-- Name: order PK_b075313d4d7e1c12f1a6e6359e8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8" PRIMARY KEY ("orderId");


--
-- Name: user PK_d72ea127f30e21753c9e229891e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId");


--
-- Name: access_token PK_ecbe87968344b067e9fa45e99fd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.access_token
    ADD CONSTRAINT "PK_ecbe87968344b067e9fa45e99fd" PRIMARY KEY (jti);


--
-- Name: role PK_eeeee89d34f0b0c3395c37250f4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_eeeee89d34f0b0c3395c37250f4" PRIMARY KEY ("rolId");


--
-- Name: movie UQ_a81090ad0ceb645f30f9399c347; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE (title);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_0a945966650cf5915f465feebe; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0a945966650cf5915f465feebe" ON public."like" USING btree ("movieMovieId");


--
-- Name: IDX_7b9102a03ddfd3c6bf128ca0e4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7b9102a03ddfd3c6bf128ca0e4" ON public.movie_tag USING btree ("tagTagId");


--
-- Name: IDX_949106b950ef89a41d4ef0f740; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_949106b950ef89a41d4ef0f740" ON public.movie_tag USING btree ("movieMovieId");


--
-- Name: IDX_9c8d745f61e58ab9be5f5bf44f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_9c8d745f61e58ab9be5f5bf44f" ON public."like" USING btree ("userUserId");


--
-- Name: like FK_0a945966650cf5915f465feebea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "FK_0a945966650cf5915f465feebea" FOREIGN KEY ("movieMovieId") REFERENCES public.movie("movieId") ON DELETE CASCADE;


--
-- Name: order FK_162f50c92d885425c3723a29db1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_162f50c92d885425c3723a29db1" FOREIGN KEY ("movieMovieId") REFERENCES public.movie("movieId");


--
-- Name: rent FK_1e67b965585bd11e6d796ad97ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "FK_1e67b965585bd11e6d796ad97ec" FOREIGN KEY ("movieMovieId") REFERENCES public.movie("movieId");


--
-- Name: user FK_60cfbb7e62f21dc1df3d38a865f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_60cfbb7e62f21dc1df3d38a865f" FOREIGN KEY ("roleRolId") REFERENCES public.role("rolId");


--
-- Name: movie_tag FK_7b9102a03ddfd3c6bf128ca0e42; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tag
    ADD CONSTRAINT "FK_7b9102a03ddfd3c6bf128ca0e42" FOREIGN KEY ("tagTagId") REFERENCES public.tag("tagId") ON DELETE CASCADE;


--
-- Name: movie_tag FK_949106b950ef89a41d4ef0f740e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_tag
    ADD CONSTRAINT "FK_949106b950ef89a41d4ef0f740e" FOREIGN KEY ("movieMovieId") REFERENCES public.movie("movieId") ON DELETE CASCADE;


--
-- Name: like FK_9c8d745f61e58ab9be5f5bf44f4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "FK_9c8d745f61e58ab9be5f5bf44f4" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId") ON DELETE CASCADE;


--
-- Name: rent FK_dd000aed0b6673f48ba52744511; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent
    ADD CONSTRAINT "FK_dd000aed0b6673f48ba52744511" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId");


--
-- Name: order FK_f2118217784d0e73e2b050bd564; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_f2118217784d0e73e2b050bd564" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId");


--
-- PostgreSQL database dump complete
--

