import React, { useState, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SelectTeam from './pages/SelectTeam'
import Indexer from './pages/Indexer'
import { ethers } from 'ethers'
import { projectFirestore } from './firebase/config'

function App() {
  const [account, setAccount] = useState(null)
  const [teams, setTeams] = useState([])

  // ----- Smart Contract Interaction Config
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

  // Detect NETWORK change in Metamask and reload ~ provided by ethers.js
  provider.on('network', (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload()
    }
  })

  const getAccount = async () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((result) => {
        console.log('Account connected - ' + result[0])
        setAccount(result[0])
      })
  }

  const getAllTeams = async () => {
    const allTeams = []
    const query = await projectFirestore.collection('team').get()
    query.forEach((doc) => {
      const teamData = {
        contract: doc.data().contract,
        members: doc.data().members,
        name: doc.data().name,
        chain: doc.data().chain,
        timeStamp: doc.data().createdAt,
      }
      allTeams.push(teamData)
      allTeams.sort((a, b) => b.timeStamp - a.timeStamp)
      setTeams([...allTeams])
    })
  }

  useEffect(() => {
    getAccount()
    getAllTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div className='App' class='font-mono'>
        <GlobalContext.Provider value={{ account }}>
          <Switch>
            <Route
              path='/'
              exact
              component={() => <SelectTeam teams={teams}/>}
            />
            <Route path='/team' exact component={() => <Indexer />} />
          </Switch>
        </GlobalContext.Provider>
      </div>
    </Router>
  )
}

export default App;
