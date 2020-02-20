import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.black};
  /* transform: rotate(3deg); */
  color: white;
  font-weight:400;
  padding: 5px;
  line-height: 1;
  font-size: 2rem;
  display: inline-block;
  position: absolute;
  /* top: -3px; */
  /* right: -3px; */
`;

export default PriceTag;
      