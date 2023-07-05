import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Freatured from '@/components/Freatured'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import NewProducts from '@/components/NewProducts'



export default function Home({ featuredProduct, newProducts }) {

  return (
    <div className=''>
      <Header />
      <Freatured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '649c3cd79dc2ebc9c02608fe';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }

  }
}
