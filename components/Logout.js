import React from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Logout = props => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries:[{query: CURRENT_USER_QUERY}]
  })
  
    return(
    <button onClick={() => signout()}>Logout</button>
    )}

export default Logout;
