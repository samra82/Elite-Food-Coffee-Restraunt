import Image from "next/image";
import Link from "next/link";
import { IoChevronForwardOutline } from "react-icons/io5";
import Navbar from '@/components/Navbar';


const products = [
  {
    id: 1,
    name: 'Classic Burger',
    image: '/assets/product1.svg',
    originalPrice: 50.00,
    discountPrice: 45.00,
  },
  {
    id: 2,
    name: 'Spicy Pizza',
    image: '/assets/product2.svg',
    originalPrice: 40.00,
    discountPrice: 35.00,
  },
  {
    id: 3,
    name: 'Chicken Sandwich',
    image: '/assets/product3.svg',
    originalPrice: 25.00,
    discountPrice: 20.00,
  },
  {
    id: 4,
    name: 'Grilled Cheese',
    image: '/assets/product4.svg',
    originalPrice: 30.00,
    discountPrice: 28.00,
  },
  {
    id: 5,
    name: 'Veggie Pizza',
    image: '/assets/product5.svg',
    originalPrice: 38.00,
    discountPrice: 33.00,
  },
  {
    id: 6,
    name: 'French Fries',
    image: '/assets/product6.svg',
    originalPrice: 15.00,
    discountPrice: 12.00,
  },
  {
    id: 7,
    name: 'Crispy Chicken Wrap',
    image: '/assets/product7.png',
    originalPrice: 35.00,
    discountPrice: 30.00,
  },
  {
    id: 8,
    name: 'BBQ Wings',
    image: '/assets/product8.svg',
    originalPrice: 45.00,
    discountPrice: 40.00,
  },
  {
    id: 9,
    name: 'Caesar Salad',
    image: '/assets/product9.svg',
    originalPrice: 20.00,
    discountPrice: 18.00,
  },
];

const ShopList = () => {
  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

      <header className="relative bg-black w-full ">
     <Navbar/>

     {/* Background Image */}
     <div className="h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative">
       <Image
         src="/assets/header.svg"
         alt="Header Image"
         layout="fill"
         objectFit="cover"
         priority
       />
       

       {/* Centered Text */}
       <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Shop </h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">Shop</span>
         </p>
       </div>
     </div>
   </header>
   
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Product List */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              {/* Sorting and Filter Controls */}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 ">
                      <span>Sort By:</span>
                      <select className="border border-gray-300 rounded-md py-1 px-3 ">
                        <option value="newest">Newest</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                      </select>
                    </label>
                    <label className="flex items-center space-x-2">
                      <span>Show:</span>
                      <select className="border border-gray-300 rounded-md py-1 px-3">
                        <option value="default">Default</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg">
                  <Image
                    width={312}
                    height={267}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 line-through">${product.originalPrice.toFixed(2)}</p>
                  <p className="text-yellow-500 font-semibold">${product.discountPrice.toFixed(2)}</p>
                 <Link href="/ShoppingCart"> <button className="mt-3 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
                    Add to Cart
                  </button></Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-8">
              <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">1</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">2</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">3</button>
            </div>
          </div>

                         {/* Right Column: Filters */} 
<aside className="lg:w-1/4 lg:pl-8 mt-8 lg:mt-0">
  {/* Categories */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">Category</h4>
    <ul className="space-y-2">
      <li><input type="checkbox" id="sandwiches" /> <label htmlFor="sandwiches">Sandwiches</label></li>
      <li><input type="checkbox" id="burger" /> <label htmlFor="burger">Burger</label></li>
      <li><input type="checkbox" id="chicken-chup" /> <label htmlFor="chicken-chup">Chicken Chup</label></li>
      <li><input type="checkbox" id="drink" /> <label htmlFor="drink">Drink</label></li>
      <li><input type="checkbox" id="pizza" /> <label htmlFor="pizza">Pizza</label></li>
    </ul>
  </div>

  {/* Featured Shop */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">Featured Shop</h4>
    <div className="border border-gray-200 rounded-lg p-4">
      <Image src="/assets/filter.svg" width={248} height={268} alt="Featured Product" className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-lg font-semibold">Perfect Taste Classic Restaurant</h3>
      <p className="text-yellow-500 font-semibold">$45.00</p>
      <button className="mt-3 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
        Shop Now
      </button>
    </div>
  </div>

  {/* Filter by Price */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">Filter by Price</h4>
    <input
      type="range"
      min="0"
      max="1000"
      className="w-full"
    />
  </div>

  {/* Latest Products */}
<div className="mb-6">
  <h4 className="text-lg font-semibold mb-3">Latest Products</h4>
  <ul className="space-y-4">
    {/* Product 1 */}
    <li className="flex items-center">
      <Image src="/assets/product3.svg" width={50} height={50} alt="Product 1" className="w-12 h-12 rounded-md object-cover mr-4" />
      <div>
        <h5 className="font-semibold">Classic Burger</h5>
        {/* Star Ratings */}
        <div className="text-yellow-500 text-sm mb-1">
          &#9733;&#9733;&#9733;&#9733;&#9734; 
        </div>
        <p className="text-gray-600 font-semibold">$10.00</p>
      </div>
    </li>

    {/* Product 2 */}
    <li className="flex items-center">
      <Image src="/assets/product6.svg" width={50} height={50} alt="Product 2" className="w-12 h-12 rounded-md object-cover mr-4" />
      <div>
        <h5 className="font-semibold">Spicy Pizza</h5>
        {/* Star Ratings */}
        <div className="text-yellow-500 text-sm mb-1">
          &#9733;&#9733;&#9733;&#9733;&#9733; {/* Example: 5 stars */}
        </div>
        <p className="text-gray-600 font-semibold">$15.00</p>
      </div>
    </li>

    {/* Product 3 */}
    <li className="flex items-center">
      <Image src="/assets/product8.svg" width={50} height={50} alt="Product 3" className="w-12 h-12 rounded-md object-cover mr-4" />
      <div>
        <h5 className="font-semibold">Chicken Sandwich</h5>
        {/* Star Ratings */}
        <div className="text-yellow-500 text-sm mb-1">
          &#9733;&#9733;&#9733;&#9733;&#9734; 
        </div>
        <p className="text-gray-600 font-semibold">$12.00</p>
      </div>
    </li>
  </ul>
</div>


  {/* Product Tags */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">Product Tags</h4>
    <div className="flex flex-wrap gap-2">
      {['Pizza', 'Cupcake', 'Burger', 'Cookies', 'Our Shop' , 'Services' ].map(tag => (
        <span key={tag} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{tag}</span>
      ))}
    </div>
  </div>
</aside>

        </div>
      </main>

    </div>
  );
};

export default ShopList;
