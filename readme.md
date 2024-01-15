# Requirements

To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install

To install the project, you just have to run `yarn install` to get all the dependencies

# Running the tests

After installing the dependencies you can run the tests with this command `yarn test`.

# Building executable

To build a single executable file, you can run `yarn build`

After this operation, you will find the `./dist/fleet` executable file

# Runing the executable

If nodejs is installed and project has been built, you will be able to execute the JS file located in the dist folder.

## Database
Database should be automatically created during first call, as long as the `fleet.sqlite` file does not exists
In order to simplify database creation and reinitialization, the `initialize-database`command has been added.
This will drop and recreate required tables from the database file.

Executing `yarn test` will create a specific file named `fleet-test.sqlite` for performing tests outside the real database.

```bash
cd ./dist

#help :
fleet <cmd> [args]

Commandes :
  fleet initialize-database                 Initialize the database

  fleet create <userId>                     Create a fleet for the user with the given ID

  fleet register-vehicle <fleetId>          Register a vehicle to a fleet by its
  <vehiclePlateNumber>                      plate number

  fleet localize-vehicle <fleetId>          Set the location of a vehicle by its
  <vehiclePlateNumber> latitude longitude   plate number in a fleet
  [altitude]

```

# Questions

## For code quality, you can use some tools : which one and why (in a few words) ?
Among the tools used :
- Typescript formatter : Allows to keep a consistent style of coding
- ESLint : Forces coding conventions
- Prettier : Automate code formatting

## You can consider to setup a ci/cd process : describe the necessary actions in a few words
1) Implement a source control tool like Git
2) Use a CI server like Jenkins to monitor changes in the repository and trigger actions in specific cases like executing automated tests before merges
3) Execute the automated the tests in a test environment
4) Create an executable or a Docker Image. (`yarn build` actually does create a node executable)
5) If tests are ok, and we want this version to go in production, we first ensure the deployment will be fine by executing a script to deploy our  updates into a staging environment (using a production like database). This script will be executed when trying to merge our develop branch to staging
6) If the deployment to the staging environment went well, repeat the previous operation to the production branch and environment