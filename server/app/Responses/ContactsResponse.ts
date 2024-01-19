import Contact from 'App/Models/Contact'

export default class ContactsResponse {
  public static single(contact: Contact, extra = null) {
    const resource = contact.serialize({
      fields: {
        pick: ['id', 'name', 'email', 'phone_number'],
      },
      relations: {
        designation: {
          fields: ['id', 'name'],
        },
        company: {
          fields: ['id', 'name'],
        },
        industry: {
          fields: ['id', 'name'],
        },
        country: {
          fields: ['id', 'name', 'code'],
        },
      },
    })

    // if (actor.$extras.movieCount)
    return resource
  }

  public static collection(contacts) {
    const contactJSON = contacts.map((a) => ContactsResponse.single(a))

    return contactJSON
  }
}
