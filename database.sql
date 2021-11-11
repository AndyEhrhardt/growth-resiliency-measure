--name your databse in postico growth-resiliency

CREATE TABLE "district" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" DATE DEFAULT CURRENT_DATE,
	CONSTRAINT "district_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "school" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"district_id" integer NOT NULL,
	"q1" DATE NOT NULL,
	"q2" DATE NOT NULL,
	"q3" DATE NOT NULL,
	"q4" DATE NOT NULL,
	"domain" varchar(255) NOT NULL,
	"created_at" DATE DEFAULT CURRENT_DATE,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "race" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "race_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "demographics" (
	"id" serial NOT NULL,
	"gender_id" integer NOT NULL,
	"iep" BOOLEAN NOT NULL,
	"race_id" integer NOT NULL,
	"hispanic_latino" BOOLEAN NOT NULL,
	"grade" integer NOT NULL,
	CONSTRAINT "demographics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gender" (
	"id" serial NOT NULL,
	"name" varchar(55) NOT NULL,
	CONSTRAINT "gender_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"role_id" integer NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_initial" varchar(255),
	"school_id" integer,
	"demographics_id" integer,
	"active" BOOLEAN NOT NULL DEFAULT 'false',
	"verification_string" varchar(255),
	"email_sent" BOOLEAN NOT NULL DEFAULT 'false',
	"assessment_completed" BOOLEAN NOT NULL DEFAULT 'false',
	"email_verified" BOOLEAN NOT NULL DEFAULT 'false',
	"created_at" DATE DEFAULT CURRENT_DATE,
	"parent_email" varchar(255),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "role" (
	"id" serial NOT NULL,
	"name" varchar(35) NOT NULL,
	CONSTRAINT "role_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "assessments" (
	"id" serial NOT NULL,
	"student_id" integer NOT NULL,
	"entered_by_id" integer NOT NULL,
	"grade" integer NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE,
	"ask_help" integer NOT NULL,
	"confidence_adult" integer NOT NULL,
	"confidence_peer" integer NOT NULL,
	"succeed_pressure" integer NOT NULL,
	"persistence" integer NOT NULL,
	"express_adult" integer NOT NULL,
	"express_peer" integer NOT NULL,
	CONSTRAINT "assessments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "school" ADD CONSTRAINT "school_fk0" FOREIGN KEY ("district_id") REFERENCES "district"("id");


ALTER TABLE "demographics" ADD CONSTRAINT "demographics_fk0" FOREIGN KEY ("gender_id") REFERENCES "gender"("id");
ALTER TABLE "demographics" ADD CONSTRAINT "demographics_fk1" FOREIGN KEY ("race_id") REFERENCES "race"("id");


ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("role_id") REFERENCES "role"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("school_id") REFERENCES "school"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk2" FOREIGN KEY ("demographics_id") REFERENCES "demographics"("id");


ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk0" FOREIGN KEY ("student_id") REFERENCES "user"("id");
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk1" FOREIGN KEY ("entered_by_id") REFERENCES "user"("id");






INSERT INTO "public"."school"("id","name","district_id","q1","q2","q3","q4","domain","created_at")
VALUES
(1,E'a school in dist 2',2,E'2001-01-01',E'2001-01-01',E'2001-01-01',E'2001-01-01',E'na',E'2021-11-10'),
(2,E'another school in dist 2',2,E'2001-01-01',E'2001-01-01',E'2001-01-01',E'2001-01-01',E'na',E'2021-11-10'),
(3,E'this school in dist one',1,E'2001-01-01',E'2001-01-01',E'2001-01-01',E'2001-01-01',E'na',E'2021-11-10'),
(4,E'this school in dist three',3,E'2001-01-01',E'2001-01-01',E'2001-01-01',E'2001-01-01',E'na',E'2021-11-10');


INSERT INTO "public"."district"("id","name","created_at")
VALUES
(1,E'district one',E'2021-11-10'),
(2,E'district 2',E'2021-11-10'),
(3,E'yo its district 3',E'2021-11-10');

INSERT INTO "public"."role"("id","name")
VALUES
(1,E'student'),
(2,E'teacher'),
(3,E'admin');




INSERT INTO "public"."assessments"("id","student_id","entered_by_id","grade","date","ask_help","confidence_adult","confidence_peer","succeed_pressure","persistence","express_adult","express_peer")
VALUES
(1,5,1,4,E'2021-11-09',1,1,1,1,1,1,1),
(2,4,2,2,E'2021-11-09',1,1,1,2,2,3,1),
(3,5,1,4,E'2021-11-09',2,2,2,3,3,3,3),
(4,4,4,6,E'2021-11-09',2,2,2,4,4,5,5);

INSERT INTO "public"."demographics"("id","gender_id","iep","race_id","hispanic_latino")
VALUES
(1,1,FALSE,1,TRUE),
(2,2,TRUE,2,FALSE);

INSERT INTO "public"."gender"("id","name")
VALUES
(1,E'Girl'),
(2,E'Boy'),
(3,E'Transgender'),
(4,E'Not Listed'),
(5,E'Prefer Not To Say');

INSERT INTO "public"."race"("id","name")
VALUES
(1,E'Hispanic'),
(2,E'Asian'),
(3,E'Caucasian'),
(4,E'Black'),
(5,E'Mixed');
