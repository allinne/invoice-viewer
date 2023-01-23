# collectAI Invoice DnD Challenge

The application fetches `invoice.json` and displays its details. It computes the sum and VAT based on data from JSON. 

To enter edit mode append the URL with `?edit`. The "Edit" button and a drag'n'drop zone are appeared at the bottom. After dropping, JSON is being parsed and a success/error message is displayed. The “Edit” button makes descriptions and prices editable, the user can save changes clicking on the “Save” button.

## What has been done

* migrated the project to TypeScript in strict mode
* splitted up logic blocks into components
* parsed dates into ISO8601 format using `data-fns` library
* introduced ESLint, stylelint, SASS, jest-unit into the project
* rewrote a layout of the top block using flexboxes
* used BEM methodology for naming of CSS classes, while preserving the initial appearance
* set up GitHub actions for linting and testing
* wrote tests, coverage is 100%

## Prerequisites

The application requires Node v18.0.0, NPM v8.6.0.
 
## Installation

Install it from GitHub using the following commands
* `git clone git@github.com:allinne/invoice-box.git`
* `cd invoice-box`
* `npm i` install all dependencies

## Running / Development

* `npm run start` launch the app locally
* visit the app at [http://localhost:3000](http://localhost:3000)

## Running Tests

* `npm run test`
* `npm run test:ci` to see a coverage

## Linting

* `npm run lint`

## ToDo

The most challenging part was to stop improving :-) So here is a list of improvements which might be done:
* UX: show the “Save” button active only if input data differs from initial, otherwise disabled
* Use [SWR](https://swr.vercel.app/) instead of `fetch` to cache file content
* Prettier
* Autoprefixer
* Price validation
* PageObjects to make tests more declarative
