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
