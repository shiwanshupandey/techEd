import React,{ useContext }from 'react';
import AdImage from "../components/homeContent/adImage";
import Feature1 from "../components/homeContent/featureDiv/featureDiv1";
import Feature2 from "../components/homeContent/featureDiv/featureDiv2";
import Recommendations from "../components/homeContent/recommendations/recommendations";
import FillerDiv from "../components/homeContent/fillerDiv";
import TopCategories from "../components/homeContent/topCategories/topCategories";
import BecomeInstructor from "../components/homeContent/becomeInstructor";
import TrustedCompanies from "../components/homeContent/trustedCompanies";
import UdemyForBusiness from "../components/homeContent/udemyForBusiness";
import VideoAdDiv from "../components/homeContent/videoAdDiv";
// import { useNavigate, Link } from 'react-router-dom';
// import UserContext from '../components/context/userContext';
import useUserData from './userData';
import Teacher from './Teacher/teacher';


function HomeContent() {
    // const {userData} = useContext(UserContext);
    const userData = useUserData();
    if (userData && (userData.role === 'teacher')) {
        return (
            <div>
                <Teacher></Teacher>
            </div>
        );
      }
    return (
        <div>
            {/* {userData.user ? (
                <h1 className=''>Welcome {userData.user.fname}</h1>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )} */}
            <AdImage />
            <Feature1 />
            <Recommendations />
            <Feature2 />
            <FillerDiv />
            {/* <TopCategories /> */}
            <BecomeInstructor />
            <TrustedCompanies />
            <UdemyForBusiness />
            <VideoAdDiv />
        </div>
    );
}

export default HomeContent;