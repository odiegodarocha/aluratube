import config from "../../config.json";
import styled from "styled-components";

export const StyledBanner = styled.div`
  height: 286px;
  overflow: hidden;
  background-image: url(${config.banner});
  background-position: center;
`;

export default function Banner() {
  return (
    <StyledBanner />
  );
}