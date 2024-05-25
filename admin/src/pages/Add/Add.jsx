import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Raw Refreshers"
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Raw Refreshers"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  const removeFile = () => {
    setImage(null);
    setData(' ')
    description: ' '
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler }>

        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
        </div>

        <div className="add-product-des flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content' required></textarea>
        </div>

        <div className="add-categoty-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Raw Refreshers">Raw Refreshers</option>
              <option value="Milkshakes">Milkshakes</option>
              <option value="Iced Green tea">Iced Green tea</option>
              <option value="Smoothies">Smoothies</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='Rs.250' />
          </div>
        </div>

        <div className="btn">
          <button type='submit' className='add-btn'>Add Product</button>
          <button onClick={removeFile} type='reset' className='reset-btn' >Clear</button>
        </div>
      </form>

    </div>
  )
}

export default Add