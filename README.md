# RSS eCommerce Application

## Table of contents
- [General](#general)
- [Technologies](#technologies)
- [Code of conduct](#code-of-conduct)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Authors](#authors)
- [Gratitude](#gratitude)
- [Learn More](#learn-more)

## General
This app is a learning project [eCommerce Application](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application) of the "JavaScript/Front-End 2023Q1" course run by Rolling Scopes School. The purpose of this project is to master and deepen knowledge in JavaScript / Front-end, to apply this knowledge in practice when developing an e-commerce application. Also, the goal of the project is to master modern tools and frameworks used in the development of web applications.

## Technologies
Project is created with:
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [SASS](https://sass-lang.com/)
* [Create React App](https://create-react-app.dev/)
* [Commercetools](https://commercetools.com/)

## Code of conduct
### Branching stategy
* Create a new branch for the current sprint (e.g., feat/sprint_3) from the previous sprint's branch (e.g., feat/sprint_2). For the first sprint use develop branch as a sprint branch.
* For each task, create a new branch from the sprint branch, make the changes, and create a pull request to merge the changes back into the sprint branch after a code review.
* At the end of the sprint, create a pull request from the current sprint's branch (e.g., feat/sprint_3) to the previous sprint's branch (e.g., feat/sprint_2).
Share the pull request link with the mentor for review and evaluation.

### Branch: 
Template: `type/<issue-key-in-kebab-case>-<issue-summary-in-kebab-case>`

Types: `feat`, `fix`

Example: `feat/JIRA-1-new-cool-feature`

### Commit: 
Template: `<type>: <description> (<issue-key>)`

Types: `feat`, `fix`, `refactor`, `docs`

Example: `feat: add new cool feature (JIRA-1)`

## Installation
1. Clone this repository to local computer.
2. Install all dependencies use `npm install`.
3. Create the project in [CommerceTools](https://commercetools.com), setting up the necessary authorization, currencies, languages, and other configurations in the Merchant Center.
4. Create the [API client](https://docs.commercetools.com/getting-started/create-api-client) for CommerceTools, enabling access to the platform's APIs and managing permissions and scopes required for the project.
5. Save your API environment variables file (.env) in the project directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs a scan on your codebase using ESLint. During the scan, ESLint examines your JavaScript code files to identify potential errors, coding conventions violations, and stylistic issues. It applies a set of predefined rules or rulesets to analyze your code, providing feedback on areas that need attention or improvement.

### `npm run lint:fix`

Run this script to make ESLint not only to identify potential errors and violations but also automatically to fix as many of these issues as possible. It applies automatic code transformations to resolve common problems and align your code with the configured ruleset.

This command is useful when you want to quickly fix common issues in your codebase without manually going through each reported problem.

### `npm run style`

Runs a scan on your codebase using the Stylelint. Stylelint is a linter specifically designed for checking and enforcing consistent CSS or SCSS code styles and conventions.

When you execute this command, Stylelint analyzes your CSS or SCSS files and provides feedback on any issues it finds. It checks for violations of formatting rules, naming conventions, selector usage, and other CSS-related best practices. 

Stylelint helps you maintain a consistent and readable codebase by flagging potential errors, inconsistencies, and bad practices in your CSS or SCSS code. It can highlight issues such as missing semicolons, invalid property values, duplicate selectors, unused styles, and much more.

### `npm run style:fix`

Run this script to make Stylelint not only to identify potential errors and violations but also automatically to fix as many of these issues as possible. It applies automatic code transformations to resolve common problems and align your code with the configured ruleset.

This command is useful when you want to quickly fix common issues in your codebase without manually going through each reported problem.

### `npm run format`

Runs a scan on your codebase using Prettier. Prettier analyzes the code files in the project and checks their formatting for compliance with the established rules. If the formatting does not comply with the rules, the command will generate appropriate errors or warnings.

### `npm run format:fix`

Run this script to make Prettier not only to identify potential errors and violations but also automatically to fix as many of these issues as possible. It applies automatic code transformations to resolve common problems and align your code with the configured ruleset.

This command is useful when you want to quickly fix common issues in your codebase without manually going through each reported problem.

### `npm run prepare`

Runs on local `npm install` without any arguments. This script runs `husky install`, needed to add a command to a Git hook or create a new one.

This project initialized Husky to manage Git hooks, automating tasks such as linting checks and code formatting during the commit process.

To add a command to a hook or create a new one, use `husky add <file> [cmd]`. More info [here](https://typicode.github.io/husky/getting-started.html#create-a-hook).


## Authors
* Iurii Bazhenov
* Vitaly Fatkullin
* Taras Ustiugov

## Gratitude
We would like to express our sincerest gratitude to the [RS School](https://rs.school/) for the incredible training program and courses you have provided us. We cannot emphasize enough how valuable this experience has been for our personal and professional growth.The dedication and expertise of the instructors have exceeded our expectations, and we are truly grateful for their passion and commitment to delivering high-quality education. The skills and knowledge we have acquired during this program will undoubtedly shape our future careers.

## Learn More
* [RS School](https://rs.school/)
* [Conventional Commits](https://www.conventionalcommits.org/)
* [React documentation](https://react.dev/)
* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [CommerceTools documentation](https://docs.commercetools.com/docs/)

## License
[MIT](./LICENSE)
