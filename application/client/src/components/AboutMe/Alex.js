import React from 'react';
import Image from "react-bootstrap/Image";
import "./alex.css"
import ProfileImg from "../../images/AboutMe/alex.png"

const Alex = () => {
    return (
		<div>
		  <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
			<a className="navbar-brand" href="">Alex Pena</a> <button className=
			"navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarSupportedContent" aria-controls=
			"navbarSupportedContent" aria-expanded="false" aria-label=
			"Toggle navigation"><span className=
			"navbar-toggler-icon"></span></button>
			<div className="collapse navbar-collapse" id=
			"navbarSupportedContent">
			  <ul className="navbar-nav ml-auto">
				<li className="nav-item">
				  <a className="nav-link" href="">Projects</a>
				</li>
				<li className="nav-item">
				  <a className="nav-link" href="">Contact</a>
				</li>
				<li className="nav-item">
				  <a className="nav-link" href="">Other</a>
				</li>
			  </ul>
			</div>
		  </nav>
		 <br/>
		  <h1> Alex Pena </h1>
		  <h3><a href="https://www.github.com/AlexHappyCode">My github</a></h3>
		  <h5> Hello my name is Alex Pena. I am working torwards a career in 
		  computer science, but I also have interests in psychology and 
		  philosophy. This is a website to showcase who I am 
		  and what I have done in computer science. I am a student currently
		  taking a graduate certificate in software enginering at San Francisco 
		  State University. I previously acquired my bachelors of science in 
		  Psychology at the University of California, San Diego </h5>
		  <Image src={ProfileImg} roundedCircle height="150px" />
		  <h3> Projects </h3>
		  <h4> MySql Database - Cloud Friend </h4>
		  <h5> In my Introduction to database className I implemented my own mysql
			database that works as a cloud storage web service. Users can 
			create an account and save their files on the cloud
			<a href="https://www.github.com/AlexHappyCode">My github</a>
		  </h5>
		  <h2> Contact </h2>
		  <h6> email: arpena94@gmail.com </h6>
		</div>
		    );
}

export default Alex;
