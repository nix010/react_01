import './App.css';
import React from "react";
import { getMediaList, postUrlList } from "./apis/index.js";
import MediaList from "./components/MediaList";
import MediaListFilter from "./components/MediaListFilter";

class App extends React.Component {
  state = {
    inputUrls: '',
    mediaList: {},
    page: 1,
    loading: false,
    filters: {
      title: '',
      type: '',
    }
  };

  updateData() {
    const {page, filters} = this.state;
    const {title, type} = filters;
    getMediaList({title, type, page}).then(resp => resp.json()).then(({data})=>{
      this.setState({mediaList: data})
    });
  }
  componentDidMount() {
    this.updateData()
  }

  submitUrlList(){
    const {inputUrls, loading} = this.state;
    if(loading) return;

    const urls = inputUrls.split(",");
    this.setState({loading: true});
    postUrlList({urls}).then(resp => resp.json()).then(({results})=>{
      this.setState({loading: false, inputUrls: ''}, (e)=>{
        setTimeout(this.updateData.bind(this), 200)
      });
    });
  }

  onUrlInputChange({target}){
    this.setState({inputUrls: target.value})
  }

  onChangePage(page){
    this.setState({page}, this.updateData);
  }

  onFilterValueChange(newValue){
    this.setState({filters: {...this.state.filters, ...newValue}})
  }

  render(){
    const {mediaList, inputUrls, page, loading, filters} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Media list</h1>
          <textarea onChange={this.onUrlInputChange.bind(this)} value={inputUrls}/>
          <button onClick={this.submitUrlList.bind(this)}>Scraper urls</button>
          <br/>
          {loading && <h2>Loading....</h2>}
          <MediaListFilter
            filters={filters}
            onChangeValues={this.onFilterValueChange.bind(this)}
            onSubmit={this.updateData.bind(this)}
          />

          <MediaList
            mediaList={mediaList}
            currentPage={page}
            onChangePage={this.onChangePage.bind(this)}
          />
        </header>
      </div>
    );
  }
}

export default App;
