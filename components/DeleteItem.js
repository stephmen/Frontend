import React, { Component } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/react-hooks";
import { withApollo } from "../lib/apollo";
import { ALL_ITEMS_QUERY } from "./Items";
import gql from "graphql-tag";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const DeleteItem = props => {
  const client = useApolloClient();
  
  const [deleteItem, { data, loading, error }] = useMutation(
    DELETE_ITEM_MUTATION,
    {
      async update(cache, payload) {
        const data = client.readQuery({ query: ALL_ITEMS_QUERY });
        console.log(data, { ...payload.data.deleteItem }, cache);
        data.items = await data.items.filter(
          item => item.id !== payload.data.deleteItem.id
        );
        client.writeQuery({
          query: ALL_ITEMS_QUERY,
          data: { ...data }
        });

        console.log({ ...data });
        const lastcache = client.readQuery({ query: ALL_ITEMS_QUERY });
      },
      refetchQueries: [{query: ALL_ITEMS_QUERY}],
    }
  );

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          deleteItem({
            variables: {
              id: props.id
            }
          });
        }
      }}
    >
      {props.children}
    </button>
  );
};

export default DeleteItem;
