import React, { useEffect } from 'react'
import styles from "./Brands.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getBrands} from '../../Redux/productSlice'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Brands() {
  let dispatch = useDispatch()
  let {brands} = useSelector((state)=> state.productRed)
  
 async function getData(){
    await dispatch(getBrands())
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    
    <div className='container mx-auto text-center my-8'>
              <> 
                <h2 className="text-2xl font-semibold text-center my-6">Brands</h2>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {brands.map((brand) => (
                    <div key={brand._id} className='p-3 border rounded-lg shadow-md transition hover:shadow-lg'>
                      <NavLink to={`/brandDetails/${brand._id} `}>
                      <img src={brand.image} className='w-[200px]' alt="" />
                      <h3 className='text-main text-sm'>{brand.name}</h3>
                      </NavLink>
                    </div>
                  ))}
                </div>
                <Helmet>
        <title>Brands</title>
        <meta charSet='utf-8' />
      </Helmet>
              </>
    </div>
  )
}
