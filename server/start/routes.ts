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
| import './routes/customer''
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.get('/hello', async ({}) => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout')
    Route.post('/refresh', 'AuthController.refresh')
    Route.get('/me', 'AuthController.me')
    Route.put('/profile', 'AuthController.updateProfile')
  }).prefix('/auth')

  // Route.get('/countries/:id','CountriesController.show')
  // Route.post('/countries','CountriesController.store')

  // countries apis
  Route.resource('countries', 'CountriesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  //companies api
  Route.resource('companies', 'CompaniesController')
    .apiOnly()
    .middleware({
      index: ['auth'],
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  //designations api
  Route.resource('designations', 'DesignationsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  //industries api
  Route.resource('industries', 'IndustriesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  //contacts api
  Route.post('/contacts/import', 'ContactsController.handleCsvImport')
  Route.resource('users.contacts', 'ContactsController')
    .apiOnly()
    .middleware({
      index: ['auth'],
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })

  Route.get('/contacts/search/:query', 'ContactsController.search')
  
  Route.post('/export/csv', 'CsvsController.index')

  Route.resource('/import/csv', 'CsvsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
    })
}).prefix('/api/v1')

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
