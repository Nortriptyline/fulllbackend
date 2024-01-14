# Requirements

To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install

To install the project, you just have to run `yarn install` to get all the dependencies

# Running the tests

After installing the dependencies you can run the tests with this command `yarn test`.

# Building executable

To build a single executable file, you can run `yarn build`

# Runing the executable

If nodejs is installed and project has been built, you will be able to execute the JS file located in the dist folder.

```bash
#Example :
cd ./dist
./fleet create <userId>
```

# Questions

## For code quality, you can use some tools : which one and why (in a few words) ?
Among the tools used :
- Typescript formatter : Allows to keep a consistent style of coding
- ESLint : Forces coding conventions

## You can consider to setup a ci/cd process : describe the necessary actions in a few words