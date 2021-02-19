import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ProfileImg from "../../images/AboutMe/jarvis.jpeg";

const Jarvis = () => {
  return (
    <Container>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      ></link>
      <div class="container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
        <div class="row">
          <div class="col-lg-8">
            <div>
              <Image src={ProfileImg} roundedCircle height="150px" />
              <div>
                <h1>
                  Jarvis Yu
                </h1>
                <p>
                  Hello, I am Jarvis. I am currently a senior at San Francisco
                  State University studying Computer Science. Over the past few
                  years in school, I mainly coded in Java and some C++. I have a
                  few projects that I have done in school up on my GitHub page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="card"
      >
        <div class="card-body">
          <h5 class="card-title">My GitHub</h5>
          <a
            href="https://github.com/yujarvis08"
            class="btn btn-primary stretched-link"
          >
            Click Here
          </a>
        </div>
      </div>
    </Container>
  );
};
export default Jarvis;
