import React from 'react';
import './App.css';

//Components Imported
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    searchResults : [],

    playlistName : 'Nicaragua',

    playlistTracks: []
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack =  this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
};

addTrack(track) {
  let CurrentTracks = this.state.playlistTracks;
  if(!this.state.playlistTracks.find(t => t.name === track.name)) {
        CurrentTracks.push(track);
  }
  else {
    alert('Track already added');
  }
        this.setState({playlistTracks: CurrentTracks});
};


removeTrack(track){

   let tracks = this.state.playlistTracks;
 const removeTrack = tracks.filter(playlistTrack => track.id !== playlistTrack.id);
 this.setState({ playlistTracks: removeTrack });
};

updatePlaylistName(name){
  this.setState({playlistName: name})
};

savePlaylist() {
   const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
   Spotify.savePlaylist(this.state.playlistName, trackURIs);
   this.setState({
     searchResults: [],
     playlistTracks: []
   });
   this.updatePlaylistName('My playlist');

 }

search(term){
Spotify.getAccessToken();
  //console.log(term);
  Spotify.search(term).then(searchResults => this.setState({
        searchResults: searchResults
      }));

};

  render(){
    return(
      <div>

        <h1>Jamm<span className="highlight">Nic</span></h1>

        <div className="App">

            <SearchBar onSearch={this.search} />
            <div className="App-playlist">

            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
            </div>

        </div>

      </div>
    );
  }
}

export default App;
