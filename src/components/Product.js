import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { addToBasket } from "@/slices/basketSlice";
import { useDispatch } from "react-redux";

function Product({id, title, price, description, category, image}) {
  const dispatch = useDispatch();
  
  const MAX_RATING=5;
  const MIN_RATING=3;

  const [rating, setRating] = useState(1);

  const [hasPrime, setHasPrime] = useState(true);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);
  
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };
  
  
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

      
        <div className="flex mx-auto justify-center h-[250px] w-[250px]">
           <Image src={image} height={200} width={200} alt="" />
        </div>
      

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_,i) => (
           <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
          <Currency quantity={price} currency="INR" symbol="₹" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">Add to Cart</button>
    </div>
  );
}

export default Product;
