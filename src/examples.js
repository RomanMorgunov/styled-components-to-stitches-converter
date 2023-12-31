// styled-components
const Button = styled.button`
  color: red;
  font-size: 14px;
  &:hover {
    color: black;
    font-size: 14px;
  }
`;

// Stitches
const Button = styled("button", {
  color: "red",
  fontSize: "14px",
  "&:hover": {
    color: "black",
    fontSize: "14px"
  }
});