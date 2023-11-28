import axios from 'axios';
import styled from "styled-components";
import React, { Component } from 'react';
 
class SumbitForm extends Component {
 
    state = {
 
        // Initially, no file is selected
        selectedFile: null
    };
 
    // On file select (from the pop up)
    onFileChange = event => {
 
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
 
    };
 
    // On file upload (click the upload button)
    onFileUpload = () => {
 
        // Create an object of formData
        const formData = new FormData();
 
        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
 
        // Details of the uploaded file
        console.log(this.state.selectedFile);
 
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };
 
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
 
        if (this.state.selectedFile) {
 
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
 
                    <p>File Type: {this.state.selectedFile.type}</p>
 
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
 
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
 
    render() {
 
        return (
            <Wrapper className="sort-section">
                <div>
                <h1>
                    GeeksforGeeks
                </h1>
                <h3>
                    File Upload using React!
                </h3>
                <div>
                    <input className="file" type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
            </Wrapper>
            
        );
    }
}

const Wrapper = styled.section`
  display: center;
  justify-content: space-between;
  margin-top: 5rem;
  margin-left: 50rem;
  margin-right: 50rem;
  border:1px solid;

  .file {
    display: center;
    gap: 2rem;
    margin-left: 45%;
    margin-bottom: 2rem;
  }
`;
 
export default SumbitForm;