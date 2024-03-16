import ImpactFund from '../../../assets/images/impact_fund.png';

export default function Sustainability() {
  return (
    <div className="bg-white py-10 lg:py-20">
      <div className="mx-auto container px-6 lg:px-8">
        <div className='grid  grid-cols-1 lg:grid-cols-3'>
            <div className='flex justify-center items-center'>
                <img className='max-w-full max-h-60' src={ImpactFund} />
            </div>
            <div className='col-span-2'>
                <h2 className="text-secondary font-semibold leading-7 text-indigo-600">RelexCo & Sustainability</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our aim is to be sustainable net zero company</p>
                <p>At Wawryer, we are committed to using business as a force for good.</p>
                <p>The world needs great technology and logics solutions and we want to do it in a way that helps our communities and limits our negative impact on our environment, so that future generations can enjoy a healthy planet.</p>
                <p>Wawryer donates 1% of our annual revenue to the Wawryer Impact Fund - to support environmental and humanitarian causes.</p>
                <p>Through our Impact Fund, we choose our partnerships in line with Wawryer’s values.</p>
                <p>You can read our Impact Policy <a href="#">Here</a></p>
            </div>
        </div>  
      </div>
    </div>
  )
}
