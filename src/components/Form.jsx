import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './Form.css';
function Form() {
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
                      <div className="form-group">
                        <span className="form-label">Name</span>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <span className="form-label">Email</span>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="form-label">Phone Number</span>
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <span className="form-label">Pickup Location</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your picup location"
                    />
                  </div>
                  <div className="form-group"></div>
                  <div className="row"></div>
                  <div className="form-btn"></div>
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
