import React, {useState} from 'react'
import {AiOutlineSend, AiFillInfoCircle} from 'react-icons/ai'
import Typewriter from 'typewriter-effect';

import './Form.css'

let currentNumQuestion = 0
const questionsObject = [
    {
        parameter: 'destination',
        question: 'Where would you like to go?',
        info: 'You have the option to specify a particular location, or if you don\'t have a specific destination in mind, you can describe your desired location as something like "a mountainous area" or "a beautiful beach with nightlife."'
    },
    {
        parameter: 'dates',
        question: 'When are you planning to travel?',
        info: 'You have the flexibility to provide specific dates, such as "October 15th to October 20th", or a broader range, like "between August and September". Additionally, you can specify a season or condition, such as "when the weather is better", or indicate if you have some flexibility with your travel dates.'
    },
    {
        parameter: 'budget',
        question: 'What is your budget for this trip?',
        info: 'You have several options to describe your budget, from specific numbers to broader ranges. For instance, you can enter a fixed amount, such as "$1000", or a range, like "between $2000 and $3000". Additionally, you can indicate your preferred spending level, such as "moderate" or "luxury", or provide any other relevant information about your budget preferences.'
    },
    {
        parameter: 'current_location',
        question: 'Where are you located currently?',
        info: 'You can provide your current city or location to help us suggest the best travel options for you. You can also provide a different location if your planning to start your trip there.'
    },
    {
        parameter: 'preferences',
        question: 'Do you have any particular preferences for your trip?',
        info: 'You can specify any preferences you have, such as the type of accommodation, transportation, activities, or food you\'re interested in, to help us tailor the trip to your needs and desires.'
    },
    {
        parameter: 'group_size',
        question: 'How many people will be traveling with you?',
        info: 'You can let us know how many people are in your group to help us suggest suitable accommodations and activities. You can also specify if there\'s any kids or elderly people on the trip.'
    },
    {
        parameter: 'travel_style',
        question: 'What kind of travel style are you looking for?',
        info: 'You can indicate your preferred travel style, such as adventure, relaxation, culture, or family-friendly, to help us suggest the most fitting destinations and activities.'
    },
]

const userParameters = {
    destination: null,
    dates: null,
    budget: null,
    current_location: null,
    preferences: null,
    group_size: null,
    travel_style: null
}

const Form = ({sendUserParameters}) => {
    const [isInfo, setIsInfo] = useState(false)
    const [currentPrompt, setCurrentPrompt] = useState('')

    const [question, setQuestion] = useState(questionsObject[currentNumQuestion].question)
    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault()
        }
        
        if (currentPrompt.trim() === '') { // Check if textarea field is empty or only contains whitespace
            return; // Don't submit the form if the textarea field is empty
          }
        
        if (currentNumQuestion >= 6) {
            const parameter = questionsObject[currentNumQuestion].parameter
            userParameters[parameter] = currentPrompt
            sendUserParameters(userParameters)
        } else {
            const parameter = questionsObject[currentNumQuestion].parameter
            userParameters[parameter] = currentPrompt
            // console.log(userParameters)
            currentNumQuestion ++
            setQuestion(questionsObject[currentNumQuestion].question)
        }
        setCurrentPrompt('')
    }

  return (
    <form onSubmit={handleSubmit} className='w-full my-0 mx-auto p-3 flex flex-col gap-3 items-center'>
        {/* <label className='w-full text-2xl'>Whats your destination?</label> */}
        <div className='text-lg md:text-2xl flex justify-between items-center px-3 w-full text-center gap-x-2'>
            <div>
                <span className='text-sm md:text-md'>{currentNumQuestion + 1}/{questionsObject.length}</span>
            </div>
            <Typewriter 
                // onInit={(typewriter) => {
                //     typewriter.typeString(question)
                //     .start();
                // }}
                options={{
                    strings: [question],
                    autoStart: true,
                    loop: true,
                    pauseFor: 100000,
                    delay: 75,
                }}
                
            />
            <button onClick={() => setIsInfo(!isInfo)} type='button'><AiFillInfoCircle className='text-lg' /></button>
        </div>
        
        {/* {console.log(question)}
        {console.log(userParameters)} */}
        <div className='w-full my-0 mx-auto p-3 flex gap-3 items-center glassForm'>
            <textarea onChange={(e) => setCurrentPrompt(e.target.value)} value={currentPrompt}
            className={`w-full text-base md:text-lg p-3 bg-transparent rounded-md border-none outline-none resize-none`} name="prompt" id="prompt" cols='1' rows="1" placeholder=''
            onKeyDown={(e) => {
                if (e && e.key === 'Enter' && !e.shiftKey) { // Check if Enter key is pressed without Shift key
                    e.preventDefault(); // Prevent default behavior (line break)
                    if (currentPrompt.trim() === '') { // Check if textarea field is empty or only contains whitespace
                        return; // Don't submit the form if the textarea field is empty
                        }
                    handleSubmit(); // Call the handleSubmit function
                }
              }}
            >
            </textarea>
            <button className='outline-none border-none cursor-pointer bg-transparent' type='submit'><AiOutlineSend className='text-xl' /></button>
        </div>
        {isInfo && (
            <div className=''>
                <p className='text-sm'>{questionsObject[currentNumQuestion].info}</p>
            </div>
        )}
    </form>
  )
}

export default Form