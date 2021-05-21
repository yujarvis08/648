import React from 'react';
import GoogleMapReact from 'google-map-react';
// bootstrap
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
// images
import hermesLogo from "./hermes-logo.png";

const GoogleMap = ({ restaurant }) => {

    return (
        <Container style={{ height: '300px', width: '100%' }}>
            {restaurant &&
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyDO7JFON_fZUbhuDA3tps2xQfTMMpR172U"
                    }}
                    center={[restaurant.lat, restaurant.lng]}
                    zoom={14}
                    draggable={true}
                >
                    <img src={hermesLogo}
                        height="40px"
                        width="40px"
                        lat={restaurant.lat}
                        lng={restaurant.lng}
                        text={restaurant.name}
                    />
                </GoogleMapReact>
            }
        </Container>
    )
}
export default GoogleMap;