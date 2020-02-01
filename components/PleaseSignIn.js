import { useQuery } from "@apollo/react-hooks";
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Login from './Login';

const PleaseSignIn = props => {
      const {loading,data}=useQuery(CURRENT_USER_QUERY)
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Login />
          </div>
        );
      }
      return props.children;
    
  
    };

export default PleaseSignIn;


