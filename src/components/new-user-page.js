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
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="name"
                  value={formData.name}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Email*</label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="email"
                  value={formData.email}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Contact</label>
              </td>
              <td>
                <input
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  placeholder="contact"
                  value={formData.contact}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Country</label>
              </td>
              <td>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  placeholder="country"
                  value={formData.country}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Date of Birth</label>
              </td>
              <td>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  placeholder="date of birth"
                  value={formData.dob}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="password"
                  value={formData.password}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Confirm Password</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={handleChange}
                  placeholder="confirm password"
                  value={formData.password_confirmation}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Sign in</button>
              </td>
              <td>
                <button><Link to="/">back</Link></button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
