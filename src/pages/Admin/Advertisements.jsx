import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Advertisements = () => {
  return (
    <div className='bg-white/70'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl ">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />

    </div>
    </div>

  );
}

export default Advertisements;


const CardComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (

      <div className="h-full">
        {/* Card */}
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="flex flex-col h-full">
            {/* Card top */}
            <div className="flex-grow p-5">
              <div className="flex justify-between items-start">
                {/* Image + name */}
                <header>
                  <div className="flex mb-2">
                    <div className="mt-1 pr-1">
                      <a
                        className="inline-flex text-gray-800 hover:text-gray-900"
                        href="#0"
                      >
                        <h2 className="text-xl leading-snug justify-center font-semibold">
                          Dominik McNeail
                        </h2>
                      </a>
                    </div>
                  </div>
                </header>
                {/* Menu button */}
                <div className="relative inline-flex flex-shrink-0">
                  <button
                    className="text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus-within:ring-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                  >
                    <span className="sr-only">Menu</span>
                    <svg
                      className="w-8 h-8 fill-current"
                      viewBox="0 0 32 32"
                    >
                      <circle cx="16" cy="16" r="2" />
                      <circle cx="10" cy="16" r="2" />
                      <circle cx="22" cy="16" r="2" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="origin-top-right z-10 absolute top-full right-0 min-w-[9rem] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
                      <ul>
                        <li>
                          <a
                            className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                            href="#0"
                          >
                            Option 1
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                            href="#0"
                          >
                            Option 2
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                            href="#0"
                          >
                            Remove
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Bio */}
              <div className="mt-2">
                <div className="text-sm">
                  Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer &
                  PHP Lover.
                </div>
              </div>
            </div>
            {/* Card footer */}
            <div className="border-t border-gray-200">
              <div className="flex divide-x divide-gray-200">
                <a
                  className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-4 group"
                  href="#0"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-gray-500 flex-shrink-0 mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                    </svg>
                    <Link to = '/admin/formedit/:id'>
                    <span>Edit Profile</span>
                    </Link>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
