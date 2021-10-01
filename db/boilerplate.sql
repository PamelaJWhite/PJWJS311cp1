-- sql commands to create table
CREATE TABLE stories (
    -- it's an integer, must have an id, it adds the next id incrementally, automatically
    id INT NOT NULL AUTO_INCREMENT,
    -- variable length string up to 100 characters, must have a title, must be a title different from all others
    title VARCHAR(100) NOT NULL UNIQUE,
    -- variable length string up to 10,000 chracters, it's optional (but it'll be a really boring story without it)
    content VARCHAR(10000),
    -- identifies the id as the primary key
    PRIMARY KEY (id)
) ENGINE=InnoDB;