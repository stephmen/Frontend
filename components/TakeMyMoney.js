import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from "@apollo/react-hooks";
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import withApollo from '../lib/nextApollo'

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}






const TakeMyMoney = (props) => {
  const [createOrder, {loading, data, error }]= useMutation(CREATE_ORDER_MUTATION,{
  refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  const onToken = async (res, createOrder) => {
    NProgress.start();
    console.log('On Token Called!');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    console.log(order.data)
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };
  
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="MyEccom"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_pU69LByw24qvdKcOQF7q2e5K00lWHKBGqD"
            currency="USD"
            email={me.email}
            token={res => onToken(res, createOrder)}
          >
            {props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }


export default TakeMyMoney;
