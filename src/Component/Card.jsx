import React from 'react'
// import arrow from "lucide-react"

const Card = ({question, options}) => {

  return (
    
    <div className=' flex-col justify-around'>

            <p className='text-wrap text-gray-800 text-2xl font-semibold'> 
                {question}
            </p>

            <ul>
                <option value="1">{options[0]}</option>
                <option value="2">{options[1]}</option>
                <option value="3">{options[2]}</option>
                <option value="4">{options[3]}</option>
            </ul>


    </div>
  )
}

export default Card