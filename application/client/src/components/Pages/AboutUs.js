import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// images
import AboutUsImg from "./about-us.jpeg";

const AboutUs = () => {
    return (
        <Container>
            <h1 className="text-center mt-5">About Us</h1>
            <hr />
            <br />
            <Row>
                <Col md={6}>
                    <p>
                        Hermes strives to get food delivered to SFSU students, staff, and faculty anywhere on
                        campus as quickly as possible. This application was built by SFSU students who know
                        the importance of having easy access to the foods we love. Only then can we truly
                        focus on our studies and consistently perform efficiently and to the best of our
                        abilities.
        </p>
                    <p>
                        We put the SFSU customer at the center of our design, and welcome feedback from all
                        of our customers so that we may serve you better.
        </p>
                </Col>
                <Col md={6}>
                    <Image src={AboutUsImg} fluid />
                </Col>
            </Row>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Container>
    )
}

export default AboutUs;