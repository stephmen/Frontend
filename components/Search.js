import React, { useState } from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import withApollo from '../lib/nextApollo'

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { title_contains: $searchTerm } ) {
      id
      image
      title
    }
  }
`;

// const SEARCH_ITEMS_QUERY = gql`
//   query SEARCH_ITEMS_QUERY($searchTerm: String!) {
//     items(where: {
//         OR: [
//           { title_contains: $searchTerm }
//           { description_contains: $searchTerm }
//         ]
//       }
//     ) {
//       id
//       image
//       title
//     }
//   }
// `;

function routeToItem(item) {
  if(item){
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  })};
}


const AutoComplete = (props) => {


  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    setLoading(true);
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
      console.log(res.data.items)
      setItems(res.data.items),
      setLoading(false)
    ;
  }, 350);
  
    return (
      <SearchStyles>
        <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)} id="resources-search">
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
        <div>
          <ApolloConsumer>
          {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For An Item',
                      id: 'search',
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        onChange(e, client);
                      },
                    })}
                  />
                )}
          </ApolloConsumer>
          {isOpen && (
          <DropDown>
            {items.map((item, index) => (
              <DropDownItem
              {...getItemProps({ item })}
              key={item.id}
              highlighted={index === highlightedIndex}
              >
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
            {!items.length &&
                    !loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}                
          </DropDown>
          )}
        </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }


export default AutoComplete;
