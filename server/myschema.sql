-- Create Users table with an email field
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, -- Adding an email field
  profile_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modified UserAuth table without redundant username
CREATE TABLE UserAuth (
  user_id INT PRIMARY KEY,
  password_hash VARCHAR(512) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Topics table
CREATE TABLE Topics (
  topic_id SERIAL PRIMARY KEY,
  topic_name VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Create Sets table
CREATE TABLE Sets (
  set_id SERIAL PRIMARY KEY,
  set_name VARCHAR(255) NOT NULL,
  topic_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES Topics(topic_id) ON DELETE CASCADE
);

-- Create Fields table
CREATE TABLE Fields (
  field_id SERIAL PRIMARY KEY,
  field_name VARCHAR(255) NOT NULL,
  field_type VARCHAR(255) NOT NULL,
  set_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (set_id) REFERENCES Sets(set_id) ON DELETE CASCADE
);

-- Create Words table
CREATE TABLE Words (
  word_id SERIAL PRIMARY KEY,
  word_name VARCHAR(255) NOT NULL,
  set_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (set_id) REFERENCES Sets(set_id) ON DELETE CASCADE
);

-- Create FieldData table
CREATE TABLE FieldData (
  word_id INT NOT NULL,
  field_id INT NOT NULL,
  field_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (word_id) REFERENCES Words(word_id) ON DELETE CASCADE,
  FOREIGN KEY (field_id) REFERENCES Fields(field_id) ON DELETE CASCADE
);

