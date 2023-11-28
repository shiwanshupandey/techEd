import React, { Component } from 'react';
import axios from 'axios';
import "./allCourses.css";

class Create extends Component {
  constructor(props) {
    super();
    this.state = {
      type: '',
      id: '',
      name: '',
      price: '',
      creator: '',
      category: '',
      description: '',
      image: '',
      featured: '',
      // review: '',
      // stars: '',
      section: '',
      link: '',
      hours: '',
      certificate: '',
      file: '',
      requirements: '',
      // sample: '',
      syllabus: [
        {
          syllabusname: '',
          syllabusdescription: '',
          topic: [],
        },
      ],
      assignment:[
        {
          assignmenttitle: '',
          assignmentfile: '',
          assignmentupload: '',
        }
      ],
      exam:[{
        examfile: '',
          examupload: '',
      }],
      notification: [{
        title: '',
          description: '',
      }],
      courseId: null,
      categories: [],
    };

    this.onChangeProductsType = this.onChangeProductsType.bind(this);
    // this.onChangeProductsId = this.onChangeProductsId.bind(this);
    this.onChangeProductsName = this.onChangeProductsName.bind(this);
    this.onChangeProductsPrice = this.onChangeProductsPrice.bind(this);
    this.onChangeProductsSection = this.onChangeProductsSection.bind(this);
    this.onChangeProductsCreator = this.onChangeProductsCreator.bind(this);
    this.onChangeProductsDescription = this.onChangeProductsDescription.bind(this);
    this.onChangeProductsImage = this.onChangeProductsImage.bind(this);
    this.onChangeProductsFeatured = this.onChangeProductsFeatured.bind(this);
    // this.onChangeProductsReviews = this.onChangeProductsReviews.bind(this);
    // this.onChangeProductsStars = this.onChangeProductsStars.bind(this);
    this.onChangeProductsCategory = this.onChangeProductsCategory.bind(this);
    this.onChangeProductsLink = this.onChangeProductsLink.bind(this);
    this.onChangeProductsHours = this.onChangeProductsHours.bind(this);
    this.onChangeProductsCertificate = this.onChangeProductsCertificate.bind(this);
    this.onChangeProductsFile = this.onChangeProductsFile.bind(this);
    this.onChangeProductsRequirements = this.onChangeProductsRequirements.bind(this);
    // this.onChangeProductsSample = this.onChangeProductsSample.bind(this);
    this.onChangeSyllabusTitle = this.onChangeSyllabusTitle.bind(this);
    this.onChangeSyllabusDescription = this.onChangeSyllabusDescription.bind(this);
    this.onChangeAssignmentTitle = this.onChangeAssignmentTitle.bind(this);
    this.onChangeAssignmentfile = this.onChangeAssignmentfile.bind(this);
    this.onChangeAssignmentupload = this.onChangeAssignmentupload.bind(this);
    // this.onChangeExamfile = this.onChangeExamfile.bind(this);
    // this.onChangeExamupload = this.onChangeExamupload.bind(this);
    this.onChangeNotificationTitle = this.onChangeNotificationTitle.bind(this);
    this.onChangeNotificationdescription = this.onChangeNotificationdescription.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
    this.addSyllabusSection = this.addSyllabusSection.bind(this);
    this.addAssignmentSection = this.addAssignmentSection.bind(this);
    this.removeSyllabusSection = this.removeSyllabusSection.bind(this);
    this.removeAssignmentSection = this.removeAssignmentSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }


  componentDidMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    const token = localStorage.getItem("auth-token");

