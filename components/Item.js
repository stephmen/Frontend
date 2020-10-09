import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';


const Item = (props) => {
  
  
  Item.propTypes = {
    item: PropTypes.object.isRequired,
  };

    const { item } = props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}

        <Title>
          <Link
            href={{
              pathname: '/item',
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        

        <div className="buttonList">
          <AddToCart id={item.id} />  
        </div>
      </ItemStyles>
    );
  }

  Item.propTypes = {
    item: PropTypes.object.isRequired,
  };
  export default Item

