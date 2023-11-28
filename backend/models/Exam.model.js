const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
    unique: true,
  },
  questions: [
    {
      question: String,
      option1: String,
      option2: String,
      option3: String,
      option4: String,
      answer: {
        type: String,
        validate: {
          validator: function (value) {
            // Ensure that the answer is one of the options
            return (
              value === this.option1 ||
              value === this.option2 ||
              value === this.option3 ||
              value === this.option4
            );
          },
          message: 'Answer must be one of the provided options (option1, option2, option3, or option4).',
        },
      },
    },
  ],
  time:{
    type: Number
  }
});

module.exports = mongoose.model('Exam', examSchema);
