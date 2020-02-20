import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';

import Cart from './Cart';
import UserMenu from './UserMenu'
import Search from './Search';


Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(0deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.blue};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .top-bar {
    display: flex;
    grid-template-columns: auto 2fr;
    margin-right: 80px; 
    justify-content: space-between;
    /*    align-items: stretch; */
    @media (max-width: 1300px) {
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: flex;
    grid-template-columns: auto 2fr; 
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    z-index: -1;
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="top-bar">
      <Logo>
        <Link href="/">
          <a>MyEccom</a>
          </Link>
      </Logo>
      <Nav />
    </div>
    <div className="bar">
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
    <UserMenu />
  </StyledHeader>
);

export default Header;
