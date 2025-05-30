import { DesertImage, FastFoodImage, MainCourseImage } from '@/assets';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import Carousel from '@/components/ui/carousel';
import Card from '@/Server_Components/Card';

export default function Home() {
  // ------------------- 3D MARQUEE IMAGES ------------------

  const images = [
    '/Assests/pizza.jpg',
    '/Assests/idli.jpg',
    '/Assests/paneer.jpg',
    '/Assests/iceCream.jpg',
    '/Assests/roti.jpg',
    '/Assests/sandwich.jpg',
    '/Assests/coffee.jpg',
    '/Assests/burger.jpg',
    '/Assests/pizza.jpg',
    '/Assests/idli.jpg',
    '/Assests/paneer.jpg',
    '/Assests/iceCream.jpg',
    '/Assests/roti.jpg',
    '/Assests/sandwich.jpg',
    '/Assests/coffee.jpg',
    '/Assests/burger.jpg',
    '/Assests/pizza.jpg',
    '/Assests/idli.jpg',
    '/Assests/paneer.jpg',
    '/Assests/iceCream.jpg',
    '/Assests/roti.jpg',
    '/Assests/sandwich.jpg',
    '/Assests/coffee.jpg',
    '/Assests/burger.jpg',
    '/Assests/pizza.jpg',
    '/Assests/idli.jpg',
    '/Assests/paneer.jpg',
    '/Assests/iceCream.jpg',
    '/Assests/roti.jpg',
    '/Assests/sandwich.jpg',
    '/Assests/coffee.jpg',
  ];

  // ---------------------- FOOD CATEGORY IMAGE -----------------

  const slides = [
    {
      src: FastFoodImage,
      title: 'Fast Food Section',
      button: 'Explore',
      category: 'fast-food',
    },
    {
      src: MainCourseImage,
      title: 'Main Course Section',
      button: 'Explore',
      category: 'main-course',
    },
    {
      src: DesertImage,
      title: 'Desert Section',
      button: 'Explore',
      category: 'desert',
    },
  ];

  // --------------------- ALL FOOD MAPPING -----------------------

  const data = [
    {
      image: '/Assests/burger.jpg',
      title: 'Juicy Burger',
    },
    {
      image: '/Assests/pizza.jpg',
      title: 'Pizza',
    },
    {
      image: '/Assests/idli.jpg',
      title: 'Idli Sambhar',
    },
    {
      image: '/Assests/paneer.jpg',
      title: 'Shaahi Paneer',
    },
    {
      image: '/Assests/iceCream.jpg',
      title: 'Ice Cream',
    },
    {
      image: '/Assests/roti.jpg',
      title: 'Chapati',
    },
    {
      image: '/Assests/sandwich.jpg',
      title: 'Sandwich',
    },
    {
      image: '/Assests/coffee.jpg',
      title: 'Cold Coffee',
    },
  ];

  return (
    <>
      {/* ------------------------- 3D MARQUEE ------------------------ */}
      <ThreeDMarquee images={images}  />
      {/* ------------------------ FOOD CATEGORY ----------------------- */}
      <div className='bg-slate-200 pt-10 h-fit pb-20'>
        <h1 className='text-center text-2xl md:text-4xl text-black font-bold mb-10'>
          Food Categories
        </h1>
        <Carousel slides={slides} />
      </div>
      {/* -------------------------- ALL FOOD SECTION ------------------- */}
      <div>
        <h1 className='text-2xl md:text-4xl text-center font-bold mt-16 mb-28'>
          Food You'll Love
        </h1>
        <div className='flex gap-10 flex-wrap mx-6 justify-center'>
          {data.map((item) => (
            <Card key={item.title} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
