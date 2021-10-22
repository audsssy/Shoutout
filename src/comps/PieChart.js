import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'

const PieChart = ({ shoutouts }) => {

  const [member, setMember] = useState([
    'Red',
    'Blue',
    'Yellow',
    'Green',
    'Purple',
    'Orange',
  ])
  const [points, setPoints] = useState([0])

  const data = {
    labels: member,
    datasets: [
      {
        label: '# of Votes',
        data: points,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const sortData = () => {
    const _members = []
    const _points = []

    shoutouts.forEach((shoutout) => {
      _members.push(shoutout.member)
      _points.push(shoutout.score)

      setMember([..._members])
      setPoints([..._points])
    })
  }
  
  useEffect(() => {
    sortData()
    // eslint-disable-next-line
  }, [shoutouts])


  return (
    <div>
      <Pie data={data} />
    </div>
  )
  }

export default PieChart
