import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import withApollo from "../lib/nextApollo";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;
// useMutation Hook
const UpdateItem = props => {
  const [updateItem, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(
    UPDATE_ITEM_MUTATION,
    {
      onCompleted(dataUpdate) {
        console.log(dataUpdate.updateItem.id);
      }
    }
  );
  // useForm Hook react-hook-form
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = values => {
    values.price = parseInt(values.price);
    updateItem({
      variables: {
        ...values,
        id: props.id
      }
    });
  };
  // useQuery Hook
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: props.id
    }
  });
  if (loading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {props.id}</p>;
  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Error error={errorUpdate} />
        <fieldset disabled={loadingUpdate} aria-busy={loadingUpdate}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              defaultValue={data.item.title}
              ref={register({
                required: "Required"
              })}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              defaultValue={data.item.price}
              ref={register({
                required: "Required"
              })}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Enter A Description"
              defaultValue={data.item.description}
              ref={register({
                required: "Required"
              })}
            />
          </label>
          <button type="submit">Sav{loadingUpdate ? "ing" : "e"} Changes</button>
        </fieldset>
      </Form>
  );
};
export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
