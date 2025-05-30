import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import CartItem from "@/Server_Components/Cartitem";

const Cart_Page = async () => {
  const session = await getCurrentUser();

  const cartItems = await prisma.cart.findMany({
    where: {
      cartOwner: session?.email || '',
    },
    include: {
      fooditem: true,
    },
  });

  return (
    <div className="p-6 space-y-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          title={item.fooditem.name}
          price={parseFloat(item.fooditem.price)} // Convert "250" to number
          image={item.fooditem.image}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};

export default Cart_Page;
