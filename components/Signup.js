import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import withApollo from "../lib/nextApollo";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = props => {
  const [signup, {data, loading, errors}] = useMutation(SIGNUP_MUTATION)
  const { handleSubmit, register, error, reset } = useForm();

  const onSubmit = (values, e) => {
      signup({
          variables:{
              ...values
          }
      })
      e.target.reset();
      console.log({ ...values })
  }
 

    return (
      
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  ref={register({
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                      }
                  })}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  ref={register({
                    required: "Required"
                  })}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  ref={register({
                    required: "Required"
                  })}
                />
              </label>
              <button type="submit">Sign Up!</button>
              <br></br>
              <br></br>
              <Link href="/signup">
              <a>Don't have an account ?</a>
              </Link>
              <br></br>
              <br></br>
              <Link href="/requestreset">
              <a>Reset Password</a>
              </Link>
            </fieldset>
          </Form>
        )}
      
    


export default withApollo(Signup);
