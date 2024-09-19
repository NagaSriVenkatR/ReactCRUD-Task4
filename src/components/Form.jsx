import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css';
import { FaLongArrowAltDown } from "react-icons/fa";
function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);
  const handleReset = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      fullName: "",
      phoneNumber: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
    setSelectedUser(null);
  };
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
  let upperCasePattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let specialCharacterPattern = /[~!@#%&()$^_?]/;
  let minlengthCharacterPattern = /^.{8,16}$/;
  let phonenumberPattern = /^([0-9]{10})$/;
  const validateForm = () => {
    let valid = true;
    let newErrors = [];
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    } else {
      newErrors.fullName = " ";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Mobile Number is required";
      valid = false;
    } else {
      if (!phonenumberPattern.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Mobile number should be 10 digits";
        valid = false;
      } else {
        newErrors.phoneNumber = " ";
      }
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
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      if (!minlengthCharacterPattern.test(formData.password)) {
        newErrors.password = "password must be between 8 to 16 characters";
        valid = false;
      } else if (!lowerCasePattern.test(formData.password)) {
        newErrors.password = "At least 1 lowercase character";
        valid = false;
      } else if (!numberPattern.test(formData.password)) {
        newErrors.password = "At least 1 number";
        valid = false;
      } else if (!specialCharacterPattern.test(formData.password)) {
        newErrors.password = "At least 1 special character";
        valid = false;
      } else if (!upperCasePattern.test(formData.password)) {
        newErrors.password = "At least 1 uppercase character";
        valid = false;
      } else {
        newErrors.password = " ";
      }
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Check your confirm password and password should be same";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (selectedUser) {
        // Update existing user
        setUsers(
          users.map((user) =>
            user.email === selectedUser.email ? formData : user
          )
        );
        setSelectedUser(null); // Clear selection after update
      } else {
        // Add new user
        setUsers([...users, formData]);
      }
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        fullName: "",
        phoneNumber: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/users");
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
                <form action="">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">Name</span>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">Email</span>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">PHONE NUMBER</span>
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">PICKUP</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your pickup location"
                    />
                  </div>
                  <div className="form-group text-start mb-3">
                    <span className="form-label">DESTINATION</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your destination location"
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group text-start mb-3">
                        <span className="form-label">PICKUP DATE</span>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Enter your pickup date"
                        />
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">HOUR</span>
                            <select className="form-control" name="" id="">
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
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">MIN</span>
                            <select className="form-control" name="" id="">
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
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group text-start mb-3">
                            <span className="form-label">AM/PM</span>
                            <select className="form-control" name="" id="">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-btn">
                    <input className='form-control bg-warning fw-bold' type="button" value="BOOK NOW" />
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
