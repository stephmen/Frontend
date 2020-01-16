
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;


const User = props => {
 const {loading, data, error}=useQuery(CURRENT_USER_QUERY)
 if (loading) return <p>Loading</p>
 return (
  <div>
    { props.children({ data })}
  </div>
 )
}


User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
