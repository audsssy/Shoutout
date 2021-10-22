import React, { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import SHOUTOUT_ABI from '../comps/SHOUTOUT_ABI'
import { TeamContext } from '../GlobalContext'
import { projectFirestore, firebaseFieldValue } from '../firebase/config'

const Initiator = () => {
  // ----- Smart Contract Config
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()

  // ----- useState
  const [members, setMembers] = useState([])
  const [memberToAdd, setMemberToAdd] = useState('')
  const [err, setErr] = useState('')

  // ----- useContext
  const { teamContract } = useContext(TeamContext)

  const addMember = async () => {
    try {
      const _contract = new ethers.Contract(teamContract, SHOUTOUT_ABI, signer)
      const tx = await _contract.addMember(memberToAdd)

      tx.wait().then(() => {
        setErr('Successfully added a team member!')
        setMemberToAdd('')
        uploadMember()
        getTeamMembers()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const getTeamMembers = async () => {
    const members = []
    const query = await projectFirestore.collection('team').where('contract', '==', teamContract).get()
    query.forEach((doc) => {
      doc.data().members.forEach((member) => {
        members.push(member)
      })
      setMembers(members)
    })
  }

  // Upload to Firestore
  const uploadMember = async () => {
    const docRef = projectFirestore.collection('team').doc(teamContract)
    docRef.update(
      {
        members: firebaseFieldValue.arrayUnion(memberToAdd),
      },
      { merge: true }
    )
  }

  useEffect(() => {
    getTeamMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div class='space-y-2 text-center'>
      <div class='mt-14 mb-5 text-4xl font-bold text-semibold text-center'>
        Team Members
      </div>
      <div class='pb-5 text-center text-gray-400'>Add a team member</div>
      {members &&
        members.map((member, index) => (
          <div key={index}>
            {index + 1}.{member}
          </div>
        ))}
      {err && <div class='text-red-400 text-base text-center'>{err}</div>}
      <div class='flex-col space-y-4 text-center'>
        <div>
          <input
            class='flex-2 border border-gray-400 py-2 px-4 w-full rounded focus:outline-none focus:border-gray-900 max-w-sm tracking-wider'
            type='text'
            value={memberToAdd}
            onChange={(e) => setMemberToAdd(e.target.value)}
            placeholder='Enter artist address'
          />
        </div>
        <div>
          <button
            class='flex-1 py-2 px-4 text-white bg-gray-800 hover:bg-gray-500 w-max rounded-md tracking-wider'
            onClick={addMember}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Initiator
