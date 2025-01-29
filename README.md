# S84_Silly_Product_Launches
ASAP (As silly as possible) Project for Semester 2 

***Project Title*** - **'New product launches'**


**Project Overview**

This web app will contain the information about the latest and new products that got launched in the market but in a unique way it will be having the information of the newly launched products that were not upto the mark and did not meet the user expectations. It will allow users to vote and give their opinions on the various products just like a social media platform where we like and comment on others' posts.
The idea behind this project is to create a community-driven opinion where people can share their experiences with the new products and rank them accordingly. It will be a fun way of evaluating products which will help users in decision making whether they should be buying this product or not. Along with the users it will also be beneficial for the manufacturers to understand and evaluate the product. This web app will provide them first-hand user feedback which will be useful for them to improve the product.
Key Features
Frontend (UI):

Frontend of this web page will consist of:

***Homepage:***

It will consist of the latest and trending products which disappointed users the most with product ratings, name and a brief description about the product, why it failed and what could be improved in it.

Option to list a new disappointing product towards which users can vote and read each others' opinions about the product.

***Explore page:***

This page will consist of all the products you might want to see based on your interests it will be done by an algorithm which will track your interactions with the product and it will show you the similar products. On this page you will be able to see product images, detailed description and a comment section will also be there to share your opinion.

With addition to this there would be agree/disagree buttons to tell whether this product has disappointed you or not.

***New product listing page:***

By clicking on the 'add new product' user will be redirected to this page. To list a new product user will need to enter some basic detail about the product like images, name, category and its description.

***Search:***

Users will be able to search a particular product by its name, sort by rating and filter by categories to view desired product.

***User Profiles:***

User can create accounts to keep a track on their submissions, see their previous interactions.

**Backend (Server-side):**

***Authentication:***

Users can sign up, log in and have personalized profiles.

***Product submissions:***

When a user submits a product, it will be stored in database.

***APIs:***

The backend will use RESTful APIs to handle:

Fetching the list of products using GET
Submitting new products using POST (with rate limiting)
User authentication and profile management
Voting on products using POST (with duplicate vote prevention)
Searching or filtering products by categories using GET
Error handling for all endpoints with appropriate status codes

***Deployment:***

Frontend: It can be deployed using platforms like Netlify or Vercel.

***Backend:***

We can use platforms like AWS, DigitalOcean to deploy server

The API can be bundled using Docker and deployed to cloud services for scalability.

***Database:***

AWS RDS is an easy choice for database management.

**Tech Stack**
Frontend: HTML, CSS, JS, React.js
Backend: Node.js with Express.js
Authentication: JSON Web Tokens for user sessions
Database: We can use MySQL, managed via an ORM like Prisma
Deployment: Heroku for backend, Netlify for frontend, MySQL hosted on AWS.

**Why This Project:**
This web app is a fun way of reviewing products in an unconventional manner. It would likely grow in popularity if it provides a humorous and honest reasons and positve criticism for disappointment realted to the products. Along with a fun way to know about new launches of products this web app can be useful for the manufacturers to evaluate their products. So this can be used both ways first as a source of knowledge and entertainment, second to know customer insights about the product and get to know the changes to be made to improve the product. It will also enhance my creativity so that I can pull people to my website that is not something people are used to visit there should be a creativity in displaying the products.

While working on this I will be learning many valuable skills:

Frontend Development (HTML, CSS, JS, React.js, Bootstrap, Tailwind.css)
UI/UX Design (Figma, Adobe XD)
Backend Development (Server Side Programming, Authentication, Database Management, API development)
Security Practices (Password hashing, Data encryption, Authorization)
Data Privacy (User data protection, Review moderation, GDPR compliance)
Deployment and Cloud Services
Soft Skills like collaboration and problem solving
