import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
//const dotenv = require('dotenv').config();

const API_KEY = 'AIzaSyCZZiENLS1wWlnTbkkee49AgK5bq7EofEg';

// import App from './components/app';
// import reducers from './reducers';
//
// const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>, document.querySelector('.container'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       })
    });
  }
  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term)}, 300);


  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
        videos={this.state.videos}
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
      </div>
  )
}

}


ReactDOM.render(<App/>,document.querySelector('.container'));
