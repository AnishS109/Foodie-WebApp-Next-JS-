
const FoodItem = ({params}:{params:{foodItem:string;foodSection:string}}) => {
    const foodItem = params.foodItem
    const foodSection = params.foodSection
  return (
    <div>
        Food Section : {foodSection}
        Food Section : {foodItem}
    </div>
  )
}

export default FoodItem