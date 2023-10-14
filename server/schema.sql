-- Create Users table
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  profile_name VARCHAR(255) NOT NULL
);

-- Create Topics table
CREATE TABLE Topics (
  topic_id SERIAL PRIMARY KEY,
  topic_name VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Sets table
CREATE TABLE Sets (
  set_id SERIAL PRIMARY KEY,
  set_name VARCHAR(255) NOT NULL,
  topic_id INT NOT NULL,
  FOREIGN KEY (topic_id) REFERENCES Topics(topic_id)
);

-- Create Fields table
CREATE TABLE Fields (
  field_id SERIAL PRIMARY KEY,
  field_name VARCHAR(255) NOT NULL,
  field_type VARCHAR(255) NOT NULL,
  set_id INT NOT NULL,
  FOREIGN KEY (set_id) REFERENCES Sets(set_id)
);

-- Create Words table
CREATE TABLE Words (
  word_id SERIAL PRIMARY KEY,
  word_name VARCHAR(255) NOT NULL,
  set_id INT NOT NULL,
  FOREIGN KEY (set_id) REFERENCES Sets(set_id)
);

-- Create FieldData table
CREATE TABLE FieldData (
  word_id INT NOT NULL,
  field_id INT NOT NULL,
  field_value TEXT,
  FOREIGN KEY (word_id) REFERENCES Words(word_id),
  FOREIGN KEY (field_id) REFERENCES Fields(field_id)
);
