import Boxes from '../../../assets/images/boxes.png';
import Luggage from '../../../assets/images/luggage.png';
import Trunks from '../../../assets/images/trunks.png';


export default function WhatWeDeliver() {
  return (
    <div className="bg-zinc-100	py-10 lg:py-20">
      <div className="mx-auto container px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-secondary font-semibold leading-7 text-indigo-600">What We Deliver</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          We deliver boxes and suitcases globally
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            <div className='relative bg-third rounded-lg p-4'>
                <img className='max-w-full h-72 absolute -top-10' src={Luggage} />
                <h3 className="text-2xl text-primary font-bold mb-2 pt-72">Luggage</h3>
                <p className="text-gray-600">Send luggage securely and easily throughout the globe with Wawryer</p>
            </div>
            <div className='relative bg-fourth rounded-lg p-4'>
            <img className='max-w-full h-72 absolute -top-10' src={Boxes} />
                <h3 className="text-2xl text-primary font-bold mb-2 pt-72">Boxes</h3>
                <p className="text-gray-600">Send luggage securely and easily throughout the globe with Wawryer</p>
            </div>
            <div className='relative bg-primary rounded-lg p-4'>
            <img className='max-w-full absolute top-10' src={Trunks} />
                <h3 className="text-2xl text-white font-bold mb-2 mb-2 mt-72">Trunks</h3>
                <p className="text-white">If you have larger suitcases or trucks we can help providing they are 75lbs or less</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
