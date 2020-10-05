import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
} from "react-router-dom";
export default function NewUserPage({
  formData,
  registerfetch,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="flex">
      <h4>register</h4>
      <div>
        {registerfetch.response && JSON.stringify(registerfetch.response)}
        {registerfetch.error && JSON.stringify(registerfetch.error)}
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-striped">
          <tbody>
            <tr>
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="name"
                value={formData.name}
              />
            </tr>
            <tr>
              <label>Email*</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="email"
                value={formData.email}
              />
            </tr>
            <tr>
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                onChange={handleChange}
                placeholder="contact"
                value={formData.contact}
              />
            </tr>
            <tr>
              <label>Country</label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                placeholder="country"
                value={formData.country}
              />
            </tr>
            <tr>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                placeholder="date of birth"
                value={formData.dob}
              />
            </tr>
            <tr>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
                value={formData.password}
              />
            </tr>
            <tr>
              <label>Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                placeholder="confirm password"
                value={formData.password_confirmation}
              />
            </tr>
            <tr>
              <button>Sign in</button>
              <Link to="/">back</Link>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
