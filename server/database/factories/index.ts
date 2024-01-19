import Factory from '@ioc:Adonis/Lucid/Factory'
import Company from 'App/Models/Company'
import Contact from 'App/Models/Contact'
import Country from 'App/Models/Country'
import Designation from 'App/Models/Designation'
import Industry from 'App/Models/Industry'
import User from 'App/Models/User'

export const CompanyFactory = Factory.define(Company, ({ faker }) => {
  return {
    name: faker.company.companyName(),
  }
}).relation('contacts',()=>ContactFactory)
  .build()


  export const DesignationFactory = Factory.define(Designation, ({ faker }) => {
    return {
      name: faker.name.jobTitle(),
    }
  }).relation('contacts',()=>ContactFactory)
    .build()

  export const IndustryFactory = Factory.define(Industry, ({ faker }) => {
    return {
      name: faker.internet.domainWord()
    }
  }).relation('contacts',()=>ContactFactory)
    .build()

    export const CountryFactory = Factory.define(Country,({faker})=>{
        return{
            name:faker.address.country(),
            timezone: faker.address.timeZone(),
            code: faker.address.countryCode()
        }
    }).build()

    export const UserFactory = Factory.define(User,({faker})=>{
        return{
         firstName: faker.name.firstName(),   
         lastName: faker.name.lastName(),
         email: faker.internet.email(),
         password: "Pass@123"   
        }
    }).relation('contacts', ()=> ContactFactory)
    .build()


    export const ContactFactory = Factory.define(Contact,({faker})=>{
        return{
            name: faker.name.firstName() +" " +faker.name.lastName(),
            email: faker.internet.email(),
            phone_number: faker.phone.phoneNumber()
        }
    }).relation('user', ()=> UserFactory )
    .relation('company', ()=> CompanyFactory)
    .relation('designation', ()=> DesignationFactory)
    .relation('industry', ()=> IndustryFactory)
    .relation('country', ()=> CountryFactory)
    .build()