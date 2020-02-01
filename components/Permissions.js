//import { Query } from 'react-apollo';
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';
import { withApollo } from "../lib/nextApollo";

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }

  }
`;

const Permissions = props => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY)
      
if(loading) return(<div>LOADDIING</div>) 
return(
      <div>
        <Error error={error} />
        <div>
    
          <h2>Manage Permissions</h2>
          <p></p>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
              </tr>
            </thead>
            <tbody>{data.users.map(user => <UserPermissions user={ user } />)}</tbody>
          </Table>
        </div>
      </div>
    )
  }
  ;

const UserPermissions = props => {
  
  UserPermissions.propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };
  
  const [permissions, setPermissions]=useState(props.user.permissions)
  const handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    setPermissions(updatedPermissions);
    
  };


  

  const [updatePermissions,{loading, error}]=useMutation(UPDATE_PERMISSIONS_MUTATION,{
    variables:{
      permissions: permissions,
      userId: props.user.id
    }
  })
 
    const user = props.user;
    return (
      <>
      {error && <tr><td colSpan="8"><Error error={error} /></td></tr>}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type="checkbox"
                 checked={permissions.includes(permission)}
                value={permission}
                onChange={handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
        <button type="button" disabled={loading} onClick={updatePermissions}>
          Updat{loading ? 'ing' : 'e'}
        </button>
        </td>
      </tr>
      </>
    );
  }


export default Permissions;
