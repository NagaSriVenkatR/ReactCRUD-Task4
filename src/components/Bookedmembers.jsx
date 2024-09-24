import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function Bookedmembers({ onEditCustomer }) {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md mt-5" style={{ overflow: "auto" }}>
          <table className="table table-striped table-success table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>FullName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>PickupDate</th>
                <th>Hour</th>
                <th>Minutes</th>
                <th>Meridian</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.pickup}</td>
                    <td>{customer.destination}</td>
                    <td>{customer.pickupDate}</td>
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bookedmembers;
