import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/react-hooks";
import withApollo from "../lib/nextApollo";
import { ALL_ITEMS_QUERY } from "./Items";
import { CURRENT_USER_QUERY } from './User';
import gql from "graphql-tag";
import { perPage } from '../config';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
const DeleteItem = props => {
  const client = useApolloClient();
  
  const [deleteItem, { data, loading, error }] = useMutation(
    DELETE_ITEM_MUTATION,
    {
        update(cache, payload) {
        //Read query
        const data = client.readQuery({ query: ALL_ITEMS_QUERY});
        console.log(data, { ...payload.data.deleteItem }, cache);
        
        //Filter Items
        data.items = data.items.filter(
          item => item.id !== payload.data.deleteItem.id
        );

        //Add item to cache
        client.writeQuery({
          query: ALL_ITEMS_QUERY,
          data: { ...data }
        });

      },
      refetchQueries: [{query: ALL_ITEMS_QUERY},{query: CURRENT_USER_QUERY}],
    }
  );

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          deleteItem({
            variables: {
              id: props.id,
            }
          }).catch(err => {
            alert(err.message);
          });;
        }
      }}
    >
      {props.children}
    </button>
  );
};

export default withApollo(DeleteItem);
