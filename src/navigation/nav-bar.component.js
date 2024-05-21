import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Logo from '../assets/images/relexco-nobg.png'
import {
  Bars3Icon,
  XMarkIcon,

} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';



export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 relative" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="block pl-14 font-semibold text-primary">RelexCo</span>
            <img className="w-auto absolute top-3 h-12" src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link to="/how-it-works" className="text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
            How It Works
          </Link>
          <Link to="/faq" className="text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
            FAQ
          </Link>
          <HashLink smooth to="/#prohibited" className="text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
          Prohibited Items
          </HashLink>
          <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
            Contact
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only text-black">RelexCo</span>
              <img
                className="h-8 w-auto"
                src={Logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to="/how-it-works" className="-mx-3 block px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
                  How It Works
                </Link>
                <HashLink smooth to="/#prohibited" className="-mx-3 block px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
                 Prohibited Items
                </HashLink>
                <Link to="/faq" className="-mx-3 block px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
                  FAQ
                </Link>
                <Link to="/contact" className="-mx-3 block px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
                  Contact
                </Link>
              </div>
              <div className="py-6">
                <Link to="/login" className="-mx-3 block px-3 py-2 text-sm font-semibold leading-6 text-gray-900" onClick={closeMobileMenu}>
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
