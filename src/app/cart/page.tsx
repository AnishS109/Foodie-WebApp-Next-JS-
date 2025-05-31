import CartCheckout from '@/components/CartCheckout';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import CartItem from '@/Server_Components/Cartitem';


const Cart_Page = async () => {

  // ----------- CHEKCING USER LOGGED IN ----------------

  const session = await getCurrentUser();

  // -------------- FETCHING CART ITEMS FROM DATABASE ----------------

  const cartItems = await prisma.cart.findMany({
    where: {
      cartOwner: session?.email || '',
    },
    include: {
      fooditem: true,
    },
  });

  // ----------------- PRICE CALCULATION -------------------

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.fooditem.price) * item.quantity,
    0
  );

  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>

      {/* Left Side - Cart Items */}
      <div className='md:col-span-2 space-y-4'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.fooditem.name}
              price={parseFloat(item.fooditem.price)}
              image={item.fooditem.image}
              quantity={item.quantity}
            />
          ))
        ) : (
          <p className='text-gray-500 text-center text-2xl'>Your cart is empty.</p>
        )}
      </div>

      {/* Right Side - Checkout Summary */}

      <CartCheckout totalAmount={totalAmount}/>

    </div>
  );
};

export default Cart_Page;
