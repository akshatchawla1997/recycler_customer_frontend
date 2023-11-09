import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Header/Navigation'; // Updated import statement
import SiteFooter from '../footer/SiteFooter';

export function Layout() {
  return (
    <div>
      <header className=' w-full'>
        <Navigation />
      </header>
      <main className=''>
        <div className=''>
          <Outlet />
        </div>
      </main>
      <footer>
        <SiteFooter />
      </footer>
    </div>
  );
}
