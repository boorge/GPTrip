import React, {useState, useEffect} from 'react'
import LoadingPage from './LoadingPage/LoadingPage'
import FixedNavbar from './FixedNavbar'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import {MdHotel} from 'react-icons/md'
import {SiGoogleearth, SiGooglemaps} from 'react-icons/si'
import {FaPlaneArrival} from 'react-icons/fa'
import {BsCurrencyExchange} from 'react-icons/bs'
import {RiMapPinTimeFill} from 'react-icons/ri'
import {TbWorldWww, TbClockHour4} from 'react-icons/tb'
import {GrLocation} from 'react-icons/gr'
// import {TbArrowRightRhombus} from 'react-icons/tb'

import './DestinationPage.css'

// import {data} from '../../testData'
// console.log(data)

const starRating = (stars) => {
  
  let starsArray = []
  if (stars === 5) {
    for (let i = 0; i < stars; i++) {
      starsArray.push(<AiFillStar />)
    }
  } else {
      for (let i = 0; i < stars; i++) {
        starsArray.push(<AiFillStar />)
      }
      for (let i = 0; i < 5 - stars; i++) {
        starsArray.push(<AiOutlineStar />)
      }
  }
  return starsArray
}



const DestinationPage = ({userParams}) => {
  const [data, setData] = useState()

  //Loading Functionality
  const [isLoading, setLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0)

  if(!data) {
    if (loadingPercentage < 60) {
      setTimeout(() => {
        setLoadingPercentage(loadingPercentage + 1)
      }, 1000)
    }
  } else {
    if (loadingPercentage < 100) {
      setTimeout(() => {
        setLoadingPercentage(loadingPercentage + 1)
      }, 5)
    }
    if (isLoading && loadingPercentage === 100) {
      setLoading(false)
    }
  }

  // Data fetching
  useEffect(() => {

    if (window.localStorage.getItem("DESTINATION_DATA") !== null) {
      const data = window.localStorage.getItem('DESTINATION_DATA')
      setData(JSON.parse(data))
    } else {
      const fetchData = async () => {
        const response = await fetch("https://gptrip-server.onrender.com/api/destination", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userParams)
        });
        const dataReceived = await response.json();

        console.log(dataReceived);
        setData(dataReceived)
        window.localStorage.setItem('DESTINATION_DATA', JSON.stringify(dataReceived))
      }
      fetchData()
    }
  }, [])
  

  return(
  isLoading ? (<LoadingPage percentage={loadingPercentage}/>) : (
      <div className='bg-slate-100'>
        <div className='bg-slate-600'>
              <FixedNavbar />
        </div>
        <div className='h-96 w-screen flex flex-col justify-center items-center text-white' 
        style={{
          backgroundImage: `url(${data.destination.images[0].urls.full})`,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
          <div className='text-center glass py-4 px-10'>
            <h1 className='text-5xl'>{data.destination.name}</h1>
            <h2 className='text-3xl'>{`${data.destination.country}`}</h2>
          </div>
        </div>
        <div className='flex flex-col w-full justify-center items-center'>
          <img className='w-3/5 rounded-xl mainImage' src={data.destination.images[1].urls.regular} alt="" />
          <div className='w-3/5 flex justify-end text-xs text-slate-400'>
            <p>Photo by <a href={`https://unsplash.com/@${data.destination.images[1].user.username}?utm_source=GPTrip&utm_medium=referral`} target='_blank'>{data.destination.images[1].user.name}</a> on <a href={`https://unsplash.com/?utm_source=GPTrip&utm_medium=referral`} target='_blank'>Unsplash</a></p>
          </div>
        </div>
  
        {/* DATES AND BUDGET */}
        <div className=' mt-24 w-full'>
          <div className='flex justify-around'>
            <div className='text-center'>
              <p className='text-2xl font-bold'>Dates</p>
              <p className='text-lg'>{data.dates}</p>
            </div>
            <div className='text-center flex flex-col items-center'>
              <p className='text-2xl font-bold'>Budget</p>
              <div className='flex gap-x-2'>
                <p className='text-lg'>{data.budget.amount}</p>
                <p className='text-lg'>{data.budget.currency}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* DESTINATION INFO */}
        <div className='py-24 mt-24 text-white' 
        style={{
          backgroundImage: `url(${data.destination.images[0].urls.full})`,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
          <div className='mx-2 lg:mx-40 glass-darker p-10'>
          <div className=' md:flex'>
            <div className=' md:w-4/6 flex flex-col gap-y-3'>
              <h2 className='text-3xl md:text-4xl'>What to know before visiting {data.destination.name}</h2>
              <div className='inline-flex gap-x-5'>
                <h4 className='text-xl md:text-2xl'>{data.destination.state ? `${data.destination.state}, ` : ''}{data.destination.country}</h4>
                <img
                  src={`https://flagcdn.com/32x24/${data.destination.country_code.toLowerCase()}.png`}
                  srcset={`https://flagcdn.com/64x48/${data.destination.country_code.toLowerCase()}.png 2x,
                    https://flagcdn.com/96x72/${data.destination.country_code.toLowerCase()}.png 3x`}
                  width="32"
                  height="24"
                  alt={data.destination.country} />
              </div>
              <p>{data.destination.description}</p>
              <div className='flex gap-x-4 items-center'>
                <TbWorldWww />
                <a href={data.destination.website}><p>{data.destination.website}</p></a>
              </div>
            </div>
            <div className='flex items-center justify-around mt-4 md:mt-0 md:flex-col md:justify-center md:w-2/6 gap-y-4'>
              <a className='flex items-center justify-center gap-x-2 bg-green-800 p-2 rounded-lg' href={`https://www.google.com/maps/search/${data.destination.coordinates.latitude},${data.destination.coordinates.longitude}/`} target='_blank'>
                <SiGooglemaps />
                <button>Google Maps</button>
              </a>
              <a className='flex items-center justify-center gap-x-2 bg-sky-700 p-2 rounded-lg' href={`https://earth.google.com/web/search/${data.destination.coordinates.latitude},${data.destination.coordinates.longitude}/`} target='_blank'>
                <SiGoogleearth />
                <button>Google Earth</button>
              </a>
              

            </div>
          </div>
          <hr className='my-8'/>
          <div className=''>
            <div className='w-full flex justify-around text-center'>
              <div className='flex flex-col items-center justify-center w-2/6'>
                <FaPlaneArrival className='text-2xl md:text-3xl' />
                <p className='text-base md:text-lg font-bold'>Nearest Airport</p>
                <p className='text-sm md:text-base'>{data.destination.nearest_airport}</p>
              </div>
              <div className='flex flex-col items-center justify-center w-2/6'>
                <BsCurrencyExchange className='text-2xl md:text-3xl' />
                <p className='text-base md:text-lg font-bold'>Local currency</p>
                <p className='text-sm md:text-base'>{data.destination.local_currency}</p>
              </div>
              <div className='flex flex-col items-center justify-center w-2/6'>
                <RiMapPinTimeFill className='text-2xl md:text-3xl' />
                <p className='text-base md:text-lg font-bold'>Time Zone</p>
                <p className='text-sm md:text-base'>{data.destination.timezone}</p>
              </div>
            </div>
            <hr className='my-8' />
            <div>
              <p className='mb-2 text-lg font-bold'>Best months to travel in:</p>
              <div className='w-full flex justify-around'>
                {data.destination.best_months_to_travel_in.map((month, idx) => <p>{month}</p>)}
              </div>
            </div>
  
          </div>
          <hr className='my-8' />
          </div>
          <div className='flex justify-center text-xs mt-2'>
            <p>Photo by <a href={`https://unsplash.com/@${data.destination.images[0].user.username}?utm_source=GPTrip&utm_medium=referral`} target='_blank'>{data.destination.images[0].user.name}</a> on <a href={`https://unsplash.com/?utm_source=GPTrip&utm_medium=referral`} target='_blank'>Unsplash</a></p>
          </div>
        </div>
  
        {/* IMAGES */}
        <div className='mx-40 mt-24 gap-y-10 grid lg:grid-cols-2 items-center lg:justify-around text-center text-slate-400'>
          <div className='flex flex-col items-center'>
            <img src={data.destination.images[2].urls.regular} className='max-h-screen' alt="" />
            <div className='flex justify-center text-xs mt-2'>
              <p>Photo by <a href={`https://unsplash.com/@${data.destination.images[2].user.username}?utm_source=GPTrip&utm_medium=referral`} target='_blank'>{data.destination.images[2].user.name}</a> on <a href={`https://unsplash.com/?utm_source=GPTrip&utm_medium=referral`} target='_blank'>Unsplash</a></p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <img src={data.destination.images[3].urls.regular} className='max-h-screen' alt="" />
            <div className='flex justify-center text-xs mt-2'>
              <p>Photo by <a href={`https://unsplash.com/@${data.destination.images[3].user.username}?utm_source=GPTrip&utm_medium=referral`} target='_blank'>{data.destination.images[3].user.name}</a> on <a href={`https://unsplash.com/?utm_source=GPTrip&utm_medium=referral`} target='_blank'>Unsplash</a></p>
            </div>
          </div>
        </div>
  
        {/* HOTELS */}
        <div className='mx-40 mt-24'>
          <div className='flex justify-center xl:justify-start'>
            <h2 className='text-4xl text-center md:text-left'>Recommended Hotels</h2>
          </div>
          <div className='flex flex-col items-center xl:items-stretch'>
            <div className='mt-5 xl:flex xl:justify-between' >
              {Object.hasOwn(data, 'accomodations') ? data.accomodations.map((accomodation, idx) => (
                <div className='flex my-8 xl:my-0 flex-col justify-center min-h-min min-w-fit w-80 bg-slate-50 shadow rounded-lg p-5 gap-y-2'>
                  <div className=''>
                    <MdHotel className='text-5xl' />
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex text-amber-600'>
                      {starRating(accomodation.star_rating)}
                    </div>
                    <p className='font-bold text-lg'>{accomodation.name}</p>
                    <p className='text-sm'>{accomodation.place}</p>
                  </div>
                  <hr className='w-full' />
                  <div>
                    <div className='flex gap-x-2'>
                      <p>Avg:</p>
                      <p className='font-bold'>{accomodation.average_night_cost.amount} {accomodation.average_night_cost.currency}</p>
                      <p>/night</p>
                    </div>
                  </div>
                  <div>
                    <a href={accomodation.website} target='_blank'><button type='button' className='bg-amber-600 w-full rounded-lg text-white'>VISIT WEBSITE</button></a>
                  </div>
                </div>
              )) : data.accommodations.map((accomodation, idx) => (
                <div className='flex my-8 xl:my-0 flex-col justify-center min-h-min min-w-fit w-80 bg-slate-50 shadow rounded-lg p-5 gap-y-2'>
                  <div className=''>
                    <MdHotel className='text-5xl' />
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex text-amber-600'>
                      {starRating(accomodation.star_rating)}
                    </div>
                    <p className='font-bold text-lg'>{accomodation.name}</p>
                    <p className='text-sm'>{accomodation.place}</p>
                  </div>
                  <hr className='w-full' />
                  <div>
                    <div className='flex gap-x-2'>
                      <p>Avg:</p>
                      <p className='font-bold'>{accomodation.average_night_cost.amount} {accomodation.average_night_cost.currency}</p>
                      <p>/night</p>
                    </div>
                  </div>
                  <div>
                    <a href={accomodation.website} target='_blank'><button type='button' className='bg-amber-600 w-full rounded-lg text-white'>VISIT WEBSITE</button></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* TRANSPORT TO GET THERE */}
        {/* <div className='mx-40 mt-24'>
          <div>
            <h2 className='text-4xl'>How to get there</h2>
          </div>
          <div className='flex items-center justify-around mt-5' >
            {data.transportation_to_destination.map((transport, idx) => (
              <div className='flex items-center'>
                <div className='mx-4'>
                  <MdHotel className='text-5xl' />
                </div>
                <div className='flex flex-col'>
                  <p>{transport.type}</p>
                  <p>{transport.name}</p>
                  <p>{transport.cost.amount} {transport.cost.currency}</p>
                  <a href={transport.website} target='_blank'><button type='button'>VISIT WEBSITE</button></a>
                </div>
              </div>
            ))}
          </div>
        </div> */}
  
        {/* LOCAL TRANSPORT */}
        {/* <div className='mx-40 mt-24'>
          <div>
            <h2 className='text-4xl'>How to move around</h2>
          </div>
          <div className='flex items-center justify-around mt-5' >
            {data.local_transportation.map((transport, idx) => (
              <div className='flex items-center'>
                <div className='mx-4'>
                  <MdHotel className='text-5xl' />
                </div>
                <div className='flex flex-col'>
                  <p>{transport.type}</p>
                  <a href={transport.website} target='_blank'><button type='button'>VISIT WEBSITE</button></a>
                </div>
              </div>
            ))}
          </div>
        </div> */}
  
        {/* ACTIVITIES */}
        <div className='mx-20 lg:mx-40 mt-24 pb-28'>
          <div>
            <h2 className='text-4xl'>What to do in there</h2>
          </div>
          <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 items-center justify-center mt-5' >
            {data.activities.map((activity, idx) => (
              <div className='flex flex-col items-start bg-slate-50 shadow rounded-lg p-5 gap-y-2'>
                <div className='flex flex-col'>
                  <div>
                    <div className='flex gap-x-2 items-center text-sm'>
                      <GrLocation />
                      <p>{activity.place}</p>
                    </div>
                    <p className='text-xl font-bold'>{activity.name}</p>
                    <p>{activity.type}</p>
                    <p>{activity.short_description}</p>
                    <div className='flex gap-x-2 items-center'>
                      <AiFillStar className='text-amber-600' />
                      {activity.stars}
                    </div>
                  </div>
                </div>
                <hr className='w-full' />
                <div className='flex items-center justify-between w-full'>
                  <div className='flex gap-x-2 items-center'>
                    <p className='text-sm'>From:</p>
                    <p className='font-bold'>{activity.amount.amount ? activity.amount.amount : activity.amount.value} {activity.amount.currency}</p>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <TbClockHour4 />
                    <div className='flex gap-x-1 items-center'>
                      {activity.duration}
                      <p>hours</p>
                    </div>
                  </div>
                </div>
                <a href={activity.website} target='_blank' className='w-full'><button type='button' className='bg-sky-700 py-1 w-full rounded-lg text-white' >VISIT WEBSITE</button></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
  }
  


export default DestinationPage