# lexy-typescript

An editor/IDE for editing and executing [lexy-language](https://github.com/lexy-language/lexy-language) scripts.
Check the [lexy-language](https://github.com/lexy-language/lexy-language) or the online [demo](https://lexy-language.github.io/lexy-demo/)
to understand the purpose of Lexy.

Features:
- Interactive introduction to the lexy language
- View/edit lexy scripts and examples
- Execute lexy scripts in real time
- View parser/compilation logging in real time
- View execution logging in real time
- Real time execution of lexy language automated specifications (scenarios)

**Limitation**: The current editor is a demo (proof of concept) and it does not use a back-end, so it can't load an save files from file system or a git repository. 
It includes all the example lexy script files in the js bundle for demonstration purpose. Changes are stored in the local storage of the browser.

# Setup

## lexy-typescript dependency
At the moment the lexy-compiler is added as local npm package. Run 'yarn update-lexy' to update the package from source. 
Ensure lexy-typescript compiles correctly before running the command. Repositories: lexy-typescript and lexy-editor should be in the same parent folder for the command to work.

## Run locally

Ensure node.js (v16 or above) is installed.
Tested with node.js v16.20.2.

Run editor locally
`yarn start`

# Contribution

Check [lexy-language](https://github.com/lexy-language/lexy-language) for more information about how to contribute.

## Todo's

- [ ] Editor: add a view to add/edit a table
- [ ] Editor: add a view to add/edit a scenrario based on th current parameter and result varaibles of a function
- [ ] Editor: make a version that runs online as public demo/playground/ide, and a version that can be used locally for editing files on the local filesystem
- [ ] Version control: Integrat git branches for versioning of lexy scripts
- [ ] Version control: Integrat git submodules to support including existing lexy scripts
- [ ] Deployment: Publish lexy-typescript as npm package 'lexy-compiler' and include it from the npm repository
- [ ] React: Check how state management can be improved. It feels a bit messy.
- [ ] Back-end: Develop a backend (preferably in node.js or dotnet) so it can run locally as an editor and publicly as a playground application.

# Implementation details

