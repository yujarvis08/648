import React from 'react';
import Image from "react-bootstrap/Image";
import ProfileImg from "../../images/AboutMe/alex.png"

const Alex = () => {
    return (
		<html lang="en">
		<head>
		  <meta name="generator" content=
		  "HTML Tidy for HTML5 for Linux version 5.7.16">
		  <meta charset="UTF-8">
		  <title></title>
		  <link rel="stylesheet" href=
		  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		  integrity=
		  "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
		  crossorigin="anonymous">
		  <link rel="stylesheet" href="style.css">
		</head>
		<body>
		  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light">
			<a class="navbar-brand" href="">Alex Pena</a> <button class=
			"navbar-toggler" type="button" data-toggle="collapse"
			data-target="#navbarSupportedContent" aria-controls=
			"navbarSupportedContent" aria-expanded="false" aria-label=
			"Toggle navigation"><span class=
			"navbar-toggler-icon"></span></button>
			<div class="collapse navbar-collapse" id=
			"navbarSupportedContent">
			  <ul class="navbar-nav ml-auto">
				<li class="nav-item">
				  <a class="nav-link" href="">Projects</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link" href="">Contact</a>
				</li>
				<li class="nav-item">
				  <a class="nav-link" href="">Other</a>
				</li>
			  </ul>
			</div>
		  </nav>
		  <br>
		  <br>
		  <br>
		  <br>
		  <h1> Alex Pena </h1>
		  <h3><a href="https://www.github.com/AlexHappyCode">My github</a></h3>
		  <hr>
		  <h5> Hello my name is Alex Pena. I am working torwards a career in 
		  computer science, but I also have interests in psychology and 
		  philosophy. This is a website to showcase who I am 
		  and what I have done in computer science. I am a student currently
		  taking a graduate certificate in software enginering at San Francisco 
		  State University. I previously acquired my bachelors of science in 
		  Psychology at the University of California, San Diego </h5>
		  <br>

		  <Image src={ProfileImg} roundedCircle height="150px" />

		  <br><br><br>
		  <h3> Projects </h3>
		  <hr>
		  <h4> MySql Database - Cloud Friend </h4>
		  <h5> In my Introduction to database Class I implemented my own mysql
			database that works as a cloud storage web service. Users can 
			create an account and save their files on the cloud
			<a href="https://www.github.com/AlexHappyCode">My github</a>
		  </h5>
		  <br><br>
		  <h2> Contact </h2>
		  <hr>
		  <h6> email: arpena94@gmail.com </h6>

		  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
		  integrity=
		  "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
		  crossorigin="anonymous"></script> 
		  <script src=
		  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		  integrity=
		  "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		  crossorigin="anonymous"></script> 
		  <script src=
		  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		  integrity=
		  "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		  crossorigin="anonymous"></script>
		</body>
		</html>
                );
}

export default Roberto;
