import React, { Component } from 'react';
import firebase from './firebase'
import FileUploader from 'react-firebase-file-uploader'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state={
      images: [],
      count: 0,

    }
    
  }
  handleUploadSuccess=filename=>{
    firebase
        .storage()
        .ref('profile')
        .child(filename)
        .getDownloadURL()
        .then(url=> {
          console.log(url)
          let img = this.state.images.slice();
                let id = 88;
              img.push({
                id: id,
                url: url
              })
              id++
              this.setState({images: img})
        })
  }

  upload=()=>{
      
  }

  remove =(index)=>{
    let arr = this.state.images;
          arr.splice(index,1)
          this.setState({images: arr})
  }

  handleChange=(event)=>{
    const { target: { files } } = event;
   
  }
  render() {
    console.log(this.state.images)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       
        {this.state.images && this.state.images.map((element,index)=>{return (<img onClick={()=>this.remove(index)} key={index} src={element.url} height="100" width="100" />)})}
        <FileUploader 
        //hidden -> this prop hides the defualt button. you can then wrap it in a custom label tag
        accept="image/*"
        name="avatar"
        storageRef={firebase.storage().ref('profile')}
        onUploadSuccess={this.handleUploadSuccess}
        />
        <button onClick={this.upload} >Upload</button>
      </div>
    );
  }
}

export default App;
