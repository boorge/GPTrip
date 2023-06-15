import React, {useEffect, useState, useRef} from 'react'
import { Link } from "react-router-dom";
import Home from '../Home/Home';
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import './FixedNavbar.css'

const FixedNavbar = () => {
    const [navBackground, setNavBackground] = useState(false)
    const [navbar, setNavbar] = useState(false)
    const navRef = useRef()
    
    navRef.current = navBackground

    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 50
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])

  return (
    <header className={`w-full mx-auto px-4 sm:px-20 z-50 fixed ${navBackground ? 'navbar-scrolled' : 'navbar-config'}`}>
    <div className='justify-between md:items-center md:flex'>
      <div>
        <div className='flex items-center justify-between py-3'>
          <div className='md:py-5 md:block'>
            <a href="/">
              <img src="/logo.png" alt="Logo" className="h-14 md:h-20" style={navBackground ? {filter: "invert(100%) sepia(5%) saturate(19%) hue-rotate(335deg) brightness(102%) contrast(100%)"} : {}} />
            </a>
          </div>
          <div className='md:hidden '>
            <button onClick={() => setNavbar(!navbar)}>
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <div className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
            <Link to='/' onClick={() => setNavbar(!navbar)} className="block lg:inline-block hover:text-neutral-500 ">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default FixedNavbar