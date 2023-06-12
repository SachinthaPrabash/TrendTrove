import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FiUpload } from 'react-icons/fi'
import { PuffLoader } from 'react-spinners'
import { ReactSortable } from 'react-sortablejs'

const ProductForm = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: existingCategory,
    properties: assignProperties,
}) => {
    const [title, setTitle] = useState(existingTitle || '')
    const [category, setCategory] = useState(existingCategory || '')
    const [productProperties, setProductProperties] = useState(assignProperties || {})
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [goToProducts, setGoToProducts] = useState(false)
    const [images, setImages] = useState(existingImages || [])
    const [isUploading, setIsUploading] = useState(false)
    const [categories, setCategories] = useState([])

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories')
            .then(result => {

                setCategories(result.data)
            });

    }, [])

    const saveProduct = async (e) => {
        e.preventDefault();
        const data = { title, description, price, images, category, properties: productProperties };
        if (_id) {
            await axios.put('/api/products', { ...data, _id });
        } else {
            await axios.post('/api/products', data);
        }

        setGoToProducts(true);
    };

    if (goToProducts) {
        router.push('/products');
    }

    const uploadImages = async (ev) => {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true)
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            setIsUploading(false)
        }
    };

    const updateImageOrder = (images) => {
        setImages(images)
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category)
        // console.log({ catInfo });
        propertiesToFill.push(...catInfo.properties)
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat
        }
    }

    const setProductProp = (propName, value) => {
        setProductProperties(prev => {
            const newProductProp = { ...prev }
            newProductProp[propName] = value
            return newProductProp
        })
    }

    return (
        <form onSubmit={saveProduct}>

            <div className=" mx-2 ">
                <label>Product Name</label>
                <input type="text" placeholder='product name' value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <label >Category</label>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}>
                    <option>Uncategoris</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

                {propertiesToFill.length > 0 && propertiesToFill.map((p, idx) => (
                    <div className='items-center' key={idx}>
                        <label className="">{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                        <select value={productProperties[p.name]}
                            onChange={e => setProductProp(p.name, e.target.value)}>
                            {p.value.map((v, idx) => (
                                <option key={idx} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <label>Photos</label>
                <div className="mb-2 flex flex-wrap gap-2">
                    <ReactSortable list={images} setList={updateImageOrder} className='flex flex-wrap'>

                        {!!images?.length && images.map((link, idx) => (
                            <div key={idx} className=" rounded-lg">
                                <img src={link}
                                    className='h-24 w-24 rounded-lg border' />
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 p-1 bg-gray-200 flex rounded-lg items-center">
                            <PuffLoader color="#2563eb" />
                        </div>
                    )}
                    <label className='w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer'>
                        <FiUpload />
                        <div className="">
                            Upload
                        </div>
                        <input type="file" onChange={uploadImages} className='hidden' />
                    </label>


                </div>
                <label>Product Description</label>
                <textarea type="text" rows='4' placeholder='product description' value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <label>Price (in LKR)</label>
                <input type="NUMBER" placeholder='product price' value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <div className="flex justify-between">
                    <button type='submit' className='btn-primary'>Save</button>
                    <Link href={'/products'}>

                        <button className='btn-primary flex items-center '>
                            <BiArrowBack /></button>
                    </Link>

                </div>

            </div>

        </form>
    )
}

export default ProductForm