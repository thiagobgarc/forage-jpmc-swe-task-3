import { ServerRespond } from './DataStreamer';

export interface Row {
  // The price of abc
  price_abc: number,
  // The price of def
  price_def: number,
  // The ratio of price_abc to price_def
  ratio: number,
  // The timestamp of data
  timestamp: Date,
  // The upper bound value
  upper_bound: number,
  // The lower bound value
  lower_bound: number,
  // The trigger alert value, which is optional and can be undefined
  trigger_alert: number | undefined, 
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // Calculate the average price of ABC by adding the top ask and top bid prices and dividing by 2
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
  
    // Calculate the average price of DEF by adding the top ask and top bid prices and dividing by 2
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
  
    // Calculate the ratio of priceABC to priceDEF
    const ratio = priceABC / priceDEF;
  
    // Set the upper bound value to 1 + 0.05
    const upperBound = 1 + 0.05;
  
    // Set the lower bound value to 1 - 0.05
    const lowerBound = 1 - 0.05;
    return {
      price_abc: priceABC, // Set the value of price_abc property to the variable priceABC
      price_def: priceDEF, // Set the value of price_def property to the variable priceDEF
      ratio, // Set the value of ratio property to the variable ratio
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? 
        serverResponds[0].timestamp : serverResponds[1].timestamp,
        // Set the value of timestamp property to the larger timestamp value between serverResponds[0] and serverResponds[1]
    
      upper_bound: upperBound, // Set the value of upper_bound property to the variable upperBound
      lower_bound: lowerBound, // Set the value of lower_bound property to the variable lowerBound
    
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
        // Set the value of trigger_alert property to ratio if it is outside the bounds, otherwise set it to undefined
    }
    }
  }

