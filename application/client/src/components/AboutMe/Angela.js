import React from "react";
import "./Angela.css";
import Image from "react-bootstrap/Image";
import ProfileImg from "../../images/AboutMe/angela.jpg";

const Angela = () => {
  return (
    <div>
      <h1>
        {" "}
        Angela Avina Garcia <br />
      </h1>
      <h2>
        <Image src={ProfileImg} roundedCircle height="150px" />
      </h2>
      {/* <img src="angela.jpg" width = "140" height = "220" >  */}

      <p>
        {" "}
        “It is better to be prepared for an opportunity that isn’t there than to
        be unprepared for one that is.” Jose Cuellar
      </p>
      <p>
        Hello! My name is Angela and I am a fourth year student at San Francisco
        State University.
        <br /> Currently persuing a career in Computer Science in hopes of
        reducing the gender gap that we continously encounter in STEM jobs.
      </p>
      <h3>
        GitHub: aavina22
        <p>---- projects in the making ----</p>
        Programming languages: <br />
        * Java
        <br />
        * Python
        <br />
        * C++
        <br />
      </h3>
      <p>
        Skills:
        <br />
        * Fast learner
        <br />
        * Social
        <br />
        * Bilingual
        <br />
        * Leadership
        <br />
        * Interpreter
        <br />
      </p>

      <p>Contact info: aavinagarcia@mail.sfsu.edu</p>

      <div>
        <footer>Copyright &copy; Angela Avina Garcia | 2021</footer>
      </div>
    </div>
  );
};

export default Angela;
