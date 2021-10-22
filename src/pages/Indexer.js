import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom'
import { TeamContext } from '../GlobalContext'
import NavBar from '../comps/NavBar'
import Team from '../pages/Team'
import Initiator from '../pages/Initiator'
// import ManageCommons from '../pages/ManageCommons'

function Indexer() {
  // ----- React router config
  const location = useLocation()
  const teamContract = location.state.teamContract
  const teamName = location.state.teamName
  const teamMembers = location.state.teamMembers

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div>
        <TeamContext.Provider value={{ teamContract, teamName, teamMembers }}>
          <NavBar />
          <Switch>
            <Route path='/team' exact component={Team} />
            <Route path='/initiator' exact component={Initiator}
            />
            {/* <Route path='/community/mint' exact component={() => <MintNFT />} /> */}
          </Switch>
        </TeamContext.Provider>
      </div>
    </Router>
  )
}

export default Indexer
