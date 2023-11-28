const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  type:{
    type:String,
  },
    id:{
        type: Number
      },
    name: {
        required: true,
        type: String
    },
    price: {
          required: true,
          type:  Number
        },
    section:{
          required: true,
            type: String
        },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
        },
    category: {
          required: true,
            type: String
        },
    description:{
          required: true,
            type: String
        },
    image:{
      required: true,
      type: String
    },
    featured: {
      default: false,
            type: Boolean
        },
      review:{
        type: Number
      },
      stars:{
        type: Number
      },
      bought:{
            type: Boolean
      },
      link:{
        default: true,
        type:String
      },
      createdAt: {type: Date, default: Date.now},
      hours:{
        required: true,
          type:  Number
      },
      certificate:{type:String},
      file: {
        type: String
      },
      requirements:{
        type: String
      },
      sample:{
        default : false ,
        type: Boolean
      },
      syllabus:[
        {
          topic:[
            {
              sectionId: Number,
              topicfile: String,
              topiclinks: String,
              topicimage: String,
              topictitle: String,
              topicdescription: String,
            }
          ],
          syllabusname: String,
          syllabusdescription: String,
          live: {
            default : false,
            type: Boolean
          },
        }
      ],
      assignment:[
        {
          assignmenttitle: {type: String},
          assignmentfile: {type: String},
          assignmentupload: {type: String},
        }
      ],
      exam:[
        {
          examfile: {type: String},
          examupload: {type: String},
        }
      ],
      notification:[
        {
          title: {type: String},
          description: {type: String},
        }
      ],
      
})

module.exports = products = mongoose.model("products", productsSchema);