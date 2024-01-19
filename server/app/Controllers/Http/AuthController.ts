import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const userSchema = schema.create({
      firstName: schema.string.optional({ trim: true }),
      lastName: schema.string.optional({ trim: true }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      ]),
      password: schema.string({}, [rules.minLength(8), rules.confirmed()]),
    })

    const data = await request.validate({ schema: userSchema })
    const user = await User.create(data)
    const token = await auth.use('api').login(user)
    //   await Event.emit('new:user', { id: auth.user?.id, email: auth.user?.email})
    return token
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.findByOrFail('email', email)

    // const token = await auth.use('api').generate(user)
    const token = await auth.use('api').login(user)

    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async refresh({}: HttpContextContract) {
    // const refreshToken = request.input('refresh_token')
    // const jwt = await auth.use('api').loginViaRefreshToken(refreshToken)

    // return jwt
  }

  public async me({ auth }: HttpContextContract) {
    if(await auth.use('api').check()){
      return auth.use('api').user
    }
  }

  public async updateProfile({auth, request}:HttpContextContract){
    if(await auth.use('api').check()){
      const userSchema = schema.create({
        firstName: schema.string.optional({ trim: true }),
        lastName: schema.string.optional({ trim: true }),
        email: schema.string.optional({ trim: true }, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
        ])
      })

      const payload = await request.validate({ schema: userSchema })
      const user = await User.findByOrFail('id', auth.user?.id)
  
      await user.merge(payload).save()
  
      return { user }

      return auth.use('jwt').user
    }
  }
}
