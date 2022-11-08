import config from "../../config.json";
import styled from "styled-components";

export const StyledBanner = styled.div`
  max-height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Banner() {
  return (
    <StyledBanner>
      <img src={config.banner} alt="Banner" />
    </StyledBanner>
  );
}