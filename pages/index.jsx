import React, { useState } from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";

function HomePage() {
  const [filterValue, setFilterValue] = useState("");

  return (
    <>
      <CSSReset />
      <div>
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Banner />
        <Header />
        <Timeline filterValue={filterValue} playlists={config.playlists} />
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

function Timeline({filterValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];

        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const filterValueNormalized = filterValue.toLowerCase();

                return titleNormalized.includes(filterValueNormalized)
              }).map((item) => {
                return (
                  <a key={item.url} href={item.url}>
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