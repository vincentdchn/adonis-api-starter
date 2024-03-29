<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">AdonisJS API Starter</h3>

  <p align="center">
    A starter template for AdonisJS API
    <br />
    <!-- <a href=""><strong>Explore the docs »</strong></a> -->
    <a href="https://github.com/vincentdchn/adonis-api-starter/issues">Report Bug</a>
    ·
    <a href="https://github.com/vincentdchn/adonis-api-starter/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#models-and-policies">Models and Policies</a></li>
    <li><a href="#routes">Routes</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a starter template for AdonisJS API. It is a simple API with authentication, authorization, and CRUD operations.
It has a simple user model with a username, email, and password.
Authentication and authorization can be done with bearer token or api keys.
It is built with AdonisJS and has a MariaDB database for local development on Docker.

Feel free to use this template for your own projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [AdonisJS](https://adonisjs.com/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/)
- [Prettier](https://prettier.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- <strong>Docker</strong>
  Depending on your host OS, you will need to install docker and docker-compose.

  - [docker](https://docs.docker.com/get-docker/)
  - [docker-compose](https://docs.docker.com/compose/install/)

</br>

- <strong>Yarn</strong>
  ```sh
    npm install --global yarn
  ```

### Installation

_Here is a quick guide to get you started with the project_

1. Clone the repo
   ```sh
   git clone git@github.com:vincentdchn/adonis-api-starter.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Copy the example .env file and file it with your database infos
   ```sh
   cp .env.example .env
   ```
   (If you juste want to test the API, you can use the default values of the provided test database)
   ```sh
   PORT=3333
   HOST=0.0.0.0
   NODE_ENV=development
   APP_KEY=lxDZybEmA3itUDz8DQqf290MJC8oos4y
   DRIVE_DISK=local
   DB_CONNECTION=mysql
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_USER=user
   MYSQL_PASSWORD=password
   MYSQL_DB_NAME=mydatabase
   ```
4. **(Optional)**
   If you want to use the provided test database, you can start the container with :
   ```sh
   yarn db:launch
   ```
5. Run the migrations with the following command
   ```sh
   yarn db:migrate
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. Run the development server with
   ```sh
   yarn dev
   ```
2. Build the project for production with
   ```sh
   yarn build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Models and Policies

### Models

#### ApiKey

- Belongs to User
- Belongs to Project

- `id`, `userId`, `projectId`, `name`, `key`, `lastUsedAt`, `createdAt`, `updatedAt`

#### Project

- Belongs to User
- Has many ApiKey
- `id`, `userId`, `name`, `description`, `startDate`, `endDate`, `createdAt`, `updatedAt`

#### Role

- `id`, `name`, `createdAt`, `updatedAt`
  (There are already two roles coming with the default migrations: `admin` and `user`)

#### User

- Belongs to Role
- Has many Project
- `id`, `roleId`, `firstname`, `lastname`, `email`, `password`, `rememberMeToken`, `createdAt`, `updatedAt`

### Policies

#### ApiKeyPolicy

Actions: `list`, `store`, `show`, `update`, `destroy`
Conditions: Admin or key/API owner

#### ProjectPolicy

Actions: `list`, `show`, `update`, `destroy`
Conditions: Admin or project owner

#### UserPolicy

Actions: `index`, `store`, `show`, `update`, `destroy`
Conditions: Admin or the user themselves

**Note:**
_Policies can be modified in the `app/Policies` folder.
To add a new policy you can refer to the AdoniJS documentation: [Policies](https://docs.adonisjs.com/guides/authorization#using-policies)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Routes

| Route                   | HTTP Method | Controller Action          | Description               |
| ----------------------- | ----------- | -------------------------- | ------------------------- |
| `/api/v1/auth/register` | POST        | AuthController.register    | Register a new user       |
| `/api/v1/auth/login`    | POST        | AuthController.login       | Login a user              |
| `/api/v1/auth/logout`   | GET         | AuthController.logout      | Logout a user             |
| `/api/v1/users`         | GET         | UsersController.index      | Get all users             |
| `/api/v1/users`         | POST        | UsersController.store      | Create a new user         |
| `/api/v1/users/:id`     | GET         | UsersController.show       | Get a specific user       |
| `/api/v1/users/:id`     | PUT         | UsersController.update     | Update a specific user    |
| `/api/v1/users/:id`     | DELETE      | UsersController.destroy    | Delete a specific user    |
| `/api/v1/projects`      | GET         | ProjectsController.index   | Get all projects          |
| `/api/v1/projects/all`  | GET         | ProjectsController.list    | List all projects         |
| `/api/v1/projects`      | POST        | ProjectsController.store   | Create a new project      |
| `/api/v1/projects/:id`  | GET         | ProjectsController.show    | Get a specific project    |
| `/api/v1/projects/:id`  | PUT         | ProjectsController.update  | Update a specific project |
| `/api/v1/projects/:id`  | DELETE      | ProjectsController.destroy | Delete a specific project |
| `/api/v1/keys`          | GET         | ApiKeysController.index    | Get all API keys          |
| `/api/v1/keys/all`      | GET         | ApiKeysController.list     | List all API keys         |
| `/api/v1/keys/generate` | POST        | ApiKeysController.store    | Generate a new API key    |
| `/api/v1/keys/:id`      | GET         | ApiKeysController.show     | Get a specific API key    |
| `/api/v1/keys/:id`      | PUT         | ApiKeysController.update   | Update a specific API key |
| `/api/v1/keys/:id`      | DELETE      | ApiKeysController.destroy  | Delete a specific API key |
| `/api/v1/protected`     | GET         | -                          | Protected route (auth)    |
| `/api/v1/api-key`       | GET         | -                          | API key route (api-key)   |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Vincent Duchêne - [@vincentdchn](https://twitter.com/vincentdchn) - vincentduchene.m@gmail.com

Project Link: [https://github.com/vincentdchn/adonis-api-starter](https://github.com/vincentdchn/adonis-api-starter)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
