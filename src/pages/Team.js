import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import SHOUTOUT_ABI from '../comps/SHOUTOUT_ABI'
import { GlobalContext, TeamContext } from '../GlobalContext'
import { projectFirestore } from '../firebase/config'
import Team_Shoutout from '../comps/Team_Shoutout'
import ScoreForm from '../comps/ScoreForm'


const Team = () => {
  // ----- useState
  const [member, setMember] = useState("")
  const [members, setMembers] = useState("")

  const [initiator, setInitiator] = useState("")
  const [initiatorButton, setInitiatorButton] = useState(false)

  // ----- useContext
  const { account } = useContext(GlobalContext)
  const { teamContract, teamName } = useContext(TeamContext)

  // ----- Smart Contract Interaction Config
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()

  // ----- Check owner status to toggle Admin button
  const isInitiator = async () => {
    const _contract = new ethers.Contract(teamContract, SHOUTOUT_ABI, signer)
    try {
      _contract.initiator().then((data) => {
        setInitiator(data)
          if (data.toLowerCase() === account) {
            setInitiatorButton(true)
          }
        }).catch((e) => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  // ----- Check whitelist status to toggle Mint button
  const isMember = async () => {
    const _contract = new ethers.Contract(teamContract, SHOUTOUT_ABI, signer)
    try {
      _contract
        .members(account)
        .then((data) => {
          if (data[0]) {
            setMember(account)
          } 
        })
        .catch((e) => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  const getTeamMembers = async () => {
    const members = []
    const query = await projectFirestore
      .collection('team')
      .where('contract', '==', teamContract)
      .get()
    query.forEach((doc) => {
      doc.data().members.forEach((member) => {
        members.push(member)
      })
      setMembers(members)
    })
  }

  useEffect(() => {
    isInitiator()
    isMember()
    getTeamMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div class='mx-auto px-4 my-16 max-w-5xl space-y-6 font-mono flex-col justify-center'>
      <div class='text-6xl font-bold text-center'>Team</div>
      <div class='max-w-2xl mx-auto'>
        Contract - {teamContract} <br />
        Team Name - {teamName} <br />
        Team Initiator - {initiator} <br />
      </div>
      <div class='flex justify-center space-x-4'>
        <div>
          <Link
            to={{
              pathname: `/initiator`,
            }}
          >
            {initiatorButton && (
              <button class='py-2 px-4 text-white bg-gray-800 hover:bg-gray-500 w-max rounded-md tracking-wider'>
                Admin
              </button>
            )}
          </Link>
        </div>

        <div>
          <Link
            to={{
              pathname: `/community/mint`,
              state: { owner: null },
            }}
          >
            {member && (
              <button class='py-2 px-4 text-white bg-gray-800 hover:bg-gray-500 w-max rounded-md tracking-wider'>
                Mint
              </button>
            )}
          </Link>
        </div>
      </div>
      <div class='flex-row'>
        {/* eslint-disable-next-line */}
        <Team_Shoutout members={members} />
        <ScoreForm />
      </div>
    </div>
  )
}

export default Team
