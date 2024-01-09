/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  |
  */
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.get('/logout', 'AuthController.logout')
  }).prefix('/auth')

  /*
  |--------------------------------------------------------------------------
  | Users
  |--------------------------------------------------------------------------
  |
  */
  Route.group(() => {
    Route.get('/users', 'UsersController.index')
    Route.post('/users', 'UsersController.store')
    Route.get('/users/:id', 'UsersController.show')
    Route.put('/users/:id', 'UsersController.update')
    Route.delete('/users/:id', 'UsersController.destroy')
  }).middleware('auth')

  /*
  |--------------------------------------------------------------------------
  | Projects
  |--------------------------------------------------------------------------
  |
  */
  Route.group(() => {
    Route.get('/projects', 'ProjectsController.index')
    Route.get('/projects/all', 'ProjectsController.list')
    Route.post('/projects', 'ProjectsController.store')
    Route.get('/projects/:id', 'ProjectsController.show')
    Route.put('/projects/:id', 'ProjectsController.update')
    Route.delete('/projects/:id', 'ProjectsController.destroy')
  }).middleware('auth')

  /*
  |--------------------------------------------------------------------------
  | Keys
  |--------------------------------------------------------------------------
  |
  */
  Route.group(() => {
    Route.get('/keys', 'ApiKeysController.index')
    Route.get('/keys/all', 'ApiKeysController.list')
    Route.post('/keys/generate', 'ApiKeysController.store')
    Route.get('/keys/:id', 'ApiKeysController.show')
    Route.put('/keys/:id', 'ApiKeysController.update')
    Route.delete('/keys/:id', 'ApiKeysController.destroy')
  }).middleware('auth')

  Route.get('/protected', () => 'protected').middleware('auth')
  Route.get('/api-key', () => 'api-key').middleware('api-key')
}).prefix('/api/v1')
