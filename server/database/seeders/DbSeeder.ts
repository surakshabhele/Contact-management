import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import {
  CompanyFactory,
  CountryFactory,
  DesignationFactory,
  IndustryFactory,
  UserFactory,
} from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await User.create({
      firstName: 'suraxa',
      lastName: 'bhele',
      email: 'sbhele@cemtrexlabs.com',
      password: 'Pass@123',
    })
    await UserFactory.with('contacts', 100, (contacts) => {
      return contacts
        .with('company', 2, () => CompanyFactory)
        .with('designation', 2, () => DesignationFactory)
        .with('industry', 2, () => IndustryFactory)
        .with('country', 3, () => CountryFactory)
    }).createMany(5)
  }
}
