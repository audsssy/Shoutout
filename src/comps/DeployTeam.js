import React, { useState, useEffect, useContext } from 'react'
import SHOUTOUT_ABI from './SHOUTOUT_ABI'
import SHOUTOUT_BYTECODE from './SHOUTOUT_BYTECODE'
import { ContractFactory, ethers } from 'ethers'
import { projectFirestore, timeStamp } from '../firebase/config'
import { GlobalContext } from '../GlobalContext'


const DeployTeam = () => {
  // ----- useState
  const [chain, setChain] = useState(null)
  const [teamName, setTeamName] = useState('')

  // ----- useContext
  const { account } = useContext(GlobalContext)

  // ----- Smart Contract Config
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  const signer = provider.getSigner()
  const factory = new ContractFactory(SHOUTOUT_ABI, SHOUTOUT_BYTECODE, signer)

  // ----- Deploy MolVault
  const deploy = async () => {
    console.log(factory)
    try {
      console.log(factory)
      const _contract = await factory.deploy()

      _contract.deployTransaction
        .wait()
        .then((receipt) => {
          console.log('Receipt for deploying team', receipt)
          upload(_contract.address)
        })
        .catch((e) => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  // Upload to Firestore
  const upload = async (contract) => {
    const docRef = projectFirestore.collection('team').doc(contract)
    const createdAt = timeStamp()
    const dict = {
      name: teamName,
      members: [account],
      contract: contract,
      createdAt: createdAt,
      chain: chain,
    }
    docRef.set(dict).then(() => {
      window.location.reload()
    })
  }

  const getNetwork = () => {
    provider
      .getNetwork()
      .then((network) => {
        console.log('current chainId - ' + network.chainId)
        if (network.chainId === 100) {
          setChain('xDAI')
        } else if (network.chainId === 4) {
          setChain('Rinkeby')
        } else if (network.chainId === 1) {
          setChain('Mainnet')
        } else if (network.chainId === 3) {
          setChain('Ropsten')
        } else if (network.chainId === 42) {
          setChain('Kovan')
        } else {
          console.log('Pick a supported blockchain!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getNetwork()
    // eslint-disable-next-line
  }, [chain])

  return (
    <div class='space-y-4'>
      <div>
        <input
          class='border border-gray-400 py-2 px-4 w-full rounded focus:outline-none focus:border-gray-900 max-w-sm'
          type='text'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder='Team Name'
        />
      </div>
      <button
        class='py-2 px-4 text-white bg-gray-800 hover:bg-gray-500 w-max rounded-md tracking-wider'
        onClick={deploy}
      >
        Summon
      </button>
    </div>
  )
}

export default DeployTeam
