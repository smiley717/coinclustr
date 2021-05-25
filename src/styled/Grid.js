import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.fill},
    minmax(${(props) => props.minWidth}, ${(props) => props.maxWidth})
  );
  width: 100%;
  grid-gap: ${(props) => props.gap}px;
`;

export default Grid;
