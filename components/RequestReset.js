import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const Signin = props => {
  
  const [email, setEmail] = useState();
  const [requestReset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: { email }
    }
  );
  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await requestReset();
        setEmail("");
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange= {e => setEmail(e.target.value)} 
          />
        </label>

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
