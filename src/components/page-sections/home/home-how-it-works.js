import { InboxArrowDownIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import BookItems from '../../../assets/images/bookitems.svg';
import Drop from '../../../assets/images/drop.svg';
import Pack from '../../../assets/images/pack.svg';
import Track from '../../../assets/images/track.svg';

const features = [
  {
    name: 'Book your item(s)',
    description:
      'Get an instant quote online and book your item(s) with our easy to use site',
    icon: BookItems,
  },
  {
    name: 'Pack your item(s)',
    description:
      'Once you have booked, pack your item(s) securely in a robust suitcase or box',
    icon: Pack,
  },
  {
    name: 'Drop Off or We Collect',
    description:
      'Drop your boxes or suitcases at one of hundreds of local drop off points or if you have chose collection one of our partners will collect your items',
    icon: Drop,
  },
  {
    name: 'Track your item(s)',
    description:
      'Track your item every step of the way. Enjoy a hassle-free journey and on-time item arrival',
    icon: Track,
  },
]

export default function Howitworks() {
  return (
    <div className="bg-white py-10 lg:py-20">
      <div className="mx-auto container px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-secondary font-semibold leading-7 text-indigo-600">How it Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          The easy way to send boxes and luggage
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-primary font-semibold leading-7 text-gray-900 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <span>
                        <img className='h-6 w-6 text-white' src={feature.icon} />
                    </span>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
