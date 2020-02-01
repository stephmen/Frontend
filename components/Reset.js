import React, { useState } from 'react';
import { Mutation, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;


const Reset = props => {
  Reset.propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  
  const [password, setPassword]= useState()
  const [confirmPassword, setConfirmPassword]=useState()
  const [resetPassword, { error, loading, called }] = useMutation(RESET_MUTATION, { 
    variables:{
    resetToken: props.resetToken,
    password: password,
    confirmPassword: confirmPassword,
  },
  refetchQueries: [{ query: CURRENT_USER_QUERY }]
})
  
  
    return (
        
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              setPassword("");
              setConfirmPassword("")
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your Password</h2>
              <Error error={error} />
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirm Your Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </label>

              <button type="submit">Reset Your Password!</button>
            </fieldset>
          </Form>
        
    
    );
  
}

export default Reset;
