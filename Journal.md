# Developer Journal for SQL Library App

## May 31, 2024

- set up the repo
- downloaded the project files
- made an app folder
- generated the project with
  `npx express-generator --view=pug`
- installed sequelize and sqlite3 in app with `npm i sequilize sqlite3`
- ran `npm audit fix`
- ran `npm audit fix --force`
- ran `npm i express@latest pug@latest body-parser@latest`
- ran `npm audit` 0 vulnerabilities
- vulnerabilities were fixed
- ran `npm install sequelize-cli --save-dev`
- ran `npx sequelize-cli init`
- included a `.gitignore` file generated with AI to avoud pushing unnecessary modules and dependencies
- ran this command to mitigate the LF to CRLF warnings in git `git config --global core.autocrlf true`
- ran `add` and `commit` and `push`
- moving on to Instruction step 2 basic setup

## June 2, 2024

    - I set up the book model with `npx sequelize model:create --name Book --attributes title:string,author:string,genre:string,year:integer`
    - I synced and connected the database with an IIFE
    - I set up error handling for 404 and 500 routes
    - Moving on to step 6

## June 9, 2024

- pretty much got everything wired up correctly
- need to add comments and move on to extra credit

## June 11, 2024
- Got the app wired up including extra credit.
- Spent a while figuring out how to make the database be created and populated if it doesn't already exist.
- Leared about setting up a seeders folder with the intitial data. 
- Moved all of the initial books into a json file.

## June 12, 2024
- Received feedback from TH. 
- Apparently I'm missing Sequelize Models and properties, I thought I had it set up but I'll review.
- I guess I just had too much validation on the Book model. Only the title and author required validation.
- Also, I had the required statement in the pug template which was stopping the form from submitting and hitting the error handling endpoints.
- Resubmitting.