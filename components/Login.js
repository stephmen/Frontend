import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from './User';


const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Login = props => {
  const [signin, {data, loading, errors}] = useMutation(
    SIGNIN_MUTATION, 
    {
  refetchQueries:[{query: CURRENT_USER_QUERY}],
  onCompleted() { 
    Router.push({
        pathname: "/items",
      })   
    }}
  )
  const { handleSubmit, register, error, reset } = useForm();

  const onSubmit = async(values, e) => {
      await signin({
          variables:{
              ...values
          }
      })
      e.target.reset();
    
  }
 

    return (
      
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            
            <fieldset disabled={loading} aria-busy={loading}>
              
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

              <button type="submit">Login</button>
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
      
    

export default Login;
