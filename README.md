# Interview Scheduler


## Screenshots
!["Creating a new booking"](https://github.com/QuintonEL/scheduler/blob/master/docs/creation-form.png?raw=true)
### Users can select a day and timeslot and add a booking with an interviewer listed
!["Monday overview"](https://github.com/QuintonEL/scheduler/blob/master/docs/monday-overview.png?raw=true)
### Example of what a day will look like listing all the bookings for the day
!["Deleting a booking"](https://github.com/QuintonEL/scheduler/blob/master/docs/delete-confirm.png?raw=true)
### There will be a confirmation message when a user tries to delete a booking

## Functionality
- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Deployment

- Netlify is serving the static client assets. The link to the site is in the GitHub project description!

- CircleCI is managing the continuous integration process

- The server is deployed on Heroku
https://i-scheduler-lhl.herokuapp.com/api/days


## Dependencies
- axios
- @testing-library/react-hooks
- react-test-renderer


## Setup

Install dependencies with `npm install`.

- The server and the client must both be running

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
