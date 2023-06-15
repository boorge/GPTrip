import React, {useState} from "react";
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

	return (
		<header className='w-full mx-auto px-4 sm:px-20 z-50'>
			<div className='justify-between md:items-center md:flex'>
				<div>
					<div className='flex items-center justify-between py-3'>
						<div className='md:py-5 md:block'>
							<a href="/">
								<img src="/logo.png" alt="Logo" className="h-14 md:h-20" />
							</a>
						</div>
						<div className='md:hidden text-white'>
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
							<Link to='/' onClick={() => setNavbar(!navbar)} className="block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100">
                Home
              </Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
