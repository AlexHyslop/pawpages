import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Prohibited() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="isolate bg-white px-6 py-10 sm:py-12 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
    
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Prohibited Items</h2>
      </div>
      <div className='container pt-10 sm:w-full sm:max-w-screen-lg mx-auto text-left'>
        <p>This list includes items which are prohibited for carriage by any law, regulation or statute of any federal, state or local government of any country from, to or through which the items may be carried. The list is not exhaustive and RelexCo may update this list from time to time and/or refuse to carry other items not listed below.</p>
        <p>Shipment of any prohibited item(s) shall be considered a material breach of our <Link to="/terms">Terms and Conditions</Link> of Carriage and RelexCo shall hold no liability for any prohibited item(s), which are subsequently damaged or lost whilst in our control. You shall remain fully liable to RelexCo for any losses caused to RelexCo as a consequence of your shipping of a Prohibited Item in accordance with our Terms and Conditions of Carriage.</p>
        <p>If your parcel contains a prohibited item, it may be delayed or stopped.</p>
        <h3 className='text-2xl font-bold pt-5'>Most common items</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>Aerosols, perfumes and aftershaves</span><br />including eau de parfum and eau de toilette</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Batteries - damaged or defective</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Batteries - loose of any type</span><br />including but not limited to power banks, USB chargers and common household batteries </li>
            <li className='ml-5 pt-2'><span className='font-bold'>Cash</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Cosmetics (EU only)</span><br />including but not limited to makeup, hair dye and face creams</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Credit / debit cards - activated and unactivated</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Foodstuffs (EU only)</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Medications (EU only)</span><br />prescription and non-prescription, including supplements</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Nail polish</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Paracetamol</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Power banks</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Rechargeable wireless earbuds</span><br />including but not limited to Apple AirPods and Samsung Galaxy Buds</li>
        </ul>
        <h3 className='text-2xl font-bold pt-3'>Alcohol, cigarettes and narcotics</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>Alcohol</span><br />Sending alcohol within the UK is permitted, but shipments containing alcohol to destinations outside the UK may be subject to local restrictions</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Cigarettes, cigars and tobacco products</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Electronic cigarettes and pipes, e-hookahs, e-cigars and vape pens</span><br />including any device that, through an aerosolised solution, delivers nicotine, flavour, or any other inhalable substance</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Illegal narcotics and cannabis-derived products, including CBD</span></li>
        </ul>
            <h3 className='text-2xl font-bold pt-3'>Electronic devices</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>More than 2 mobile phones, laptops and other small electronic items</span><br />You can send a maximum of 2 devices per box. The batteries must be contained within the devices. Devices should be packed to minimise movement, so as to avoid short circuit or unintentional activation. Your total shipment value can be up to £5,000</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Samsung Galaxy Note7 and Samsung Note7 devices</span></li>
        </ul>
        <h3 className='text-2xl font-bold pt-3'>Human, animal and plants</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>Animal trophies, animal parts and furs</span><br />including ivory, shark fins, animal remains and ashes, animal by-products and derived products not intended for human consumption</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Clinical and / or biological samples</span><br />including but not limited to bodily fluids and tissue samples</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Clinical testing kits</span><br />new or used, including COVID-19</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Flowers and plants</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Human remains or ashes</span><br />in any form</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Live animals</span><br />including insects, larvae and pupae</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Plant based material (EU only)</span></li>
        </ul>
        <h3 className='text-2xl font-bold pt-3'>Money, valuables and tax stickers</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>Antiques, works of art and fine art</span><br/>with an individual value over £5,000</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Banderols / tax stickers</span></li>
            <li className='ml-5 pt-2'><span className='font-bold'>Bullion</span><br/>of any precious metal</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Cash and travellers cheques</span><br/>Legal tender – bank notes, currency notes, coins</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Commemorative coins, medals and other high valuable collectibles</span><br/>with an individual or total shipment value in excess of £1,800</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Jewellery, costume jewellery, watches, watch parts and objects constructed of precious metal and/or stones</span><br/>with a total shipment value over £4,000</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Loose precious and semi-precious stones</span><br/>cut or un-cut, polished or un-polished</li>
        </ul>
        <h3 className='text-2xl font-bold pt-3'>Money, valuables and tax stickers</h3>      
        <ul className='list-disc'>
            <li className='ml-5 pt-3'><span className='font-bold'>Counterfeit goods</span><br/>in breach of Intellectual Property Rights (IPR)</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Illegal goods</span><br/>such as offensive bladed weapons, illicit drugs, including but not limited to narcotic stimulants, depressants or hallucinogens, cannabis or its derivatives</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Pornography</span><br/>printed, film or digital format</li>
            <li className='ml-5 pt-2'><span className='font-bold'>Shipment trackers / active loggers</span></li>
        </ul>
      </div>
   </div>
  )
}
