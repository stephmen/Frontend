import { Query } from "react-apollo";
import React, { useState, useEffect, useMutation } from "react";
import { useQuery } from "@apollo/react-hooks";
import Error from "./ErrorMessage";
import gql from "graphql-tag";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";
import PropTypes from "prop-types";
import withApollo from "../lib/nextApollo";


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

const UserPermissions = props => {
    const user = props.user;
    
    UserPermissions.propTypes = {
      user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        id: PropTypes.string,
        permissions: PropTypes.array
      }).isRequired
    };
  
    const [permissions, setPermissions] = useState(props.user.permissions);
    const [updatePermissions, { loading, error }] = useMutation(
      UPDATE_PERMISSIONS_MUTATION,
      {
        variables: {
          permissions: permissions,
          userId: props.user.id
        }
      }
    );
  
    return (
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
          <button>Update</button>
        </td>
      </tr>
    );
  };

  export default UserPermissions;