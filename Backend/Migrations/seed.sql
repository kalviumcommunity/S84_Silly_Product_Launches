-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, user_name, age)
VALUES
('John', 'Doe', 'john.doe@example.com', 'hashed_password1', 'johndoe', 30),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', 'janesmith', 25),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password3', 'alicejohnson', 28);

-- Insert sample posts
INSERT INTO posts (title, content, image_url, tags, created_by)
VALUES
('Post 1', 'Content for post 1', 'image1.jpg', '#tag1,#tag2', 1),
('Post 2', 'Content for post 2', 'image2.jpg', '#tag3,#tag4', 2),
('Post 3', 'Content for post 3', 'image3.jpg', '#tag5,#tag6', 3);