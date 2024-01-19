import React from "react";
import CreatableSelect from "react-select/creatable";
import { useQuery } from "react-query";
import { fetchUserById } from "../services/api.service";
import { isObject } from "formik";

function SelectBox({ label, name, onChange, link, value }) {
  const dataQuery = useQuery({
    queryKey: [`${link}`, `/${link}`],
    queryFn: () => fetchUserById(`/${link}`),
  });

  let options = [];
  if (dataQuery.isSuccess && dataQuery.isFetching === false) {
    options = dataQuery.data;
  }

  const handleInputChange = (inputValue, actionMeta) => {};
  return (
    <>
      <label htmlFor={name}>{label}</label>

      <CreatableSelect
        className="mb-5 mt-5"
        placeholder={`Select ${label}`}
        isClearable={true}
        id={name}
        name={name}
        value={value}
        onChange={(value) => {
          onChange(name, value);
        }}
        onInputChange={handleInputChange}
        getOptionLabel={(e) => <p>{e.name}</p>}
        options={options}
        isOptionSelected={(o) => {
          if (isObject(o) && o.hasOwnProperty("id")) {
            return o.id === value?.id;
          }
          return false;
        }}
      />
    </>
  );
}

export default SelectBox;

// function SelectBox({ label, name, onchange, link, value }) {
//   const dataQuery = useQuery({
//     queryKey: [`${link}`, `/${link}`],
//     queryFn: () => fetchUserById(`/${link}`),
//   });

//   let options = [];
//   if (dataQuery.isSuccess && dataQuery.isFetching === false) {
//     options = dataQuery.data;
//   }
//   const handleInputChange = (inputValue, actionMeta) => {};
//   return (
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <CreatableSelect
//         placeholder={`Select ${label}`}
//         isClearable={true}
//         id={name}
//         name={name}
//         value={value}
//         onChange={(value) => {
//           onChange(name, value);
//         }}
//         onInputChange={handleInputChange}
//         getOptionLabel={(e) => <p>{e.name}</p>}
//         options={options}
//         isOptionSelected={(o) => {
//           if (isObject(o) && o.hasOwnProperty("id")) {
//             return o.id === value?.id;
//           }
//           return false;
//         }}
//       />
//     </div>
//   );
// }

// export default SelectBox;
