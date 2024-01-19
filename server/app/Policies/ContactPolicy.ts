import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Contact from 'App/Models/Contact'
import User from 'App/Models/User'

export default class ContactPolicy extends BasePolicy {
  public async viewAll(user: User, userId: string) {
    return parseInt(userId) === user.id
  }

  public async view(user: User, contact: Contact) {
    return contact.userId === user.id
  }

  public async store(user:User, contact: Contact){
    return contact.userId === user.id
  }

  public async destroy(user:User, userId: number){
    return userId === user.id
  }
}
