import React from 'react'
import Notes from './Notes'
import Notestate from '../Context/notes/Notestate1'

const Home = () => {

  return (
    <>
      <Notestate>
        <Notes />
      </Notestate>
    </>
  )

}

export default Home