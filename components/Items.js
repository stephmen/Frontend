import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import { withApollo } from "../lib/apollo";
import Pagination from './Pagination';
import { perPage } from '../config';


const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
      
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = props => {
  // useQuery Hook/
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY,{
    variables:{
      skip: props.page * perPage - perPage,
    }
  });
  console.log({ ...data });
  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    
    <Center>
       <Pagination page={props.page} />
      <ItemsList>
        {data.items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsList>
      <Pagination page={props.page} />
    </Center>
  );
};


export { ALL_ITEMS_QUERY };
export default Items;
