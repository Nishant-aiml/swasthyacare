import React, { useState, useMemo } from 'react';
import EPrescriptions from '../components/Medicines/EPrescriptions';
import MedicineReminder from '../components/Medicines/MedicineReminder';
import DiscountOffers from '../components/Medicines/DiscountOffers';
import SubscriptionService from '../components/Medicines/SubscriptionService';
import AlternativeMedicineFinder from '../components/Medicines/AlternativeMedicineFinder';
import Cart from '@/components/Pharmacy/Cart';
import ProductCard from '@/components/Pharmacy/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { FileText, Bell, Tag, Package, Search, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  prescription: boolean;
  rating: number;
  reviews: number;
}

const categories = [
  "All Products",
  "Medicines",
  "Women's Care",
  "Personal Care",
  "Baby Care",
  "Health Devices",
  "Supplements",
  "Ayurvedic",
  "Wellness"
];

const products: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Medicines",
    price: 50,
    image: "/images/pharmacy/paracetamol.jpg",
    description: "Pain relief and fever reduction tablets",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 128
  },
  {
    id: "2",
    name: "Digital Thermometer",
    category: "Health Devices",
    price: 299,
    image: "/images/pharmacy/thermometer.jpg",
    description: "Accurate digital temperature measurement",
    inStock: true,
    prescription: false,
    rating: 4.3,
    reviews: 89
  },
  {
    id: "3",
    name: "Whisper Ultra Clean Sanitary Pads",
    category: "Women's Care",
    price: 199,
    image: "/images/pharmacy/pads.jpg",
    description: "Pack of 30, Ultra thin with wings",
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 543
  },
  {
    id: "4",
    name: "Intimate Wash",
    category: "Women's Care",
    price: 299,
    image: "/images/pharmacy/intimate-wash.jpg",
    description: "pH balanced intimate hygiene wash",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 234
  },
  {
    id: "5",
    name: "Hand Sanitizer Pack",
    category: "Personal Care",
    price: 149,
    image: "/images/pharmacy/sanitizer.jpg",
    description: "70% Alcohol, Pack of 3",
    inStock: true,
    prescription: false,
    rating: 4.4,
    reviews: 167
  },
  {
    id: "6",
    name: "Baby Diaper Pack",
    category: "Baby Care",
    price: 699,
    image: "/images/pharmacy/diapers.jpg",
    description: "Ultra-soft diapers, Pack of 46",
    inStock: true,
    prescription: false,
    rating: 4.8,
    reviews: 432
  },
  {
    id: "7",
    name: "Blood Pressure Monitor",
    category: "Health Devices",
    price: 1999,
    image: "/images/pharmacy/bp-monitor.jpg",
    description: "Digital BP monitor with memory function",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 298
  },
  {
    id: "8",
    name: "Multivitamin Tablets",
    category: "Supplements",
    price: 449,
    image: "/images/pharmacy/vitamins.jpg",
    description: "Daily multivitamin supplement, 60 tablets",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 187
  },
  {
    id: "9",
    name: "Ashwagandha Tablets",
    category: "Ayurvedic",
    price: 299,
    image: "/images/pharmacy/ashwagandha.jpg",
    description: "Natural stress relief supplement",
    inStock: true,
    prescription: false,
    rating: 4.4,
    reviews: 156
  },
  {
    id: "10",
    name: "Menstrual Cup",
    category: "Women's Care",
    price: 599,
    image: "/images/pharmacy/menstrual-cup.jpg",
    description: "Reusable silicone menstrual cup",
    inStock: true,
    prescription: false,
    rating: 4.7,
    reviews: 342
  },
  {
    id: "11",
    name: "Period Pain Relief Patches",
    category: "Women's Care",
    price: 249,
    image: "/images/pharmacy/pain-patch.jpg",
    description: "Natural pain relief patches, Pack of 5",
    inStock: true,
    prescription: false,
    rating: 4.5,
    reviews: 178
  },
  {
    id: "12",
    name: "Women's Multivitamin",
    category: "Women's Care",
    price: 549,
    image: "/images/pharmacy/women-vitamin.jpg",
    description: "Specially formulated for women's health",
    inStock: true,
    prescription: false,
    rating: 4.6,
    reviews: 245
  }
];

export default function Medicines() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (product: Product) => {
    if (product.prescription) {
      toast.error('This product requires a prescription. Please upload one in E-Prescriptions.');
      return;
    }
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  // Create SearchAndFilter component
  interface SearchAndFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
  }

  function SearchAndFilter({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
  }: SearchAndFilterProps) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Medicine Management & Healthcare Store
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your one-stop destination for all healthcare needs. From prescriptions to wellness products,
          we've got you covered with quality healthcare items.
        </p>
      </div>

      <div data-tabs-value={activeTab}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center space-x-2 mb-8 flex-wrap">
            <TabsTrigger value="prescriptions" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>E-Prescriptions</span>
            </TabsTrigger>

            <TabsTrigger value="pharmacy" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Healthcare Store</span>
            </TabsTrigger>

            <TabsTrigger
              value="reminders"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'reminders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Reminders</span>
            </TabsTrigger>

            <TabsTrigger
              value="offers"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'offers'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>Offers</span>
            </TabsTrigger>

            <TabsTrigger
              value="subscriptions"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Subscriptions</span>
            </TabsTrigger>

            <TabsTrigger
              value="alternatives"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'alternatives'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Find Alternatives</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="prescriptions">
              <EPrescriptions />
            </TabsContent>

            <TabsContent value="pharmacy">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <SearchAndFilter
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      categories={categories}
                    />
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          {!product.inStock && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                              Out of Stock
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <span className="text-blue-600 font-bold">₹{product.price}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock || product.prescription}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {product.prescription
                              ? 'Requires Prescription'
                              : !product.inStock
                              ? 'Out of Stock'
                              : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Section */}
                <div className="lg:col-span-1 sticky top-4">
                  <Cart 
                    items={cart.map(product => ({ product, quantity: 1 }))}
                    onUpdateQuantity={(productId, change) => {
                      if (change < 0) {
                        removeFromCart(productId);
                      }
                    }}
                    onRemoveItem={removeFromCart}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reminders">
              <MedicineReminder />
            </TabsContent>

            <TabsContent value="offers">
              <DiscountOffers />
            </TabsContent>

            <TabsContent value="subscriptions">
              <SubscriptionService />
            </TabsContent>

            <TabsContent value="alternatives">
              <AlternativeMedicineFinder />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Our healthcare experts are available 24/7 to assist you with your medicine-related queries.
          </p>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Contact Support
          </button>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-medium text-green-900 mb-2">Schedule a Consultation</h3>
          <p className="text-sm text-green-700">
            Talk to a pharmacist about your medications and get expert advice.
          </p>
          <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Book Appointment
          </button>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-medium text-purple-900 mb-2">Medicine Information</h3>
          <p className="text-sm text-purple-700">
            Access detailed information about your medicines, including side effects and interactions.
          </p>
          <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}