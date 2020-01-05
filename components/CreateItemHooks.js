import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import { withApollo } from "../lib/apollo";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItemHooks = props => {
  const [addItem, { data, loading, error }] = useMutation(
    CREATE_ITEM_MUTATION,
    {
      onCompleted(data) {
        console.log(data.createItem.id);
        // Router.push({
        //   pathname: "/item",
        //   query: { id: data.createItem.id }
        // });
      }
    }
  );
  const { handleSubmit, register, errors, reset } = useForm();

  const [images, setImageUrl] = useState({});

  const onSubmit = (values, e) => {
    values.price = parseInt(values.price);
    addItem({
      variables: {
        ...values,
        ...images
      }
    });
    e.target.reset();
  };
  const uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "myeccom");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/daijqhfen/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    setImageUrl({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
  useEffect(() => console.log("with useEffect: " + images.image));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
          />
          {images.image && (
            <img width="200" src={images.image} alt="Upload Preview" />
          )}
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
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
            ref={register({
              required: "Required"
            })}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default withApollo(CreateItemHooks);
export { CREATE_ITEM_MUTATION };
