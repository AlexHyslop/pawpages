import React from 'react';
import '../../sass/components/_service-results.scss'; 
import quoteAction from '../../store/actions/quote.action';
import { useDispatch } from 'react-redux';

export default function QuoteServiceResults(props) {
   const dispatch = useDispatch(); 

   const onSelectQuote = () => {
    dispatch(quoteAction.setSelectedService(  props.serviceResult ));    
   }


   return ( 
        <div className="service-result">
          <h2>{props.serviceResult.ServiceName}</h2>
          <p><strong>Carrier:</strong> {props.serviceResult.CarrierName}</p>
          <p><strong>Chargeable Weight:</strong> {props.serviceResult.ChargeableWeight} kg</p>
          <p><strong>Transit Time Estimate:</strong> {props.serviceResult.TransitTimeEstimate}</p>
          <p><strong>Is Warehouse Service:</strong> {props.serviceResult.IsWarehouseService ? 'Yes' : 'No'}</p>
          <p><strong>Total Cost:</strong> ${props.serviceResult.TotalCost.TotalCostNetWithCollection.toFixed(2)}</p>
          <h3>Service Price Breakdown:</h3>
          <ul>
            {props?.serviceResult?.ServicePriceBreakdown?.map((item, i) => (
              <li key={i}>
                <strong>{item.Description}:</strong> ${item.Cost.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Optional Extras:</h3>
          <ul>
            {props?.serviceResult?.OptionalExtras?.map((extra, i) => (
              <li key={i}>
                <strong>{extra.Description}:</strong> ${extra.Cost.toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Signature Required Available:</strong> {props.serviceResult.SignatureRequiredAvailable ? 'Yes' : 'No'}</p>
          <h3>Expected Labels:</h3>
          <ul>
            {props?.serviceResult?.ExpectedLabels?.map((label, i) => (
              <li key={i}>
                <strong>{label.LabelRole} Label:</strong> Format: {label.LabelFormat}, Status: {label.LabelGenerateStatus}
              </li>
            ))}
          </ul>
          <h3>Collection Options:</h3>
          <ul>
            {props?.serviceResult?.CollectionOptions?.map((option, i) => (
              <li key={i}>
                <strong>{option.CollectionOptionTitle}:</strong> Collection Charge: ${option.CollectionCharge.toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Service Type:</strong> {props.serviceResult.ServiceType}</p>
          <button onClick={onSelectQuote}> Select Quote</button>
        </div> 
  );
};

