import React, { useState } from 'react';
import { Link } from "react-router-dom";
import FaqLady from '../../../assets/images/faq-lady.png';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    { 
      question: "What services does Relexco provide?", 
      answer: "Relexco offers a door-to-door service for up to 5 boxes of your personal belongings." 
    },
    { 
      question: "Who ships my items?", 
      answer: "Relexco does not personally ship your items. We use DHL's express or economy service to transport your items." 
    },
    { 
      question: "How do I get in contact with someone at customer services?", 
      answer: (
        <>
          Our Customer Service Team can be reached at <a href="mailto:sales@relexco.com">sales@relexco.com</a> to answer any queries from 9am until 5:30pm Monday to Friday.
        </>
      ) 
    },
    { 
      question: "Can I send liquids in my shipment?", 
      answer: (
        <>
          No, please refer to our prohibited items list <Link to="/prohibited-items">here</Link>.
        </>
      )
    }
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="hidden lg:block w-0 lg:w-1/2">
            <img src={FaqLady} alt="FAQ tailwind section" className="w-full" />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-4">
                <h6 className="text-lg text-center font-medium text-secondary mb-2 lg:text-left">FAQs</h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">Looking for answers?</h2>
              </div>
              <div className="accordion-group">
                {accordionData.map((item, index) => (
                  <div key={index} className={`accordion pb-2 mb-3 border-b border-solid border-gray-200 ${activeIndex === index ? 'active' : ''}`}>
                    <button onClick={() => toggleAccordion(index)} className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-secondary">
                      <h5>{item.question}</h5>
                      <svg className={`text-gray-900 transition duration-500 group-hover:text-secondary ${activeIndex === index ? 'rotate-180' : ''}`} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                    <div className={`accordion-content w-full px-0 overflow-hidden pr-4 ${activeIndex === index ? 'block' : 'hidden'}`}>
                      <p className="text-base font-normal text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
