import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Form from "./styles/Form.js";
import RequestReset from "./RequestReset";
import Styled from "styled-components";

const Underline = Styled.a`
font-size: 
text-decoration: underline;
`;

const Account = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <div>
          {me && (
            <Form>
              <label>{me.name}</label>
              <label>{me.email}</label>
              <br></br>
              <Link href="/requestreset">
                <Underline>
                  <a>Reset Your Password</a>
                </Underline>
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
