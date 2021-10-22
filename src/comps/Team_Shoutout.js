import React, { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { TeamContext } from '../GlobalContext'
import SHOUTOUT_ABI from './SHOUTOUT_ABI'
import PieChart from './PieChart'


const Team_Shoutout = () => {
  const [scoresArray, setScoresArray] = useState([])

  // ----- useContext
  const { teamContract, teamMembers } = useContext(TeamContext)

  // ----- Smart Contract Interaction Config
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()

  // ----- Check owner status to toggle Admin button
  const getMemberScores = async () => {
    const scores = []
    const _contract = new ethers.Contract(teamContract, SHOUTOUT_ABI, signer)
    teamMembers.forEach((member) => {
      try {
        _contract
          .members(member)
          .then((data) => {
            scores.push({
              member: member,
              score: parseInt(ethers.utils.formatUnits(data[1], 0)),
            })
            scores.sort((a, b) => b.score - a.score)
            setScoresArray([...scores])
          })
          .catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    })
  }

  useEffect(() => {
    getMemberScores()
    // console.log(scoresArray[0].score)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div class='space-y-4'>
      <div class='mt-14 mb-5 text-4xl font-bold text-semibold text-center'>
        Shoutout
      </div>

      <div class='mx-auto w-1/2'>
        <PieChart shoutouts={scoresArray} />
        {/* <span class='text-gray-800'>
          {scoresArray &&
            scoresArray.map((member, index) => (
              <div key={index} class='flex items-center'>
                <div class='flex-1'>
                  ({index + 1}) {member.member}
                </div>
                <div class='flex-2'> {member.score} pts</div>
              </div>
            ))}
        </span> */}
      </div>
    </div>
  )
}

export default Team_Shoutout
