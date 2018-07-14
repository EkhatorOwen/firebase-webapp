import React, { Component } from 'react';
import firebase from './firebase'
import FileUploader from 'react-firebase-file-uploader'
import ImageCompressor from 'image-compressor.js'
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
      jimp: '',
      files: [],
      things: []
    }
    
  }

  startUploadManually =()=>{
    this.state.things.forEach(element=>{
      console.log(element)
      this.FileUploader.startUpload(element)
           firebase.storage().ref('profile').child(element.name).getDownloadURL().then(url=>{console.log(url)})
                
    })
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
    let arr = []
    let id = 7;
    let reader = new FileReader()
    let img =e.target.files[0];
    console.log('normal img ', img)
      let test = [];
      test = this.state.images.slice();
      test.push(img)
      this.setState({images: test})

  //  const formData = new FormData();
    let that = this;
   new  ImageCompressor(img, {
      quality: .3,//signifies how much quality you want on the photo
      success(result) {
      let newArr =   that.state.things.slice();
      console.log('image arr after resize ',result)
        newArr.push(result)
       that.setState({
         things: newArr
       })
      }
   })
   


   reader.addEventListener("load",()=>{
       arr = this.state.files.slice();
       id++    
       arr.push({
         id: id,
         url: reader.result,
       })

       this.setState({
         imgUrl:reader.result,
         files: arr
       }) 
   })


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
   
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       
       
        <FileUploader 
        //hidden -> this prop hides the defualt button. you can then wrap it in a custom label tag
        accept="image/*"
        name="avatar"
        storageRef={firebase.storage().ref('profile')}
        onChange={e=>this._handleImageChange(e)}
        ref ={instance=>{this.FileUploader=instance}}
        />
       {this.state.files && this.state.files.map((element,index)=>(<img key={index} src={element.url} height="200"  />))}
      
        <p>yep yep</p>
        {/* <input multiple type="file" onChange={e=>this._handleImageChange(e)}  /> */}
        <button onClick={this.startUploadManually} >Save</button>
      </div>
    );
  }
}

export default App;
