import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import User from "./User";
import MyItem from "./MyItem";
import withApollo from "../lib/nextApollo";
import Pagination from "./Pagination";
import { perPage } from "../config";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
      user{id}
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

const MyItems = props => {
  // useQuery Hook
  const { loading: loading2, data: data2, error: error2 } = useQuery(
    ALL_ITEMS_QUERY,
    {
      variables: {
        skip: props.page * perPage - perPage
      },
       
        onCompleted: data => {},
        ssrMode: true
      }
    
  );

  // const { loading2, data2, error2 } = useQuery(CURRENT_USER_QUERY, {
  //   onCompleted: data => {
  //     console.log("Data Arrived");
  //     console.log(data.me);
  //   }
  // });

  if (loading2) return <p>Loading...</p>;
  // if (loading2) return <p>Loading...</p>;
  if (error2) return <p>Error: {error2.message}</p>;

  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null;
        return (
          <div>
            {me && (
              <Center>
                <Pagination page={props.page} />
                <ItemsList>
                  {data2.items.map(item => {
                    if(item.user.id === data.me.id) return(
                    <MyItem item={item} key={item.id} me={data.me} />)
                  })}
                </ItemsList>
                <Pagination page={props.page} />
              </Center>
            )}
            {!me && <a>Please Login first</a>}
          </div>
        );
      }}
    </User>
  );
};

export { ALL_ITEMS_QUERY };
export default MyItems;
