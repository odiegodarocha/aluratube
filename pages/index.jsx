import React, { useEffect, useState } from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();
  const [filterValue, setFilterValue] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    service
      .getVideo()
      .select("*")
      .then((videoData) => {
        const newPlaylists = { ...playlists };
        videoData.data.forEach((video) => {
          if (!newPlaylists[video.playlist]) {
            newPlaylists[video.playlist] = [];
          }
          newPlaylists[video.playlist].push(video);
        });
        setPlaylists(newPlaylists);
      });
  }, []);

  return (
    <>
      <div>
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Banner />
        <Header />
        <Timeline filterValue={filterValue} playlists={playlists} />
        <Channels channels={config.channels} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
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

function Timeline({ filterValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];

        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const filterValueNormalized = filterValue.toLowerCase();

                  return titleNormalized.includes(filterValueNormalized);
                })
                .map((item) => {
                  return (
                    <a key={item.id} href={item.url}>
                      <img src={item.thumbnail} />
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

function Channels(props) {
  const channelsNames = Object.keys(props.channels);

  return (
    <StyledTimeline>
      {channelsNames.map((channelsName) => {
        const items = props.channels[channelsName];

        return (
          <section key={channelsName}>
            <h2>Canais Favoritos</h2>
            <div className="channel-info">
              {items.map((item) => {
                return (
                  <a key={item.url} href={item.url}>
                    <img src={item.thumbnail} />
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
