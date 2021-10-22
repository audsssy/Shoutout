import React, { useState, Fragment } from 'react'

const ScoreForm = () => {
  const [inputFields, setInputFields] = useState([
    { member: '', score: '' },
  ])

  const handleAddFields = () => {
    const values = [...inputFields]
    values.push({ member: '', score: '' })
    setInputFields(values)
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  const handleInputChange = (index, event) => {
    const values = [...inputFields]
    if (event.target.name === 'firstName') {
      values[index].member = event.target.value
    } else {
      values[index].score = event.target.value
    }

    setInputFields(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('inputFields', inputFields)
  }

  return (
    <div class='mx-auto px-4 my-16 max-w-5xl space-y-6 font-mono flex-col justify-center'>
      <div class='mt-14 mb-5 text-3xl font-bold text-semibold text-center'>
        Give Shoutouts
      </div>
      <form class='mx-auto' onSubmit={handleSubmit}>
        <div>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div>
                <label htmlFor='firstName'>Member</label>
                <input
                  type='text'
                  className='form-control'
                  id='firstName'
                  name='firstName'
                  value={inputField.member}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className='form-group col-sm-4'>
                <label htmlFor='lastName'>Score</label>
                <input
                  type='text'
                  className='form-control'
                  id='lastName'
                  name='lastName'
                  value={inputField.score}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className='form-group col-sm-2'>
                <button
                  className='btn btn-link'
                  type='button'
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className='btn btn-link'
                  type='button'
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className='submit-button'>
          <button
            className='btn btn-primary mr-2'
            type='submit'
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
        <br />
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
      </form>
    </div>
  )
}

export default ScoreForm
