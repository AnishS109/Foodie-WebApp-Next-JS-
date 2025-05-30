import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface CardData {
    title :string,
    image : string,
}

const Card = ({data}:{data:CardData}) => {
  return (
    <CardContainer
      className='bg-white rounded-xl shadow-lg p-6'
      containerClassName='mt-[-120px]'
    >
      <CardBody className='h-[400px] w-[400px]'>
        {/* Image CardItem */}
        <CardItem translateZ={80} className='w-full h-[300px]'>
          <img
            src= {`${data.image}`}
            alt='Juicy Burger'
            className='w-full h-full object-cover rounded-xl shadow-md'
          />
        </CardItem>

        {/* Title Text */}
        <CardItem
          className='text-center text-xl font-bold mt-4'
          translateZ={50}
          rotateZ={5}
        >
          {data.title}
        </CardItem>

        {/* Add to Cart Button */}
        <CardItem translateZ={30} className='flex justify-center mt-6'>
          <button className='bg-yellow-500 hover:bg-black cursor-pointer text-white font-semibold py-2 px-6 rounded-full transition duration-200'>
            Add to Cart{' '}
            <span>
              <AddShoppingCartIcon />
            </span>
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default Card;
