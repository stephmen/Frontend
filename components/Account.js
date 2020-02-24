import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Form from "./styles/Form.js";
import RequestReset from "./RequestReset";
import Styled from "styled-components";

const Underline = Styled.text` 
text-decoration: underline;
color: ${props => props.theme.black};
background-color: ${props => props.theme.blue};
hover: {
  background-color: ${props => props.theme.blue}
}
`;

const Account = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <div>
          {me && (
            <Form>
              <label>User Name: {me.name}</label>
              <label>User Email: {me.email}</label>
              
              <br></br>
              <Link href="/requestreset">
                <a><Underline>
                  <span>Change Your Password</span>
                </Underline>
                </a>
              </Link>
            </Form>
          )}
          {!me && <a>Please Login first</a>}
        </div>
      );
    }}
  </User>
);

export default Account;
