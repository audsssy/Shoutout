import React from 'react'
import { Link } from 'react-router-dom'
import DeployTeam from '../comps/DeployTeam'

const SelectTeam = ({ teams: _teams }) => {

  return (
    <div>
      <div class='mx-auto px-4 my-20 max-w-4xl space-y-10 flex-col justify-center'>
        <div class='text-5xl font-bold self-auto text-center'>
          Select a Team
        </div>

        <div class='max-w-2xl mx-auto grid grid-cols-2 gap-4 place-items-center'>
          {_teams &&
            _teams.map((_teams, index) => (
              <div key={index}>
                <Link
                  to={{
                    pathname: `/team`,
                    state: {
                      teamContract: _teams.contract,
                      teamName: _teams.name,
                      teamMembers: _teams.members,
                    },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <button class='py-2 px-4 text-white bg-gray-800 hover:bg-gray-500 w-max rounded-md tracking-wider font-mono'>
                    {_teams.name} on {_teams.chain}
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div class='mx-auto px-4 my-10 max-w-2xl space-y-6 flex-col justify-center text-gray-400'>
        <div class='text-4xl my-5 font-semibold text-center'>
          Summon a Team
        </div>

        <div class='text-center'>
          <DeployTeam />
        </div>
      </div>
    </div>
  )
}

export default SelectTeam
