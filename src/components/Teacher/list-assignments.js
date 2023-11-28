import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TeacherData from '../teacherData';
import { Link } from 'react-router-dom';

const AssignmentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 20px;
`;

const AssignmentList = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const AssignmentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const AssignmentName = styled.span`
  flex-grow: 1;
  font-size: 18px;
  color: #555;
`;

const AssignmentDetails = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const DownloadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function AssignmentTeacher() {
  const [assignments, setAssignments] = useState([]);
  const teacherData = TeacherData();

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await axios.get('http://localhost:5000/assignment/get'); // Adjust the URL to match your server
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    }

    fetchAssignments();
  }, []);

  const handleDownload = (assignmentId, fileName) => {
    axios({
      url: `http://localhost:5000/assignment/download/${assignmentId}`, // Adjust the URL to match your server
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <AssignmentListContainer>

      <AssignmentList>
        <Heading>Assignment List</Heading>
        {assignments.map((assignment) => (
          <AssignmentItem key={assignment._id}>
            <AssignmentName>{assignment.name}</AssignmentName>
            <AssignmentDetails>
              <p>{assignment.user}</p>
              <p>{assignment.products}</p>
            </AssignmentDetails>
            <DownloadButton onClick={() => handleDownload(assignment._id, assignment.file)}>
              Download
            </DownloadButton>
          </AssignmentItem>
        ))}
      </AssignmentList>
      <Link to = "/teacherdata">
      <p>teacher</p>
      </Link>
      
    </AssignmentListContainer>
    
  );
}

export default AssignmentTeacher;
