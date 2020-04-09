import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

import GlobalSyles from "../GlobalStyles";

import ArtistRoute from "../ArtistRoute";

const DEFAULT_ARTIST_ID = "36QJpDe2go2KgaRleHCDTp";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((error) => {
        console.log(error);
        dispatch(receiveAccessTokenError());
      });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/artist/:artistId">
          <ArtistRoute />
        </Route>
        <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`}></Redirect>
      </Switch>
      <GlobalSyles />
    </Router>
  );
};

export default App;
