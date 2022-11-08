import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";

function HomePage() {
  return (
    <>
      <CSSReset />
      <div>
        <Menu />
        <Banner />
        <Header />
        <Timeline playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  .userImage {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .userInfo {
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
  }
`;
function Header() {
  return (
    <StyledHeader>
      <section className="userInfo">
        <img src="" alt="" />
        <img
          src={`https://github.com/${config.github}.png`}
          alt=""
          className="userImage"
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline(propriedades) {
  const playlistNames = Object.keys(propriedades.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];

        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((item) => {
                return (
                  <a href={item.url}>
                    <img src={item.thumb} />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}