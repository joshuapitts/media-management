import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import "./registration.css";
import axios from "axios";
import { MediaContext } from "../../context/MediaContext";

export default function Registration() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const { fetchMediaForUser, resetMedia } = useContext(MediaContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchemaLogin = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short!")
      .max(15, "Too long!")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Too short!")
      .max(20, "Too long!")
      .required("Password is required"),
  });

  const validationSchemaRegister = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string()
      .min(3, "Too short!")
      .max(15, "Too long!")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Too short!")
      .max(20, "Too long!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (data) => {
    if (isLogin) {
      // Handle Login
      axios
        .post("http://localhost:3000/auth/login", data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info

            const user = response.data.user;
            resetMedia();
            fetchMediaForUser(user.id);
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("Login failed!");
        });
    } else {
      // Handle Registration
      axios
        .post("http://localhost:3000/auth", data)
        .then((response) => {
          alert("Registration successful!");
          console.log("Registration response:", response.data);
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Registration failed!");
        });
    }
  };

  return (
    <div className={`sharedBackground ${!showForm ? "backgroundActive" : ""}`}>
      <Topbar />
      <Navbar />
      <div className="registrationContent">
        {showForm && (
          <div className="formWrapper">
            <button className="closeButton" onClick={() => setShowForm(false)}>
              ✕
            </button>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={
                isLogin ? validationSchemaLogin : validationSchemaRegister
              }
            >
              <Form className="formContainer">
                {!isLogin && (
                  <>
                    <label>First Name: </label>
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="errorMessage"
                    />
                    <Field
                      autoComplete="off"
                      name="firstName"
                      placeholder="Enter your first name"
                    />

                    <label>Last Name: </label>
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="errorMessage"
                    />
                    <Field
                      autoComplete="off"
                      name="lastName"
                      placeholder="Enter your last name"
                    />

                    <label>Email: </label>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="errorMessage"
                    />
                    <Field
                      autoComplete="off"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </>
                )}

                <label>Username: </label>
                <ErrorMessage
                  name="username"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  autoComplete="off"
                  name="username"
                  placeholder="(Ex. John123...)"
                />

                <label>Password: </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="errorMessage"
                />
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Your password"
                  type="password"
                />

                {!isLogin && (
                  <>
                    <label>Confirm Password: </label>
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="errorMessage"
                    />
                    <Field
                      autoComplete="off"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      type="password"
                    />
                  </>
                )}

                <button type="submit">
                  {isLogin ? "Login" : "Register"}
                </button>
              </Form>
            </Formik>
            <button
              className="toggleButton"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Switch to Register" : "Switch to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
