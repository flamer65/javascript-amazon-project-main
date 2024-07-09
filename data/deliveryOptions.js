export const deliveryOption = [
    {
  id: '1',
  deliveryDays: 7,
  pricecents: 0
},
{
  id: '2',
  deliveryDays: 3, 
  pricecents: 499
},{
  id: '3',
  deliveryDays: 1, 
  pricecents: 999
}
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOptions;
    deliveryOption.forEach((option) =>{
      if(option.id === deliveryOptionId){
        deliveryOptions = option
      }
    });
    return  deliveryOptions || deliveryOption[0];
}