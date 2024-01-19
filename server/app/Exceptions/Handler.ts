/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

// import Logger from '@ioc:Adonis/Core/Logger'
// import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

// export default class ExceptionHandler extends HttpExceptionHandler {
//   protected statusPages = {
//     '403': 'errors/unauthorized',
//     '404': 'errors/not-found',
//     '500..599': 'errors/server-error',
//   }

//   constructor() {
//     super(Logger)
//   }
// }

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    error.status = error.status || 500

    if (typeof error.handle === 'function') {
      return error.handle(error, ctx)
    }

    /**
     * Send stack in the response when in test environment and
     * there is a fatal error.
     */
    if (error.status >= 500 && error.stack && process.env.NODE_ENV === 'test') {
      return ctx.response.status(error.status).send(error.stack)
    }

    let responseError = {}
    let responseErrorStatus = 400
    if (error.code === 'E_ROW_NOT_FOUND') {
      // handle 404
      responseError = {
        data: null,
        errors: ['Not found'],
      }

      responseErrorStatus = 404
    } else if (error.code === 'E_AUTHORIZATION_FAILURE') {
      responseError = {
        data: null,
        errors: ['Access denied'],
      }

      responseErrorStatus = 401
    }

    /**
     * Attempt to find the best error reporter for validation
     */
    switch (ctx.request.accepts(['html', 'application/vnd.api+json', 'json'])) {
      case 'html':
      case null:
        return this.makeHtmlResponse(error, ctx)
      case 'json':
        if (process.env.NODE_ENV === 'development') {
          ctx.response.status(responseErrorStatus).send({
            ...responseError,
            message: error.message,
            stack: error.stack,
            code: error.code,
          })
          return
        }

        return ctx.response.status(responseErrorStatus).send(responseError)
      // return this.makeJSONResponse(responseError, ctx)
      case 'application/vnd.api+json':
        return this.makeJSONAPIResponse(responseError, ctx)
    }
  }
}
