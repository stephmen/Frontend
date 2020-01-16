import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout'
import Form from './styles/Form.js'

const Account = () => (
  <User>
     {({ data }) => {
      const me = data ? data.me : null
      return (
        <div>
       
        { me && (
          <Form>
          <label>{me.name}</label>
          <label>{me.email}</label>
          <label>{me.name}</label>
          </Form>
        )}
        { !me && (
         
            <a>Please Login first</a>
          

        )}
      </div>
    )
  }}
  </User>
);

export default Account;
