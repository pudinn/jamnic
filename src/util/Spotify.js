let accessToken;
let clientId = 'cda98f1a058a4b5b88b18af1e60f5c6f';
let redirectUri = 'http://localhost:3000/';


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term){

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks)
        {
          return [];
        }
        else {
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
        }
      });
  },

savePlaylist(playlistName,trackURIs){
  if(!playlistName || !trackURIs){
    return;
  }
  else {
    let actkn = accessToken;
    let headers = {
      'Authorization': 'Bearer ' + actkn
    };
    let user_id;
    let playlistID;
    fetch('https://api.spotify.com/v1/me', {
      headers: headers
    })
    .then(response => response.json())
    .then(jsonResponse => user_id = jsonResponse.id)
    .then(() => {
      fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
        })
        .then(response => response.json())
        .then(jsonResponse => playlistID = jsonResponse.id)
        .then(() => {
          fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`,
            {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({uris: trackURIs})
          });
        });
    })
  }
}
};


export default Spotify;
