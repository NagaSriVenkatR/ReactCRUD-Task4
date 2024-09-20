import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css';
import { FaLongArrowAltDown } from "react-icons/fa";
function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickup: "",
    destination: "",
    pickupDate : "",
    hour:"",
    min:"",
    clock:"",
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
    clock: "",
  });
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
    if (!formData.clock) {
      newErrors.clock = "Clock is required";
      valid = false;
    } else {
      newErrors.clock = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    }
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
              <div>
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
                                right: "47%",
                                bottom: "16.5%",
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
                                right: "39%",
                                bottom: "16.5%",
                              }}
                            />
                            <span className="text-danger">{errors.min}</span>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">AM/PM</span>
                            <select
                              className="form-control"
                              name="clock"
                              id=""
                              value={formData.clock}
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
                                right: "31.5%",
                                bottom: "16.5%",
                              }}
                            />
                            <span className='text-danger'>{errors.clock}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn">
                    <input
                      className="form-control bg-warning fw-bold"
                      type="submit"
                      value="BOOK NOW"
                    />
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
