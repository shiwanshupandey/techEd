import React, { Component } from 'react';
import axios from 'axios';

class CreateCategory extends Component {
  constructor(props) {
    super();
    this.state = {
        category:'',
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeCategory(e) {
    this.setState({ category: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const category = {
      category: this.state.category,
    };

    axios
      .post('http://localhost:5000/category', category)
      .then((res) => {
        this.setState({
          successMessage: 'category created successfully!',
          errorMessage: '',
        });

        this.setState({
            category:'',
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Error creating user. Please check your data and try again.',
          successMessage: '',
        });
        console.error(error);
      });
  }

  render() {
    return (
      <div className="containe">
        <h3>Create New category Log</h3>
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        {this.state.successMessage && (
          <div className="alert alert-success">{this.state.successMessage}</div>
        )}
        <form onSubmit={this.onSubmit}>
          <div className="random-mb-5">
            <label for="name" className="random-form-label">Category:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={this.state.category}
              onChange={this.onChangeCategory}
            />
          </div>
          <div className="random-mb-5">
            <input type="submit" value="Create category Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCategory;




