import React from 'react';
import './Playlist.css';
//imported Components
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
constructor(props){
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
}
  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }
  render(){
    return(
      <div className="Playlist">

          <input  className='input-playlist' placeholder='PlayList Name *' onChange={this.handleNameChange}/>
          <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
          <a className="Playlist-save" onClick={this.props.onSave}><img src={require('./save.png')}/></a>

      </div>
    );
  }
}

export default Playlist;
