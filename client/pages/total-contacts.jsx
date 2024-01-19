import React, { useEffect } from "react";
import Dashboard from "../components/dashboard";
import SearchIcon from "../components/search-icon";
import TotalContactsIcon from "../components/total-contact-icon";
import LogOutIcon from "../components/log-out";
import { useAuthStore } from "../services/store.service";
import NewContact from "./new-contact";
import { useRouter } from "next/router";
import {
  deleteContact,
  getAllContacts,
  getUserApi,
  logout,
  searchAPI,
} from "../services/api.service";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteIcon from "../components/delete-icon";
import SelectBox from "../components/selectbox";
import AsyncSelect from 'react-select/async';
// import {useGlobalContext } from "./context";

// import { useMutation, useQuery, useQueryClient } from "react-query";

function TotalContacts() {
  const router = useRouter();
  const bears = useAuthStore();
  const [allContacts, setAllContacts] = useState(null);
  const [myData, setMydata] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    const user = JSON.parse(localStorage.getItem("user"));
    setMydata(user);

    if (authToken) {
      bears.setAuthToken(authToken);
    }
    async function fetchData() {
      // You can await here
      // const me = getUserApi();
      // localStorage.setItem("user", JSON.stringify(me));
      // setMydata(me);
      // const id = me.id;
      // if (id) {
      //   const response = await getAllContacts(id);
      //   console.log("response", response);
      //   setAllContacts(response);
      //   return response;
      const response = await getAllContacts();
      console.log("response", response);
      setAllContacts(response);
      return response;
      // }
    }
    fetchData();
  }, []);

  const quaryClient = useQueryClient();
  const deleteTaskMut = useMutation({
    mutationFn: deleteContact,
    onSuccess: async () => {
      await fetchData();
    },
  });
  // const getAllContacts = async () => {
  //   const me = await getUserApi();
  //   console.log(me);
  //   const id = me.id;
  //   console.log("me id ", id);
  //   if (id) {
  //     const allcontacts = await getAllContacts(id);
  //     setAllContacts(allcontacts);
  //   }
  // };
  // const handleShowContact = async () => {
  //   const authToken = localStorage.getItem("authToken");
  //   if (authToken) {
  //     bears.setAuthToken(authToken);
  //   }
  //   const allcontacts = await getAllContacts(id);
  //   setAllContacts(allcontacts);
  //   console.log(allContacts);
  // };
  // const contactListQuery = useQuery(
  //   ["contactsQuery", page],
  //   () => {
  //     if (auth != null) return getAllContacts(page);
  //   },
  //   {
  //     enabled: true,
  //   }
  // );
  const [showNewContact, setShowNewContact] = useState(false);
  // const {query,searchAPI}  = useGlobalContext();
  // const contacts =  data;
  const [searchSelectContact, setSearcSelectContact] = useState(null);
  // const searchedContacts = searchSelectContact
  //   ? allContacts.filter((item) => item.id === searchSelectContact.id)
  //   : allContacts;
  async function SearchData() {
    const search = await searchAPI();
    setSearcSelectContact(search);
    return search();
  }
  const searchedContacts=searchSelectContact?searchSelectContact.filter((item)=>item.id):allContacts
  return (
    <div className="total-contacts-page">
      <div className="sidebar">
        <div className="upper-sidebar">
          <h1 className="logo">Logo</h1>
          <div className="dashboard">
            <Dashboard /> Dashboard
          </div>
          <div className="total-contacts-button">
            <TotalContactsIcon /> Total contacts
          </div>
        </div>
        <div
          className="lower-sidebar"
          onClick={() => {
            logout();
            localStorage.clear();
            router.push("/");
          }}
        >
          <h1 className="log-out">
            <LogOutIcon /> Log out
          </h1>
        </div>
      </div>
      <div className="main-section">
        <div className="total-contacts-sections">
          <div className="header-section">
            <div className="total-contacts">Total Contacts</div>
            <div className="search-bar">
              <SearchIcon />
              <AsyncSelect 
              name={"Search....."}
              className="search"
              onChange={(e) => {
                searchAPI(e.target.value), {  searchedContacts };
              }}
              placeholder="Search by Email Id....."
            
              />
              {/* <input
                // value= {query}
                onChange={(e) => {
                  searchAPI(e.target.value), { searchSelectContact };
                }}
                className="search"
                placeholder="Search by Email Id....."
              /> */}
            </div>
            {/* <div className="border"></div> */}
          </div>
        </div>

        {showNewContact ? (
          <NewContact user={myData} />
        ) : (
          // <SearchIcon onClick={() => setShowNewContact(true)} />
          <div className="content-wrapper">
            {/* <div className="content-wrapper"> */}
            <div className="content">
              <button
                className="new-contact-btn"
                onClick={() => setShowNewContact(true)}
              >
                New Contact
              </button>
              <button className="delete-btn">Delete</button>
            </div>

            <table className="table">
              <thead>
                <tr className="head">
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Email</th>
                  <th>Phone-no</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {allContacts &&
                  allContacts.data.map((contact, index) => {
                    return (
                      <tr>
                        <td key={contact.id}>{contact.name.toString()}</td>
                        <td key={contact.id}>
                          {contact.designation.name.toString()}
                        </td>
                        <td key={contact.id}>
                          {contact.company.name.toString()}
                        </td>
                        <td key={contact.id}>
                          {contact.industry.name.toString()}
                        </td>
                        <td key={contact.id}>{contact.email.toString()}</td>
                        <td key={contact.id}>
                          {contact.phone_number.toString()}
                        </td>
                        <td key={contact.id}>
                          {contact.country.name.toString()}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteTaskMut.mutate(contact.id);
                          }}
                        >
                          <DeleteIcon />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TotalContacts;
