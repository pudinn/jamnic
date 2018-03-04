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

    searchResults : [
      {
        id: 1,
        name: 'Strobe',
        artits:'Deadmau5',
        album: 'For Lack Of A Better Name'
      },
      {
        id: 2,
        name: 'Aural Psynapse',
        artits: 'Deadmau5',
        album: 'Aural Psynapse'
      }
    ],

    playlistName : 'Nicaragua',

    playlistTracks: [
      {
        id: 3,
        name: 'Too Long',
        artits:'Daft Punk',
        album: 'Discovery'
      },
      {
        id: 4,
        name: 'Short Circuit',
        artits: 'Daft Punk',
        album: 'Discovery'
      }
    ]
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

savePlaylist(){
//const trackURIs = this.state.playlistTracks;
Spotify.savePlaylist();
this.setState =(
  {
    playlistName : 'New Playlist',
    searchResults: []
  });
};

search(term){
  //console.log(term);
  Spotify.search(term).then(searchResults => this.setState({
        searchResults: searchResults
      }));

};

  render(){
    return(
      <div>

        <h1>Ja<span className="highlight">mmm</span>ing</h1>

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
