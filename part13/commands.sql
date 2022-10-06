CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(50),
  url VARCHAR(200) NOT NULL,
  title VARCHAR(50) NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Noriel', 'https://github.com/G0maa', 'Github Acc');

INSERT INTO blogs (url, title) VALUES ('https://fullstackopen.com/', 'FSO22');
