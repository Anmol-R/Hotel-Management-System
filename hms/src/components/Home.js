import React from 'react'
import styled from "styled-components";
import Section from "./Section"

function Home() {
  return (
    <Container>
        
        <Section
        title = "Welcome"
        description = "Arrive as guests, leave as family. Our hotel is where hospitality meets warmth."
        backgroundImg = "home-1.jpg"
        leftBtnText = "Have You been here before ?"
        rightBtnText = ""
        />
        <Section
        title = "Dormatory"
        description = "Order Online for Touchless Delivery"
        backgroundImg = "Dormatory.jpg"
        leftBtnText = "Book now"
        rightBtnText = ""
        />
        <Section
        title = "Sharing"
        description = "Order Online for Touchless Delivery"
        backgroundImg = "Sharing.jpg"
        leftBtnText = "Book now"
        rightBtnText = ""
        />
        <Section
        title = "Apartment"
        description = "Money-back guarantee"
        backgroundImg = "apartment.jpg"
        leftBtnText = "Book now"
        rightBtnText = ""
        />
        <Section
        title = "Book now"
        description = ""
        backgroundImg = "booking.jpg"
        leftBtnText = "Book now"
        />
    </Container> 
  )
}

export default Home

const Container = styled.div`
    height : 100vh;
`