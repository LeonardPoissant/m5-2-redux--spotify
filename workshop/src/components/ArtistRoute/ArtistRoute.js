import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { humanizeNumber } from "../../utils";

import { authReducer } from "../../reducers/auth-reducer";

//import CircularProgress from "@material-ui/core/CircularProgress";

import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistError,
} from "../../actions";

import { useDispatch } from "react-redux";

import { fetchArtistProfile } from "../../helpers/api-helpers";

//dispatch le fetchartist profile au sotre

const ArtistRoute = () => {
  const { artistId } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const artistStatus = useSelector((state) => state.artists.status);
  const artistProfile = useSelector((state) => state.artists.currentArtist);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistInfo());

    fetchArtistProfile(accessToken, artistId).then((data) =>
      dispatch(receiveArtistInfo(data))
    );
  }, [accessToken, artistId]);

  if (artistStatus === "loading") {
    return <div>LOADING</div>;
  }

  const numOfFollowers = artistProfile.followers.total;

  return (
    <Wrapper>
      <Header>
        <Avatar src={artistProfile.images[0].url} />
        <Name>{artistProfile.name}</Name>
        <FanBox>
          <Fans>{humanizeNumber(numOfFollowers)} </Fans> followers
        </FanBox>
      </Header>

      <TagsTitle>Tags</TagsTitle>
      <Genre>
        {artistProfile.genres.slice(0, 2).map((genre) => (
          <Tags>{genre}</Tags>
        ))}
      </Genre>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f4f4f;
  height: 100vh;
  width: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  display: block;
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Name = styled.div`
  margin-top: -30px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 45px;
  color: #f2f2f2;
  text-shadow: 4px 8px 25px #000000, 0px 4px 4px rgba(0, 0, 0, 0.5),
    1px 2px 2px rgba(0, 0, 0, 0.75);
`;

const FanBox = styled.div`
  display: flex;
  margin-top: 100px;
`;

const Fans = styled.span`
  font-weight: bold;
  color: #00ffff;
`;

const TagsTitle = styled.div`
  color: white;
  font-size: 21;
  margin-top: 100px;
  margin-bottom: 0px;
`;

const Genre = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Tags = styled.div`
  position: relative;
  display: flex;
  border-radius: 6px;
  background: #0a1010;
  color: white;
  padding: 8px 20px;
  margin: 0 8px;
  font-weight: 600;
  font-size: 11px;
`;

export default ArtistRoute;
