import Card from '@/components/Card';
import { prisma } from '@/lib/prisma';

const FoodSection = async ({ params }: { params: { foodSection: string } }) => {
  // ------------------ FTECHING FOOD SECTION FROM PARAMS ---------------------

  const foodSection = params.foodSection;

  // ------------ FETCHING FOOD SECTION DATA FROM DATABASE ------------------

  const category = await prisma.foodcategory.findUnique ({
    where: {
      name: foodSection,
    },
    include: {
      fooditem: true,
    },
  });
  const foodItems = category?.fooditem;

  return (
    <div className='pt-20 flex flex-wrap justify-center gap-14'>
      {foodItems?.map((item) => {
        const data = {
          title:item.name,
          image:item.image,
          price:item.price
        }
        return (
          <div key={item.id} >
          <Card data={data}/>
          </div>
        )
      })}
    </div>
  );
};

export default FoodSection;
