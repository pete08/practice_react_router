import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/petfinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';

// Import NavLink
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  function checkActive({ isActive }) {
    if(isActive) {
      return('nav-link nav-link-active');
    } else {
      return('nav-link');
    }
  }

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" />
        <Search />
      </div>
      <ul className="nav-links">
        <li key={'all'}>
          {/* These links should be NavLink component and add a special active class name if its an active link */}
          <NavLink to="/" className={checkActive}> All Pets! </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                {/* These links should be NavLink component and add a special active class name if its an active link */}
                <NavLink to={`/${type.name}`} className={checkActive} > {type.name}s </NavLink>
                {/* <a href={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  className='nav-link'               >
                  {type.name}s
                </a> */}
                {' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
