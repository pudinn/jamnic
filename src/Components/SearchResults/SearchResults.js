import React from 'react';
import './SearchResults.css';

//Imported Components
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component{
  render(){
    return(
          <div className="SearchResults">
              <h2 align='center'>Results</h2>
              <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
          </div>
    );
  }
}
export default SearchResults;
