import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function OverviewPage() {
  const pages = [
    { name: 'Home', path: '/', description: 'Start your journey with us and explore the heart of our website!' },
    { name: 'Menu', path: '/Menu', description: 'Browse through our delicious offerings and plan your next meal.' },
    { name: 'Shop', path: '/ShopList', description: 'Discover products you’ll love and start shopping today!' },
    { name: 'Shop Detail', path: '/ShopDetails', description: 'Get in-depth details about our featured products.' },
    { name: 'Shopping Cart', path: '/ShoppingCart', description: 'Review and manage the items in your cart with ease.' },
    { name: 'Checkout', path: '/CheckoutPage', description: 'Complete your purchase quickly and securely.' },
    { name: 'Our Chef', path: '/OurChef', description: 'Meet the culinary experts behind our amazing dishes.' },
    { name: 'Sign In', path: '/SignInPage', description: 'Access your account and stay connected.' },
    { name: 'Sign Up', path: '/SignUpPage', description: 'Join our community for exclusive benefits and updates.' },
    { name: 'Blog', path: '/BlogPage', description: 'Read our latest articles and stay informed on trending topics.' },
    { name: 'Blog Detail', path: '/BlogDetails', description: 'Dive deeper into specific articles and learn more.' },
    { name: 'About', path: '/About', description: 'Learn about our journey, mission, and values.' },
    { name: 'Contact', path: '/Contact', description: 'Get in touch with us for inquiries or support.' },
    { name: 'FAQ', path: '/FAQPage', description: 'Find answers to the most commonly asked questions.' },
    { name: '404 Page', path: '/Page404', description: '"Lost your way? This is where we help you get back on track. Explore other sections to find what you’re looking for.' },
  ];

  return (
  <>
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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Explore Our Website</h1>
         <p className="text-center text-slate-300 text-lg mb-12">
        Discover the different sections of our website and see what we have to offer!
      </p>
       </div>
     </div>
   </header>
    <div className="container mx-auto px-4 py-8">
        
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              {page.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {page.description}
            </p>
            <Link href={page.path}>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 hover:shadow-lg transition-all duration-200">
                Visit {page.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div></>
  );
}
