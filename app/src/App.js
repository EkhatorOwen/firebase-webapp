import React, { Component } from 'react';
import firebase from './firebase'
import FileUploader from 'react-firebase-file-uploader'
import jimp from 'jimp'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state={
      images: [],
      count: 0,
      file: '',
      imgUrl: '',
      jimp: ''

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

  _handleImageChange=(e)=>{
    
    let reader = new FileReader()
    let img =e.target.files[0];
    //   console.log(img.name)
    
    reader.onloadend=()=>{
      this.setState({
        file:img,
        imgUrl: reader.result
      })
    }
      reader.readAsDataURL(img)
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
        <img src={this.state.imgUrl} height="150" width="150" />
        <p>yep yep</p>
        <input type="file" onChange={e=>this._handleImageChange(e)}  />
        <button onClick={this.upload} >Save</button>
      </div>
    );
  }
}

export default App;
