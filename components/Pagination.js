import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";


const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY,{
    ssrMode: true,
    onCompleted: data => { }
  });
  
  if (loading) return <p>Loading...</p>;
  const count = data.itemsConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);
  const page = props.page;

  return (
    <PaginationStyles>
      <Head>
        <title>
          Page {page} of {pages}
        </title>
      </Head>
      <Link
        //prefetch
        href={{
          pathname: "items",
          //pathname: "index",
          query: { page: page - 1 }
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {props.page} of {pages}
      </p>
      <p>{count} Items Total</p>
      <Link
        //prefetch
        href={{
          pathname: "items",
          //pathname: "index",
          query: { page: page + 1 }
        }}
      >
        <a className="prev" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
