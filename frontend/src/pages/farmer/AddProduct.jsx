import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    location: "",
    image: "",
    description: "",
    quantity: "",
    unit: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock behavior
    alert("Product added (mock)");
    setForm({
      name: "",
      price: "",
      category: "",
      location: "",
      image: "",
      description: "",
      quantity: "",
      unit: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price per unit"
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
        />
        <input
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Unit (kg, pcs etc)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-forestGreen text-white px-4 py-2 rounded hover:bg-darkGreen"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
