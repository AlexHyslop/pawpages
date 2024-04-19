import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import HeroImg from '../../../assets/images/relexco-hero.jpeg';
import QuoteForm from '../quote/quote-form.component';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const heroStyle = {
  backgroundImage: `url(${HeroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'right',
};

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white relative" style={heroStyle}>
      <div className='absolute w-full h-full bg-white opacity-50'></div>
        <div className="relative isolate px-6 lg:px-8"> 
          <div className="mx-auto max-w-2xl py-12 sm:py-28 lg:py-36">  
            <div className='bg-white p-6 rounded-lg'>
              <QuoteForm /> 
            </div>
          </div> 
      </div>
    </div>
  )
}
