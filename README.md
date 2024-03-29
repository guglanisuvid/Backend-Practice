# Backend Practice

Tried to create a pinterest clone, using nodejs, expressjs and mongodb.

## Technologies

- `NodeJS`
- `ExpressJS`
- `MongooseJS`
- `MongoDB`

## Features

- Authentication
- Protected Routes
- MongoDB Integration
- Passport Sessions

## Process

I started by replicating the Register page and the Sign In page.

Then i integrated MongoDB as the server and created two different models - user model and posts model.

Then I worked upon the Validation and Authentication of the user using passport and passport local.

After authenticating the user, I created the protected routes, so the user cannot access profile page when the user is logged out and also the root route & the login route whent the user is logged in.

At last, I worked upon creating the profile page where the user can create new posts and view previously created posts.

## Learnings

Some of my new learnings from this project are listed below:

- NodeJS
- ExpressJS
- MongoDB
- Creating new DB Models
- Passport, Passport Local and Passport Sessions
- EJS Files
- MulterJS NPM Package
- UUID NPM Package

## Improvements

- Making the website responsive
- Adding a feed page where the user can see what other people are uploading
- Allowing the user to like and save the posts
- Allowing the user to make changes in its profile page and profile information

## Running the project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the required dependencies.
3. Run `npx nodemon` to get the project started and run it on your local machine at `localhost:3000`.
