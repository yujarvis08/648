import React from "react";
import ProfileImg from "../../images/AboutMe/AmitPic.png";

const Amit = () => {
  return (
    <div>
      <div>
        <img
          className="center"
          src={ProfileImg}
          style={{
            textAlign: "center",
            background:
              'url("https://cdn.bootstrapstudio.io/placeholders/1400x800.png") center / contain no-repeat',
          }}
          width="150px"
          height="500px"
        />
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "60px",
            color: "rgb(0,0,0)",
          }}
        >
          Amit Joshi
        </h1>
        <h1 className="text-center" style={{ fontSize: "18px" }}>
          Student at San Francisco State University
        </h1>
        <h1 style={{ textAlign: "center", fontSize: "18px" }}>GitHub</h1>
        <a
          className="text-center center"
          href="https://github.com/amitkhalsa25"
          style={{ textAlign: "left", fontSize: "13px" }}
        >
          https://github.com/amitkhalsa25
        </a>
        <h1 style={{ textAlign: "center", fontSize: "18px" }}>Linkedin</h1>
        <a
          className="text-center center"
          href="https://www.linkedin.com/in/amit-joshi-38140b194/"
          style={{ textAlign: "left", fontSize: "12px" }}
        >
          https://www.linkedin.com/in/amit-joshi-38140b194/
        </a>
        <h1 style={{ textAlign: "center", fontSize: "18px" }}>Email</h1>
        <a
          className="text-center center"
          href="mailto:amitkhalsa25@gmail.com"
          style={{ textAlign: "left", fontSize: "13px" }}
        >
          amitkhalsa25@gmail.com
        </a>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Education</h1>
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>
          San Francisco State University
        </h1>
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>
          Bachelor of Science - BS Computer Science
        </h1>
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>2018 - 2022</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Experience</h1>
        <h1 style={{ fontSize: "25px", textAlign: "center" }}>Comming soon</h1>
      </div>
      <div>
        <h1 style={{ textAlign: "center", paddingTop: "30px" }}>Projects</h1>
        <h1 style={{ textAlign: "center", fontSize: "25px" }}>
          Check GitHub Link!
        </h1>
        <a
          a
          className="text-center center"
          href="https://github.com/amitkhalsa25"
          style={{ textAlign: "left", fontSize: "13px" }}
        >
          https://github.com/amitkhalsa25
        </a>
      </div>
    </div>
  );
};
export default Amit;
