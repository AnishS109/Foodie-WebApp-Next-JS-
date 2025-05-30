const FoodSection = ({ params }: { params: { foodSection: string } }) => {
  const foodSection = params.foodSection;
  return <div>Food Section: {foodSection}</div>;
};

export default FoodSection;
