import HappyBox from '../../../assets/images/happy-box-transparent.png';
import Cash from '../../../assets/images/sack-dollar-solid.svg';
import Animals from '../../../assets/images/paw-solid.svg';
import Aerosols from '../../../assets/images/spray-can-solid.svg';
import Food from '../../../assets/images/food_bev.svg';
import Drugs from '../../../assets/images/pills-solid.svg'
import Flammable from '../../../assets/images/fire-solid.svg'
import Jewelry from '../../../assets/images/link-solid.svg'
import Weapons from '../../../assets/images/gun-solid.svg'
import Batteries from '../../../assets/images/battery-full-solid.svg'


const prohibited = [
    {
        name: 'Cash',
        icon: Cash,
    },
    {
        name: 'Animals',
        icon: Animals,
    },
    {
        name: 'Aerosols',
        icon: Aerosols,
    },
    {
        name: 'Food & Beverages',
        icon: Food
    },
    {
        name: 'Illegal Drugs',
        icon: Drugs
    },
    {
        name: 'Flammable Goods',
        icon: Flammable
    },
    {
        name: 'Gold & Jewelry',
        icon: Jewelry
    },
    {
        name: 'Weapons / Sharp Objects',
        icon: Weapons
    },
    {
        name: 'Batteries',
        icon: Batteries
    }
  ]

export default function WhatWeDeliver() {
  return (
    <div className="bg-zinc-100 py-10 lg:py-20">
      <div className="mx-auto container px-6 lg:px-8 px-6 lg:px-8">
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <div className='flex justify-center items-center'>
                    <img className='max-w-full max-h-60' src="" />
                </div>
                <div className='max-w-lg mx-auto text-center'>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What We Deliver</h3>
        
                    <img className='mx-auto mt-10 mb-5 h-40' src={HappyBox} />
                    <h2 className='text-center mb-2 text-secondary font-semibold leading-7 text-indigo-600'>RelexCo</h2>
                    <p className="max-w-lg">At RelexCo, we deliver boxes of your micromove or small relocations quickly and effortlessly. Our dedicated team ensures your packages arrive on time, 
                    every time. Count on us for a fast, reliable and seamless delivery service.</p>
        
                </div>
            </div>
            <div>
                <div id='prohibited' className='flex justify-center items-center mt-20 lg:mt-0'>
                        <img className='max-w-full max-h-60' src="" />
                    </div>
                    <div className='lg:max-w-lg mx-auto text-center'>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">Prohibited Items</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                        {prohibited.map((item) => (
                            <div>
                                <img className='h-10 w-10 mb-2 block mx-auto text-black' src={item.icon} />
                                <span className='text-red-600'>{item.name}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>  
      </div>
  )
}
