import React, { useState, useEffect }  from "react";
import "./recommendedVideos.css";
import VideoCard from "./videoCard";
import product1 from "../../../assests/1.jpg"
import product2 from "../../../assests/2.jpg"
import product3 from "../../../assests/3.jpg"
import product4 from "../../../assests/4.jpg"
import product5 from "../../../assests/5.jpg"

function RecommendedVideos (props) {


  return (
    <div className="recommendedVideos">
      
        <VideoCard
        key={props.id}
        courseTitle={props.title}
        imgSrc={product1}
        instructor={props.name}
        rating={4.6}
        noOfStudents={"(166,042)"}
        id = {1}
        price={"₹8,640"}
      />
      <VideoCard
        courseTitle={"The Complete Digital Marketing Course - 12 Courses in 1"}
        imgSrc={product2}
        instructor={""}
        rating={4.4}
        id = {2}
        noOfStudents={"(116,637)"}
        price={"₹8,640"}
      />
      <VideoCard
        courseTitle={
          "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp"
        }
        imgSrc={product3}
        instructor={"Dr. Anglea Yu"}
        rating={4.8}
        id = {3}
        noOfStudents={"(49,923)"}
        price={"₹8,960"}
      />
      <VideoCard
        courseTitle={
          "Cisco CCNA 200-301 – The Complete Guide to Getting Certified"
        }
        imgSrc={product4}
        instructor={"Neil Anderson"}
        rating={4.8}
        id = {4}
        noOfStudents={"(25,489)"}
        price={"₹1,280"}
      />
      <VideoCard
        courseTitle={
          "Advanced CSS and Sass: Flexbox, Grid, Animations and More!"
        }
        imgSrc={product5}
        instructor={"Jonas Schmedtmann"}
        rating={4.8}
        id = {5}
        noOfStudents={"(25,064)"}
        price={"₹8,640"}
      />
    </div>
  );
}


export default RecommendedVideos;
