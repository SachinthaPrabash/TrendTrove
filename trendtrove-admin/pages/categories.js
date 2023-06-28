import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2'

const Categories = ({ swal }) => {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [properties, setProperties] = useState([])

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get("/api/categories").then((result) => {
            setCategories(result.data);
        });
    };

    const saveCategory = async (e) => {
        e.preventDefault();
        const data = {
            name, parentCategory,
            properties: properties.map(p => ({
                name: p.name,
                value: p.value.split(',')
            }))
        };

        if (editedCategory) {
            await axios.put("/api/categories", { ...data, _id: editedCategory._id });
            setEditedCategory(null)
        } else {
            await axios.post("/api/categories", data);
        }

        setName("");
        setParentCategory('')
        setProperties([])
        fetchCategories();
    };

    const editCategory = (category) => {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(category.properties.map(({ name, value }) => ({
            name,
            value: value.join(',')
        })))
    };

    const deleteCategory = (category) => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true
        }).then(async result => {

            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();

            }
        }).catch(error => {
            console.error(error)
        });

    }

    const addProperty = () => {
        setProperties(prev => {
            return [...prev, { name: '', value: '' }]
        })
    }

    const handlePropertyNameChange = (idx, property, newName) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[idx].name = newName;
            return properties
        })
    }

    const handlePropertyValueChange = (idx, property, newValue) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[idx].value = newValue;
            return properties
        })
    }

    const removeProperty = (indexToRemove) => {
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove
            })

        })
    }

    return (
        <Layout>
            <div className="mb-4 text-2xl uppercase font-bold justify-center flex"> Categories</div>
            <label >{editedCategory ? "Edit Category" : "New Category "}</label>

            <form onSubmit={saveCategory} >
                <div className="flex gap-1 mt-2">
                    <input
                        type="text"
                        placeholder="Category Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <select
                        onChange={(e) => setParentCategory(e.target.value)}
                        value={parentCategory}
                    >
                        <option value="">No Parent Value</option>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                    </select>

                </div>
                <div className="m-2">
                    <label className="block font-bold " > Properties </label>
                    <button
                        onClick={addProperty}
                        type="button"
                        className="btn-default my-4">Add Property</button>
                </div>
                {properties.length > 0 && properties.map((propertie, idx) => (
                    <div key={idx} className="flex gap-1 mb-2">
                        <input type="text"
                            value={propertie.name}
                            onChange={(e) => handlePropertyNameChange(idx, propertie, e.target.value)}
                            placeholder="Property name (exm: color)" />

                        <input type="text"
                            value={propertie.value}
                            onChange={(e) => handlePropertyValueChange(idx, propertie, e.target.value)}
                            placeholder="Values, comma separated" />
                        <button
                            type="button"
                            onClick={() => removeProperty(idx)}
                            className="btn-red">Remove</button>
                    </div>
                ))}
                <div className="flex gap-1">
                    {editedCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('')
                                setParentCategory('')
                                setProperties([])
                            }}
                            className="btn-primary">Cancel</button>

                    )}
                    <button type="submit" className="btn-primary my-3">
                        Save
                    </button>
                </div>
            </form>
            {!editedCategory && (
                <table className="basic mt-2">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Parent Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((category, idx) => (
                                <tr key={idx}>
                                    <td>{category.name}</td>
                                    <td>{category?.parent?.name}</td>
                                    <td>
                                        <button
                                            className="btn-primary ml-2 mr-2"
                                            onClick={() => editCategory(category)}
                                        >
                                            Edit
                                        </button>
                                        <button className="btn-red ml-2"
                                            onClick={() => deleteCategory(category)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}

        </Layout>
    );
};


export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />

));
