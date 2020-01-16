import React from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

// const Signout = props => {
// const [signout,{data}]= useMutation(SIGN_OUT_MUTATION,{refetchQueries: ["CURRENT_USER_QUERY"]} )
//   // <Mutation mutation={SIGN_OUT_MUTATION} ={[{ query:  }]}>
//     return(
//     <button onClick={signout}>Sign Out</button>
//     )}

const Signout = props => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => <button onClick={signout}>Sign Out</button>}
  </Mutation>)

export default Signout;
