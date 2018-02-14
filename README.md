# Express batches API for an evaluation tool for teachers

RESTful Express API for batches on top of MongoDB, connected to a front-end React app for teachers to evaluate each student by assignment a colour code on a daily basis based on their performance. 

This app is to learn how to use front-end frameworks [React.js](https://github.com/facebookincubator/create-react-app), [React-Redux](https://github.com/reactjs/redux) with back-end RESTful API [Express.js](https://github.com/expressjs/express) and NoSQL document database [MongoDB](https://github.com/mongodb/mongo) along with [Mongoose](https://github.com/Automattic/mongoose).

## Front-end React.js APP
Please refer to the related front-end React app repo: https://github.com/fandytcc/teacher-evaluation-tool-app

## Authentication

Create a User with the following attributes:

| Attribute | Type   | Description   |
|-----------|--------|---------------|
| name      | string | Full name     |
| email     | string | Email address |
| password  | string | Password      |

Use the following endpoints to deal with initial authentication and the user.

| HTTP Verb | Path        | Description |
|-----------|-------------|--------------|
| `POST`    | `/users`    | Create a user account |
| `POST`    | `/sessions` | Log in with email and password, and retrieve a JWT token |
| `GET`     | `/users/me` | Retrieve own user data |

To authorize further requests, use Bearer authentication with the provided JWT token:

```
Authorization: Bearer <token here>
```

_**Note**: See `db/seed.js` for an example._

## batches

**Note:** See `models/batch.js` for the Batch schema attributes.

| HTTP Verb | Path | Description |
|-----------|------|--------------|
| `GET` | `/batches` | Retrieve all batches |
| `POST` | `/batches` | Create a batch* |
| `GET` | `/batches/:id` | Retrieve a single batch by it's `id` |
| `PUT` | `/batches/:id` | Update a batch with a specific `id`* |
| `PATCH` | `/batches/:id` | Patch (partial update) a batch with a specific `id`* |
| `DELETE` | `/batches/:id` | Destroy a single batch by it's `id`* |
| | | _* Needs authentication_ |

_**Note**: Run `yarn run seed` to seed some initial batches._

## Steps
These are the steps I followed when working on this app:
1. Set up a Github project board to keep track of the development progress
2. Draw wireframes, sketch out how users navigate
3. Plan data models, database structure by understanding the impacts of user interaction
4. Create seed data
5. Set up authentication in the back-end
6. Set up a front-end for signing up, in, out and read data from the back-end
7. Tie front-end & back-end together by making buttons, URLs
8. Work on the key feature concerning the algorithm

## Work-in-progress
I built this final individual assignment within 4.5 days for Codaisseur Academy graduation assessment. After graduation, I'm currently working on the following features in both front-end & back-end:
  * Add, edit & remove students in a batch
  * Save evaulations form and direct to student overview or next student
  * Edit evaulations
  * Changing to the latest [material-ui@next](https://material-ui-next.com/) & improve styling

## Running Locally
Make sure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed.

```bash
git clone git@github.com:fandytcc/teacher-evaluation-tool-app.git
cd teacher-evaluation-tool-app
yarn install
yarn start
git clone git@github.com:fandytcc/teacher-evaluation-api.git
cd teacher-evaluation-api
yarn install
yarn start
```

## Related documentation
For more information about using React-Redux, ExpressJS and Mongoose, see these links:

* [React](https://facebook.github.io/react-native/)
* [Redux](https://redux.js.org/)
* [ExpressJS](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
