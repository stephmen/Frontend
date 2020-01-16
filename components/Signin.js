import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from './User';
import { withApollo } from "../lib/apollo";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Signin = props => {
  const [signin, {data, loading, errors}] = useMutation(SIGNIN_MUTATION,{refetchQueries:["CURRENT_USER_QUERY"]})
  const { handleSubmit, register, error, reset } = useForm();

  const onSubmit = async(values, e) => {
      await signin({
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
              <h2>Sign In</h2>
              {/* <Error error={error} /> */}
              <Error error={errors} />
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

              <button type="submit">Sign In!</button>
              <br></br>
              <br></br>
              
              <button type="button" onClick={() => Router.push('/signup')}>Don't have an account ? Click Here</button>
              
            </fieldset>
          </Form>
        )}
      
    


export default Signin;
