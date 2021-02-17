import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import ProfileImg from "../../images/AboutMe/roberto_profile.jpg"
import ProfileImg from "../../images/AboutMe/roberto.jpg"

const Roberto = () => {
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Image src={ProfileImg} roundedCircle height="150px" />
            </Row>
            <p className="text-center m-0"><b>Roberto Herman</b></p>
            <p className="text-center mt-0">Software Developer</p>

            <hr />

            <p>Throughout his journey as a Software Developer, Roberto has acquired the experience and skills necessary to tackle complex technical challenges. He has extensive knowledge in programming methodologies, data structures, and algorithms. </p>

            <p><b>Expert Areas:</b> Full stack web app development using programming languages and technologies such as JavaScript, HTML, CSS, React, Redux, as well as relational and non-relational databases.</p>

            <hr></hr>

            <p><b>Previous Projects</b></p>

            <ul>
                <li>
                    <b>Photify</b>
                    <p>Developed a photo sharing web app where the user creates an account, logs in, and is able to upload pictures and comment on other user’s photos. Account information, image data, and comments are stored in an SQL database.</p>
                </li>
                <li>
                    <b>Uno</b>
                    <p>Worked in a team of four to develop and host an UNO game web app with real-time state updates, using the DB as the single source of truth and an observer design pattern to keep track of changes. Features implemented: lobby chat, game queue, login/registration, sessions, scoreboard.</p>
                </li>
                <li>
                    <b>Web Server</b>
                    <p>
                        HTTP web server configured with directives in a plain-text config file. Able to log requests, authenticate users through headers and access files, execute CGI scripts, and multithreaded to process requests simultaneously. It handles GET, POST, PUT, DELETE, and HEAD methods, and responds with eight different status codes.
                    </p>
                </li>
                <li>
                    <b>Generating and Visualizing Data</b>
                    <p>
                        Assembled a set of programs that visualize data obtained from various sources and in different formats. Used matplotlib to visualize data in a window, and pygal to generate SVG files for interactivity. Data was extracted from CSV files as well as JSON responses from third party APIs.
                    </p>
                </li>
                <li>
                    <b>File System</b>
                    <p>
                        Designed and implemented a file system that had its own formatted volume. It used contiguous memory allocation to read/write data, a free-space bitmap to keep track of available space, a file control table to track open files and associated buffers. Its own command line functions. (2 months, team of 4, remote collaboration)
                    </p>
                </li>
            </ul>
        </Container>
    );
}

export default Roberto;