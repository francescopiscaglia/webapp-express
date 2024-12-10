## Movie table
- id | INT, NOT NULL, AUTO_INCREMENT, PRIMARY KEY
- title | VARCHAR(255), NOT NULL
- director | VARCHAR(255), NOT NULL
- genre | VARCHAR(100), NOT NULL
- abstract | TEXT(500), NOT NULL
- image | VARCHAR(255), NULL
- created_at | DATETIME, NOT NULL
- updated_at | DATETIME, NOT NULL

## Reviews table
- id | INT, NOT NULL, AUTO_INCREMENT, PRIMARY KEY
- movie_id | INT, NOT NULL, FOREIGN KEY
- name | VARCHAR(100), NOT NULL
- vote | INT, NOT NULL
- text | TEXT(500), NOT NULL
- created_at | DATETIME, NOT NULL
- updated_at | DATETIME, NOT NULL