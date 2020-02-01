import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Logout from "./Logout";

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Logout />
            </>
          )}
          {!me && (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
