import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css';
import { FaLongArrowAltDown } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
function Form() {
  const createUserAPI =
    "https://6683c44d56e7503d1ade07d4.mockapi.io/userData/customerdata";
    const location = useLocation();
    const customerData = location.state?.customer;
  useEffect(() => {
    if (customerData) {
      setFormData({
        fullName: customerData.fullName || "",
        email: customerData.email || "",
        phoneNumber: customerData.phoneNumber || "",
        pickup: customerData.pickup || "",
        destination: customerData.destination || "",
        pickupDate: customerData.pickupDate || "",
        hour: customerData.hour || "",
        min: customerData.min || "",
        Meridian: customerData.Meridian || "",
      });
      setEditingCustomerId(customerData.id);
    }
  }, [customerData]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickup: "",
    destination: "",
    pickupDate : "",
    hour:"",
    min:"",
    Meridian:"",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickup: "",
    destination: "",
    pickupDate: "",
    hour: "",
    min: "",
    Meridian: "",
  });
   const [customers, setCustomers] = useState([]);
   const [editingCustomerId, setEditingCustomerId] = useState(null); 
  const handleBlur = (event) => {
    const { name, value } = event.target;
    let validateErrors = { ...errors };
    if (!value) {
      validateErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required `;
    } else {
      validateErrors[name] = "";
    }
    setErrors(validateErrors);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  let emailPattern =
    /^([a-zA-Z0-9]+)@([a-zA-Z0-9-]+).([a-zA-Z]+).([a-zA-Z]{2,20})$/;
  let phonenumberPattern = /^([0-9]{10,10})$/
  const validateForm = () => {
    let valid = true;
    let newErrors = [];
    if (!formData.fullName) {
      newErrors.fullName = "Name is required";
      valid = false;
    } else {
      newErrors.fullName = " ";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Enter valid email";
        valid = false;
      } else {
        newErrors.email = " ";
      }
    }
    if(!formData.phoneNumber){
      newErrors.phoneNumber = "Phonenumber is required";
      valid = false;
    }else{
      if(!phonenumberPattern.test(formData.phoneNumber)){
        newErrors.phoneNumber = "Enter valid phonenumber";
        valid = false;
      }else{
        newErrors.phoneNumber = "";
      }
    }
    if (!formData.pickup) {
      newErrors.pickup = "Pickup Location is required";
      valid = false;
    } else {
      newErrors.pickup = " ";
    }
    if (!formData.destination) {
      newErrors.destination = "Destination location is required";
      valid = false;
    } else {
      newErrors.destination = "";
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
      valid = false;
    } else {
      newErrors.pickupDate = "";
    }
    if (!formData.hour) {
      newErrors.hour = "Hour is required";
      valid = false;
    } else {
      newErrors.hour = "";
    }
    if (!formData.min) {
      newErrors.min = "Min is required";
      valid = false;
    } else {
      newErrors.min = "";
    }
    if (!formData.Meridian) {
      newErrors.Meridian = "Meridian is required";
      valid = false;
    } else {
      newErrors.Meridian = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      if (editingCustomerId) {
        fetch(`${createUserAPI}/${editingCustomerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((updatedCustomer) => {
            setCustomers(
              customers.map((customer) =>
                customer.id === editingCustomerId ? updatedCustomer : customer
              )
            );
            setEditingCustomerId(null);
            setFormData({
              fullName: "",
              email: "",
              phoneNumber: "",
              pickup: "",
              destination: "",
              pickupDate: "",
              hour: "",
              min: "",
              Meridian: "",
            });
          })
          .catch((error) =>
            console.error("Error updating customer:", error)
          );
          navigate("/customers");
      } else {
        fetch(createUserAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Successfully book the cab");
            } else {
              console.log("Faled to book the cab")
            }
          })
          .then((newCustomer) => {
            setCustomers([...customers, newCustomer]);
            setFormData({
              fullName: "",
              email: "",
              phoneNumber: "",
              pickup: "",
              destination: "",
              pickupDate: "",
              hour: "",
              min: "",
              Meridian: "",
            });
          })
          .catch((error) => { 
            console.error("Error creating customer:", error)
          });
          navigate("/customers");
      }
    }
  };
   const handleReset = () => {
     setFormData({
       fullName: "",
       email: "",
       phoneNumber: "",
       pickup: "",
       destination: "",
       pickupDate: "",
       hour: "",
       min: "",
       Meridian: "",
     });
     setErrors({
       fullName: "",
       email: "",
       phoneNumber: "",
       pickup: "",
       destination: "",
       pickupDate: "",
       hour: "",
       min: "",
       Meridian: "",
     });
     
   };
  return (
    <div className="booking">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="booking-form">
              <div className="form-header">
                <h1>BOOK A CAR</h1>
              </div>
              <div className=''>
                <form action="" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">Name</span>
                        <input
                          className="form-control"
                          type="text"
                          name="fullName"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger">{errors.fullName}</span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">Email</span>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger">{errors.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">PHONE NUMBER</span>
                    <input
                      className="form-control"
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">{errors.phoneNumber}</span>
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">PICKUP</span>
                    <input
                      className="form-control"
                      type="text"
                      name="pickup"
                      placeholder="Enter your pickup location"
                      value={formData.pickup}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">{errors.pickup}</span>
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">DESTINATION</span>
                    <input
                      className="form-control"
                      type="text"
                      name="destination"
                      placeholder="Enter your destination location"
                      value={formData.destination}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-danger">{errors.destination}</span>
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">PICKUP DATE</span>
                        <input
                          className="form-control"
                          type="date"
                          name="pickupDate"
                          placeholder="Enter your pickup date"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="text-danger">{errors.pickupDate}</span>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">HOUR</span>
                            <select
                              className="form-control"
                              name="hour"
                              id=""
                              value={formData.hour}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value=""></option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                            <FaLongArrowAltDown
                              className="select-arrow-hour"
                              style={{
                                position: "absolute",
                                right: "46%",
                                bottom: "23.5%",
                              }}
                            />
                            <span className="text-danger">{errors.hour}</span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">MIN</span>
                            <select
                              className="form-control"
                              name="min"
                              id=""
                              value={formData.min}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value=""></option>
                              <option value="00">00</option>
                              <option value="05">05</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="4">20</option>
                              <option value="5">25</option>
                              <option value="6">30</option>
                              <option value="7">35</option>
                              <option value="8">40</option>
                              <option value="9">45</option>
                              <option value="10">50</option>
                              <option value="11">55</option>
                            </select>
                            <FaLongArrowAltDown
                              className="select-arrow-min"
                              style={{
                                position: "absolute",
                                right: "37%",
                                bottom: "23.5%",
                              }}
                            />
                            <span className="text-danger">{errors.min}</span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">Meridian</span>
                            <select
                              className="form-control"
                              name="Meridian"
                              id=""
                              value={formData.Meridian}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value=""></option>
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                            <FaLongArrowAltDown
                              className="select-arrow-am"
                              style={{
                                position: "absolute",
                                right: "28%",
                                bottom: "23.5%",
                              }}
                            />
                            <span className="text-danger">{errors.Meridian}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn mb-3">
                    <button
                      className="form-control btn btn-warning fw-bold"
                      type="submit"
                      value="BOOK NOW"
                    > BOOK NOW</button>
                    
                  </div>
                  <div className="form-btn">
                    <button
                      className="form-control btn btn-danger fw-bold"
                      type="Reset"
                      value="CANCEL NOW"
                      onClick={handleReset}
                    >CANCEL NOW</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form
