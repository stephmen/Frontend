import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { withApollo } from '../lib/nextApollo'

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    allItems(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      image {
        publicUrlTransformed
      }
      name
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

const  AutoComplete = (props) => {
  const [findItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS_QUERY);
  const items = data ? data.allItems : [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  return (
    <SearchStyles>
      <Downshift
        onChange={routeToItem}
        itemToString={item => (item === null ? '' : item.name)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search For An Item',
                id: 'search',
                className: loading ? 'loading' : '',
                onChange: e => {
                  e.persist();
                  findItemsButChill({
                    variables: { searchTerm: e.target.value },
                  });
                },
              })}
            />

            {isOpen && (
              <DropDown>
                {items.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img
                      width="50"
                      src={item.image.publicUrlTransformed}
                      alt={item.name}
                    />
                    {item.name}
                  </DropDownItem>
                ))}
                {!items.length && !loading && (
                  <DropDownItem> Nothing Found {inputValue}</DropDownItem>
                )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
}

export default withApollo(AutoComplete); 