    if (token) {
      axios
        .post("http://localhost:5000/users/userData", { token })
        .then((response) => {
          const { status, data } = response.data;

          if (status === "ok") {
            const userEmail = data.email; 
            const userId = data._id;
            this.setState({ creator: userId, userId: userId });
          } else {
            console.error("Error:", data);
          }
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
    }
  }

  onChangeProductsType(e) {
    this.setState({ type: e.target.value })
  }

  // onChangeProductsId(e) {
  //   this.setState({ id: e.target.value })
  // }

  onChangeProductsName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeProductsPrice(e) {
    this.setState({ price: e.target.value })
  }

  onChangeProductsSection(e) {
    this.setState({ section: e.target.value })
  }

  onChangeProductsCreator(e) {
    this.setState({ creator: e.target.value })
  }

  onChangeProductsDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeProductsImage(e) {
    this.setState({ image: e.target.value })
  }

  onChangeProductsFeatured(e) {
    this.setState({ featured: e.target.value })
  }

  // onChangeProductsReviews(e) {
  //   this.setState({ review: e.target.value })
  // }
  
  // onChangeProductsStars(e) {
  //   this.setState({ stars: e.target.value })
  // }

  onChangeProductsCategory(e) {
    this.setState({ category: e.target.value })
  }

  

  onChangeProductsLink(e) {
    this.setState({ link: e.target.value })
  }

  onChangeProductsHours(e) {
    this.setState({ hours: e.target.value })
  }

  onChangeProductsCertificate(e) {
    this.setState({ certificate: e.target.value })
  }

  onChangeProductsFile(e) {
    this.setState({ file: e.target.value })
  }

  onChangeProductsRequirements(e) {
    this.setState({ requirements: e.target.value })
  }

  onChangeProductsSample(e) {
    this.setState({ sample: e.target.value })
  }


addTopic(sectionIndex) {
  this.setState((prevState) => {
    const updatedSyllabus = [...prevState.syllabus];
    if (!updatedSyllabus[sectionIndex].topic) {
      // Initialize the topics array if it doesn't exist
      updatedSyllabus[sectionIndex].topic = [];
    }
    updatedSyllabus[sectionIndex].topic.push({
      sectionId: '',
      topicfile: '',
      topiclinks: '',
      topicimage: '',
      topictitle: '',
      topicdescription: '',
    });
    return { syllabus: updatedSyllabus };
  });
}


addSyllabusSection() {
  const newSection = {
    syllabusname: '',
    syllabusdescription: '',
    topic: [],
  };

  this.setState((prevState) => ({
    syllabus: [...prevState.syllabus, newSection],
  }));
}

addAssignmentSection() {
  const newSection = {
    assignmenttitle: '',
    assignmentfile: '',
    assignmentupload: '',
  };

  this.setState((prevState) => ({
    assignment: [...prevState.assignment, newSection],
  }));
}

addNotification() {
  const newSection = {
    title: '',
    description: '',
  };

  this.setState((prevState) => ({
    notification: [...prevState.notification, newSection],
  }));
}

onChangeSyllabusTitle(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    syllabus: prevState.syllabus.map((section, i) =>
      i === index ? { ...section, syllabusname: value } : section
    ),
  }));
}

onChangeAssignmentTitle(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    assignment: prevState.assignment.map((section, i) =>
      i === index ? { ...section, assignmenttitle: value } : section
    ),
  }));
}

onChangeNotificationTitle(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    notification: prevState.notification.map((section, i) =>
      i === index ? { ...section, title: value } : section
    ),
  }));
}

onChangeAssignmentfile(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    assignment: prevState.assignment.map((section, i) =>
      i === index ? { ...section, assignmentfile: value } : section
    ),
  }));
}

// Function to handle changes in the syllabus description
onChangeSyllabusDescription(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    syllabus: prevState.syllabus.map((section, i) =>
      i === index ? { ...section, syllabusdescription: value } : section
    ),
  }));
}

onChangeAssignmentupload(e, index) {
  const { value } = e.target;
  this.setState((prevState) => ({
    assignment: prevState.assignment.map((section, i) =>
      i === index ? { ...section, assignmentupload: value } : section
    ),
  }));
}

removeTopic(sectionIndex, topicIndex) {
  this.setState((prevState) => {
    const updatedSyllabus = [...prevState.syllabus];
    const updatedTopics = [...updatedSyllabus[sectionIndex].topic];
    updatedTopics.splice(topicIndex, 1); // Remove the topic at the specified index
    updatedSyllabus[sectionIndex].topic = updatedTopics;
    return { syllabus: updatedSyllabus };
  });
}

removeSyllabusSection(index) {
  this.setState((prevState) => ({
    syllabus: prevState.syllabus.filter((_, i) => i !== index),
  }));
}

removeAssignmentSection(index) {
  this.setState((prevState) => ({
    assignment: prevState.assignment.filter((_, i) => i !== index),
  }));
}

removeNotification(index) {
  this.setState((prevState) => ({
    notification: prevState.notification.filter((_, i) => i !== index),
  }));
}


handleTopicChange(e, sectionIndex, topicIndex) {
  const { name, value } = e.target;
  this.setState((prevState) => {
    const updatedSyllabus = [...prevState.syllabus];
    const updatedTopics = [...updatedSyllabus[sectionIndex].topic];
    updatedTopics[topicIndex][name] = value;
    updatedSyllabus[sectionIndex].topic = updatedTopics;
    return {
      syllabus: updatedSyllabus,
    };
  });
}

