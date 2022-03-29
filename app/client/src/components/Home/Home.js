import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {
  return (
    <>
      <div className="header">
          <div className="header-search">
              <form>
                  <span className="search-icon">
                      <FontAwesomeIcon icon="fa-magnifying-glass" />
                  </span>
                  <input type="search" placeholder="Produkte suchen"></input>
              </form>
          </div>
      </div>
      <div className="content">Hey das ist mein Zuhause</div>
    </>
  )
}

export default Home;