import React from "react";
import InputBox from "../components/inputbox";
import SelectBox from "../components/selectbox";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { addContactsApi } from "../services/api.service";
import TotalContacts from "./total-contacts";

function NewContact({ user }) {
  const router = useRouter();

  const newContactMut = useMutation(addContactsApi);

  const newContactForm = useFormik({
    initialValues: {
      name: null,
      email: null,
      phone_number: null,
      country: null,
      designation: null,
      company: null,
      industry: null,
    },
    onSubmit: (values) => {
      console.log("button click submit ----------------------- ");
      console.log("---------values", values);

      // const newValues = {
      //   ...values,
      //   country_id: values.country?.id ? values.country.id : null,
      //   company_id: values.company?.id ? values.company.id : null,
      //   designation_id: values.designation?.id ? values.designation.id : null,
      //   industry_id: values.industry?.id ? values.industry.id : null,
      // };
      // console.log(newValues, "values");

      // newContactMut.mutate(newValues);
      // router.push("/total-contacts");
      // const [showNewContact, setShowNewContact] = useState(false);
      // showNewContact ? <TotalContacts /> : <NewContact />;

      const payload = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        company_id: values.company.id,
        country_id: values.country.id,
        designation_id: values.designation.id,
        industry_id: values.industry.id,
        user_id: user.id,
      };
      console.log("-----------------payload", payload);
      newContactMut.mutate(payload);
      router.push("/total-contacts");
    },
  });

  const handleChange = (fieldName, value) => {
    console.log("-------------on change", fieldName, value);
    newContactForm.setFieldValue(fieldName, value);
  };

  return (
    <div className="new-contact-page">
      <span className="new-contact">New Contact</span>

      <form
        onSubmit={newContactForm.handleSubmit}
        className="incoming-new-data"
      >
        <InputBox
          type="text"
          label="Name"
          name="name"
          onChange={newContactForm.handleChange}
        />

        <SelectBox
          label="Designation"
          name="designation"
          link="designations"
          onChange={handleChange}
        />

        <SelectBox
          label="Company"
          name="company"
          link="companies"
          onChange={handleChange}
        />

        <SelectBox
          label="Industry"
          name="industry"
          link="industries"
          onChange={handleChange}
        />

        <InputBox
          type="email"
          label="Email"
          name="email"
          onChange={newContactForm.handleChange}
        />

        <InputBox
          type="tel"
          label="Phone"
          name="phone_number"
          onChange={newContactForm.handleChange}
        />

        <SelectBox
          label="Country"
          name="country"
          link="countries"
          onChange={handleChange}
        />
        <button type="submit" className="create">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewContact;
