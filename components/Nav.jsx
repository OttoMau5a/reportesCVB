import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from '.';
import { userService } from 'services';
import Link from 'next/link';
export { Nav };
function Nav() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  if (!user) return null;
  const logoES = "/img/ESLOGO.png";
  return (
    <nav className="relative px-4 flex justify-between items-center h-full">
      {/* Burger */}
      <button className="navbar-burger flex items-center text-blue-800 p-3 block md:hidden" onClick={() => setShowMenu(!showMenu)}>
        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
      {/* Logo */}
      <Link className="leading-none" href="/">
        <img src={logoES} alt="LogoES" style={{ width: '25vh', display: 'block' }} />
      </Link>
      {/* Links in Navbar */}
      <div className="gradient rounded-lg p-6 hidden md:block">
        <ul id='headernav' className="hidden lg:flex items-center space-x-6">
          {/* <li><NavLink className="font-bold text-white hover:text-gray-200" exact href="/">Home</NavLink></li> */}
          <li><NavLink className="font-bold text-white hover:text-gray-200" href="/users">Users</NavLink></li>
          <li><NavLink className="font-bold text-white hover:text-gray-200" href="/partners">Partners</NavLink></li>
          <li><NavLink className="font-bold text-white hover:text-gray-200" href="/events">Events</NavLink></li>
        </ul>
      </div>
      <button onClick={userService.logout} className="lg:inline-block py-2 px-6 bg-blue-600 text-white	 font-bold rounded-full transition duration-200"><AccountCircleIcon className='mr-2' />Logout</button>
      {showMenu && (
        <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-20 md:hidden">
          <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-20">
            <div class="px-5 pt-4 flex items-center justify-between z-20">
              <div>
                <img src={logoES} alt="LogoES" style={{ width: '15vh', display: 'block' }} />
              </div>
              <div class="mr-2 z-20">
                <button
                  type="button"
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setShowMenu(false)}
                >
                  <span class="sr-only">Close main menu</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-2 pt-2 pb-3 space-y-1 z-20">
              {/* <NavLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} exact href="/">Home</NavLink> */}
              <NavLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} href="/users">Users</NavLink>
              <NavLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} href="/partners">Partners</NavLink>
              <NavLink class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={() => setShowMenu(false)} href="/events">Events</NavLink>
            </div>
            <div>
              <button onClick={userService.logout} class="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-sm text-white font-bold rounded-none transition duration-200">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}