handleAssignmentChange(e, sectionIndex) {
  const { name, value } = e.target;
  this.setState((prevState) => {
    const updatedAssignment = [...prevState.syllabus];
    return {
      assignment: updatedAssignment,
    };
  });
}


onChangeNotificationdescription(e, notificationIndex) {
  const { value } = e.target;
  this.setState((prevState) => {
    const updatedNotifications = [...prevState.notification];
    updatedNotifications[notificationIndex].description = value;
    return { notification: updatedNotifications };
  });
}

componentDidMount() {
  // Fetch categories data from the API
  axios.get('http://localhost:5000/category')
    .then(response => {
      const { data } = response;
      this.setState({ categories: data });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

  // Fetch user data as before
  this.fetchUserData();
}


  onSubmit(e) {
    e.preventDefault();

    const topicsData = this.state.syllabus.map((section) => ({
      syllabusname: section.syllabusname,
      syllabusdescription: section.syllabusdescription,
      topic: section.topic,
    }));

    const assignmentData = this.state.assignment.map((section) => ({
      assignmenttitle : section.assignmenttitle,
      assignmentfile: section.assignmentfile,
      assignmentupload: section.assignmentupload,
    }));

    const notificationData = this.state.notification.map((section) => ({
      title : section.title,
      description: section.description,
    }));

    const courses = {
        type: this.state.type,
        // id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
        section: this.state.section,
        creator: this.state.creator,
        description: this.state.description,
        image: this.state.image,
        featured: this.state.featured,
        // review: this.state.review,
        // stars: this.state.stars,
        link: this.state.link,
        hours: this.state.hours,
        certificate: this.state.certificate,
        file: this.state.file,
        requirements: this.state.requirements,
        // sample: this.state.sample,
        syllabus: topicsData,
        assignment: assignmentData,
        notification: notificationData,
    };

    // const courses = { ...this.state };

    axios
      .post('http://localhost:5000/products/add', courses)
      .then((res) => {

        const teacherUserId = this.state.creator;

        // Create a new Teacher document and associate it with the user and the created course
        const newTeacher = {
          user: teacherUserId,
          products: [res.data._id], // Assuming the course ID is returned in the response
        };
    
        // Send a POST request to create a new Teacher
        axios.post('http://localhost:5000/teacher', newTeacher)
          .then(() => {
            this.setState({
              successMessage: 'User created successfully!',
              errorMessage: '',
            });
          })
          .catch((teacherError) => {
            this.setState({
              errorMessage: 'Error creating teacher. Please check your data and try again.',
              successMessage: '',
            });
            console.error(teacherError);
          });

        this.setState({
          successMessage: 'User created successfully!',
          errorMessage: '',
        });

        console.log('Created course ID:', courseId);

        this.setState({
            type: '',
            id:'',
            name: '',
            price: '',
            category: '',
            section: '',
            creator: '',
            description: '',
            image: '',
            featured: '',
            review: '',
            stars: '',
            link:'',
            hours: '',
            certificate: '',
            file: '',
            requirements: '',
            sample: '',
            syllabus: [
              {
                syllabusname: '',
                syllabusdescription: '',
                topic: [
                  {
                    sectionId: '',
                    topicfile: '',
                    topiclinks: '',
                    topicimage: '',
                    topictitle: '',
                    topicdescription: '',
                  },
                ],
              },
            ],
            assignment:[
              {
                assignmenttitle: '',
                assignmentfile: '',
                assignmentupload: '',
              }
            ],
            notification: [
              {
                title: '',
                description: '',
              },
            ],
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

    const { syllabusname, syllabusdescription, topic } = this.state.syllabus[0] || {
      syllabusname: '',
      syllabusdescription: '',
      topic: [],
    };

    const {assignmenttitle, assignmentfile, assignmentupload} = this.state.assignment[0] || {
      assignmenttitle: '',
      assignmentfile: '',
          assignmentupload: '',
    };


    return (
      <div className="containe">
        
        <h3>Create New course</h3>
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        {this.state.successMessage && (
          <div className="alert alert-success">{this.state.successMessage}</div>
        )}
        <form onSubmit={this.onSubmit}>
        <hr></hr>
{/* <label class="random-form-label random-form-label-2">
Course Front
        </label> */}

        <div className="random-mb-5">
        <label for="name" className="random-form-label">name:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={this.state.name}
              onChange={this.onChangeProductsName}
            />
          </div>

          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">price:</label>
            <input
              type="number"
              required
              className="random-form-input"
              value={this.state.price}
              onChange={this.onChangeProductsPrice}
            />
          </div>

          <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Category:</label>
          <select
            className="random-form-input"
            value={this.state.category}
            onChange={this.onChangeProductsCategory}
          >
            <option value="">Select a category</option>
            {this.state.categories.map(category => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>


          <div className="random-mb-5">
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="type" value="Live"  onChange={this.onChangeProductsType} />
              <span className="name">Live</span>
            </label>
            <label className="radio">
              <input type="radio" name="type" value="Completed"  onChange={this.onChangeProductsType} />
              <span className="name">Completed</span>
            </label>
            <label className="radio">
              <input type="radio" name="type" value="Offline"  onChange={this.onChangeProductsType} />
              <span className="name">Offline</span>
            </label>
          </div>
        </div>

        <div class="radio-inputs">
          <h6>Featured: </h6>
            <label className="radio">
    <input type="radio" name="featured" value="true" onChange={this.onChangeProductsFeatured}/>
    <span className="name">True</span>
  </label>
  <label className="radio">
    <input type="radio" name="featured" value="false" onChange={this.onChangeProductsFeatured}/>
    <span className="name">False</span>
  </label>
                </div>



          <div class="radio-inputs">
            <label className="radio">
    <input type="radio" name="begineer" value="Begineer" onChange={this.onChangeProductsSection}/>
    <span className="name">Begineer</span>
  </label>
  <label className="radio">
    <input type="radio" name="moderate" value="Moderate" onChange={this.onChangeProductsSection}/>
    <span className="name">Moderate</span>
  </label>
  <label className="radio">
    <input type="radio" name="advance" value="Advance" onChange={this.onChangeProductsSection}/>
    <span className="name">Advance</span>
  </label>
                </div>

                <hr></hr>
<label class="random-form-label random-form-label-2">
Course Description
        </label>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">creator:</label>
            <input
              type="text"
              className="random-form-input"
              readOnly
              value={this.state.creator}
              // onChange={this.onChangeProductsCreator}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">description:</label>
            <input
              type="text"

              className="random-form-input"
              value={this.state.description}
              onChange={this.onChangeProductsDescription}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">image:</label>
            <input
              type="text"

              className="random-form-input"
              value={this.state.image}
              onChange={this.onChangeProductsImage}
            />
          </div>
          
          
                
          {/* <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">reviews:</label>
            <input
              type="number"
              className="random-form-input"
              value={this.state.review}
              onChange={this.onChangeProductsReviews}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">stars:</label>
            <input
              type="number"

              className="random-form-input"
              value={this.state.stars}
              onChange={this.onChangeProductsStars}
            />
          </div> */}
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">link:</label>
            <input
              type="text"

              className="random-form-input"
              value={this.state.link}
              onChange={this.onChangeProductsLink}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">Hours:</label>
            <input
              type="number"

              className="random-form-input"
              value={this.state.hours}
              onChange={this.onChangeProductsHours}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">certificate:</label>
            <input
              type="text"

              className="random-form-input"
              value={this.state.certificate}
              onChange={this.onChangeProductsCertificate}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">File:</label>
            <input
              type="text"
              className="random-form-input"
              value={this.state.file}
              onChange={this.onChangeProductsFile}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">requirements:</label>
            <input
              type="text"

              className="random-form-input"
              value={this.state.requirements}
              onChange={this.onChangeProductsRequirements}
            />
          </div>
          <br></br>
          <hr></hr>

                {this.state.syllabus && this.state.syllabus.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h4>Syllabus Section {sectionIndex+ 1}</h4>
            <br/>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.removeSyllabusSection(sectionIndex)}
            >
              Remove Syllabus Section
            </button>
            <br/>
            <br/>
            <div className="random-mb-5">
              <label htmlFor="name" className="random-form-label">Syllabus Name:</label>
              <input
                type="text"
                name="syllabusname"
                className="random-form-input"
                value={section.syllabusname}
                onChange={(e) => this.onChangeSyllabusTitle(e, sectionIndex)}
              />
            </div>
            <div className="random-mb-5">
              <label htmlFor="name" className="random-form-label">Syllabus Description:</label>
              <input
                type="text"
                name="syllabusdescription"
                className="random-form-input"
                value={section.syllabusdescription}
                onChange={(e) => this.onChangeSyllabusDescription(e, sectionIndex)}
              />
            </div>
            
            {/* Render topic fields here for each syllabus section */}
            {section.topic && section.topic.length > 0 && section.topic.map((topic, topicIndex) => (
              <div key={topicIndex}>
                <h5>Topic {topicIndex + 1}</h5>
                <br/>
                <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.removeTopic(sectionIndex, topicIndex)}
              >
                Remove Topic
              </button>
              <br/>
                {/* Render topic input fields here */}
                <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">Section ID:</label>
                <input
                  type="number"
                  name="sectionId"
                  className="random-form-input"
                  value={topic.sectionId}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicfile:</label>
                <input
                  type="text"
                  name="topicfile"
                  className="random-form-input"
                  value={topic.topicfile}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topiclinks:</label>
                <input
                  type="text"
                  name="topiclinks"
                  className="random-form-input"
                  value={topic.topiclinks}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicimage:</label>
                <input
                  type="text"
                  name="topicimage"
                  className="random-form-input"
                  value={topic.topicimage}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topictitle:</label>
                <input
                  type="text"
                  name="topictitle"
                  className="random-form-input"
                  value={topic.topictitle}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicdescription:</label>
                <input
                  type="text"
                  name="topicdescription"
                  className="random-form-input"
                  value={topic.topicdescription}
                  onChange={(e) => this.handleTopicChange(e, sectionIndex, topicIndex)}
                />
              </div>
              </div>
            ))}
            
            <button
              type="button"
              className="add-employeed-button"
              onClick={() => this.addTopic(sectionIndex)}
            >
              Add Topic
            </button>
            <br/>
          </div>
        ))}
        <br/>
        <button type="button" className="add-employeed-button" onClick={this.addSyllabusSection}>
          Add Syllabus Section
        </button>
        <br/>
        <br/>
        <hr></hr>
        {this.state.assignment && this.state.assignment.map((section, sectionIndex) => (
  <div key={sectionIndex}>
    <h4>Assignment Section {sectionIndex + 1}</h4>
    <br/>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => this.removeAssignmentSection(sectionIndex)}
    >
      Remove Assignment Section
    </button>
    <br/>
    <br/>
    <div className="random-mb-5">
      <label htmlFor="name" className="random-form-label">Assignment Title:</label>
      <input
        type="text"
        name="assignmenttitle"
        className="random-form-input"
        value={section.assignmenttitle}
        onChange={(e) => this.onChangeAssignmentTitle(e, sectionIndex)}
      />
    </div>
    <div className="random-mb-5">
      <label htmlFor="name" className="random-form-label">Assignment File:</label>
      <input
        type="text"
        name="assignmentfile"
        className="random-form-input"
        value={section.assignmentfile}
        onChange={(e) => this.onChangeAssignmentfile(e, sectionIndex)}
      />
    </div>
    <div className="random-mb-5">
      <label htmlFor="name" className="random-form-label">Assignment Upload:</label>
      <input
        type="text"
        name="assignmentupload"
        className="random-form-input"
        value={section.assignmentupload}
        onChange={(e) => this.onChangeAssignmentupload(e, sectionIndex)}
      />
    </div>
  </div>
))}
<br/>
<button type="button" className="add-employeed-button" onClick={this.addAssignmentSection}>
  Add Assignment Section
</button>
{/* <br/>
{this.state.notification && this.state.notification.map((notification, notificationIndex) => (
  <div key={notificationIndex}>
    <h4>Notification {notificationIndex + 1}</h4>
    <div className="random-mb-5">
      <label htmlFor="name" className="random-form-label">Notification Title:</label>
      <input
        type="text"
        name={`notifications[${notificationIndex}].title`}
        className="random-form-input"
        value={notification.title}
        onChange={(e) => this.onChangeNotificationTitle(e, notificationIndex)}
      />
    </div>
    <div className="random-mb-5">
      <label htmlFor="name" className="random-form-label">Notification Description:</label>
      <input
        type="text"
        name={`notifications[${notificationIndex}].description`}
        className="random-form-input"
        value={notification.description}
        onChange={(e) => this.onChangeNotificationdescription(e, notificationIndex)}
      />
    </div>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => this.removeNotification(notificationIndex)}
    >
      Remove Notification
    </button>
  </div>
))} */}
{/* <button type="button" className="add-employeed-button" onClick={this.addNotification}>
  Add Notification
</button> */}


<hr></hr>
          <div className="random-mb-5">
            <input type="submit" value="Create User Log" className="add-employeed-button" />
          </div>
        </form>
      </div>
    );
  }
}

export default Create;

