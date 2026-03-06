import React from 'react'
import Hero from './components/Hero'
import MembershipForm from './components/MembershipForm'
import EventHighlighst from './components/EventHighlights'
import Footer from './components/Footer'

const HomePage = () => {
  return (
    <div className='text-4xl font-bold text-blue-600'>
      <Hero />
      <MembershipForm />
      <EventHighlighst />
      <Footer />
    </div>
  )
}

export default HomePage 
 