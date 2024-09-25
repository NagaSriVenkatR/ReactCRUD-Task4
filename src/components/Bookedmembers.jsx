import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaChevronLeft, FaChevronRight, FaRegListAlt, FaUserEdit } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import { TiUserDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Menu from "./21641378.jpg";
import { SlShareAlt } from "react-icons/sl";
function Bookedmembers() {
  const [customers, setCustomers] = useState([]);
  const createUserAPI =
    "https://6683c44d56e7503d1ade07d4.mockapi.io/userData/customerdata";
  const navigate = useNavigate();

  useEffect(() => {
    fetch(createUserAPI)
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (customer) => {
    navigate("/form", { state: { customer } });
  };

  const handleDelete = (id) => {
    fetch(`${createUserAPI}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };
  // const handleBook = navigate("/form");
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="mt-5 ">
            <h1 className="text-start">Booked Details</h1>
            <div className="row">
              <div className="fixed-table-toolbar col">
                <div className="float-left">
                  <select className="form-select" name="" id="">
                    <option value="">Export Basic</option>
                    <option value="all">Export All</option>
                    <option value="selected">Export Selected</option>
                  </select>
                </div>
                <div className="float-right">
                  <input
                    className="me-2"
                    type="search"
                    name=""
                    id=""
                    placeholder="search"
                  />
                  <button
                    className=""
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "lightgrey",
                    }}
                  >
                    <TbLayoutBottombarCollapseFilled className="fs-3" />
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "lightgrey",
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                    }}
                  >
                    <FiRefreshCw className="fs-3" />
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "lightgrey",
                      borderRightColor: "transparent",
                    }}
                  >
                    <FaRegListAlt className="fs-3" />
                  </button>
                  <button
                    className=" "
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "lightgrey",
                    }}
                  >
                    <img src={Menu} alt="" style={{ height: "30px" }} />
                    <FaCaretDown className="fs-3" />
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      borderTopColor: "lightgrey",
                      borderLeftColor: "transparent",
                      borderBottomColor:"lightgray",
                      borderRightColor:"lightgray"
                    }}
                  >
                    <SlShareAlt className="fs-3" />
                    <FaCaretDown className="fs-3" />
                  </button>
                </div>
              </div>
              <div>
                <div className="" style={{ overflow: "auto" }}>
                  <table className="table table-hover table-bordered">
                    <thead className="">
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>S.No</th>
                        <th>PickupDate</th>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Hour</th>
                        <th>Minutes</th>
                        <th>Meridian</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {customers.length > 0 ? (
                        customers.map((customer, index) => (
                          <tr key={customer.id}>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td>{index + 1}</td>
                            <td>{customer.pickupDate}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.pickup}</td>
                            <td>{customer.destination}</td>
                            <td>{customer.hour}</td>
                            <td>{customer.min}</td>
                            <td>{customer.Meridian}</td>
                            <td className="">
                              <FaUserEdit
                                className="fs-3"
                                onClick={() => handleEdit(customer)}
                                style={{ color: "green", cursor: "pointer" }}
                              />
                              <TiUserDelete
                                className="fs-3"
                                onClick={() => handleDelete(customer.id)}
                                style={{ color: "red", cursor: "pointer" }}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="12">No bookings available.</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={12}>
                          <div className="">
                            <div className="float-left">
                              Showing 1 to 10 of 21 rows{" "}
                              <button
                                className="px-2 py-2"
                                style={{
                                  backgroundColor: "transparent",
                                  borderColor: "lightgrey",
                                }}
                              >
                                10 <FaCaretUp />
                              </button>
                              rows per page
                            </div>
                            <div className="float-right">
                              <button
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  borderColor: "lightgrey",
                                  borderRightColor: "transparent",
                                }}
                              >
                                <FaChevronLeft />
                              </button>
                              <button
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  borderColor: "blue",
                                }}
                              >
                                1
                              </button>
                              <button
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  borderLeftColor: "transparent",
                                  borderRightColor: "transparent",
                                  borderTopColor: "lightgrey",
                                  borderBottomColor: "lightgray",
                                }}
                              >
                                2
                              </button>
                              <button
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  borderColor: "lightgrey",
                                  borderRightColor: "transparent",
                                }}
                              >
                                3
                              </button>
                              <button
                                className="px-3 py-2"
                                style={{
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  borderColor: "lightgrey",
                                }}
                              >
                                <FaChevronRight />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            {/* <button className="btn btn-warning" type='button' onClick={handleBook}>Book Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookedmembers;
