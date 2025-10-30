import Sidebar from "../Sidebar/Sidebar.jsx";
import {useState} from "react";
import {Eye,Edit, X} from 'lucide-react';


function Products() {
    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingIndex, setEditingIndex] = useState(-1);

    const [formData, setFormData] = useState({
        productCode: '',
        productName: '',
        productLine: '',
        productScale: '',
        productVendor: '',
        productDescription: '',
        quantityInStock: '',
        buyPrice: '',
        MSRP: ''
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [products,setProducts] = useState([
        {
            productCode: 1234567890,
            name: "Product 1",
            price: "Kshs 4500",
            stock: 20
        },
        {
            productCode: 1234567890,
            name: "Product 1",
            price: "Kshs 4500",
            stock: 70

        },
        {
            productCode: 1234567890,
            name: "Product 1",
            price: "Kshs 4500",
            stock: 70

        },
        {
            productCode: 1234567890,
            name: "Product 1",
            price: "Kshs 4500",
            stock: 70

        },

    ]);

    const getStockStatus = (stock) => {
        if(stock < 30) return {color: 'text-red-600 bg-red-50' , label: 'Low Stock'};
        if(stock < 60) return {color: 'text-yellow-600 bg-yellow-50' , label: 'Medium'};
        return {color: 'text-green-600 bg-green-50' , label: 'In Stock'};
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Update existing product
            const updatedProducts = [...products];
            updatedProducts[editingIndex] = {
                productCode: formData.productCode,
                name: formData.productName,
                price: `Kshs ${formData.MSRP}`,
                stock: formData.quantityInStock,
                productLine: formData.productLine,
                productScale: formData.productScale,
                productVendor: formData.productVendor,
                productDescription: formData.productDescription,
                buyPrice: formData.buyPrice,
                MSRP: formData.MSRP
            };
            setProducts(updatedProducts);
            setIsEditing(false);
            setEditingIndex(-1);
        } else {
            // Creating a new product
            const newProduct = {
                productCode: formData.productCode,
                name: formData.productName,
                price: `Kshs ${formData.MSRP}`,
                stock: formData.quantityInStock,
                productLine: formData.productLine,
                productScale: formData.productScale,
                productVendor: formData.productVendor,
                productDescription: formData.productDescription,
                buyPrice: formData.buyPrice,
                MSRP: formData.MSRP
            };

            // Adding new product
            setProducts([...products, newProduct]);
        }

        console.log('Form submitted: ', formData);
        setShowForm(false);
        resetForm();
    };

        const resetForm = () => {
            setFormData({
                productCode: '',
                productName: '',
                productLine: '',
                productScale: '',
                productVendor: '',
                productDescription: '',
                quantityInStock: '',
                buyPrice: '',
                MSRP: ''
            });
        };

        const closeForm = () => {
            setShowForm(false);
            setIsEditing(false);
            setEditingIndex(-1);
            resetForm();

        };

        const handleView = (product) => {
            setSelectedProduct(product);
            setShowViewModal(true);
        };

        const handleEdit = (product, index) => {
            setFormData({
                productCode: product.productCode,
                productName: product.name,
                productLine: product.productLine,
                productScale: product.productScale,
                productVendor: product.productVendor,
                productDescription: product.productDescription,
                quantityInStock: product.stock,
                buyPrice: product.buyPrice,
                MSRP: product.MSRP
            });
            setIsEditing(true);
            setEditingIndex(index);
            setShowForm(true);
        };

        const closeViewModal = () => {
            setShowViewModal(false);
            setSelectedProduct(null);

        };


        const filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        })

        return (
            <div className="flex min-h-screen>">
                <Sidebar/>
                <div className={`flex-1 p-8 transition-all duration-300 ${showForm ? 'blur-sm' : ''}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold text-gray-950 mb-4">Products</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Add
                            product
                        </button>
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product
                                    Code
                                </th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>


                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product, index) => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="py-4 px-6 text-sm text-gray-900 font-mono">{product.productCode}</td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {product.price}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                                                    {product.stock} units
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {stockStatus.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleView(product)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                                    <Eye size={14}/>
                                                    <span>View</span>
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(product, index)}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                                    <Edit size={14}/>
                                                    <span>Edit</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>


                                );

                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*modal form*/}
                {showForm && (
                    <div className="fixed inset-0  bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                                <button
                                    onClick={closeForm}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24}/>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/*<div className="p-6 space-y-6">*/}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Code
                                        </label>
                                        <input
                                            type="text"
                                            name="productCode"
                                            value={formData.productCode}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Line
                                        </label>
                                        <input
                                            type="text"
                                            name="productLine"
                                            value={formData.productLine}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Scale
                                        </label>
                                        <input
                                            type="text"
                                            name="productScale"
                                            value={formData.productScale}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Vendor
                                        </label>
                                        <input
                                            type="text"
                                            name="productVendor"
                                            value={formData.productVendor}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantity In Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="quantityInStock"
                                            value={formData.quantityInStock}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Buy Price
                                        </label>
                                        <input
                                            type="number"
                                            name="buyPrice"
                                            value={formData.buyPrice}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            MSRP
                                        </label>
                                        <input
                                            type="number"
                                            name="MSRP"
                                            value={formData.MSRP}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Description
                                    </label>
                                    <textarea
                                        name="productDescription"
                                        value={formData.productDescription}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        // onClick={() => {
                                        //     handleSubmit({ preventDefault: () => {} });
                                        // }}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        {isEditing ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>


                )}

                {/*view product modal*/}
                {showViewModal && selectedProduct && (
                    <div className="fixed inset-0  bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                                <button
                                    onClick={closeViewModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24}/>
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Product
                                            Code</label>
                                        <p className="text-lg font-semibold text-gray-900 font-mono">{selectedProduct.productCode}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Product Name
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedProduct.name}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Product Line
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedProduct.productLine}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Product Scale
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedProduct.productScale}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Product Vendor
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedProduct.productVendor}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Quantity In Stock
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-lg font-semibold text-gray-900">
                                                {selectedProduct.stock} units
                                            </p>
                                            <span
                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(selectedProduct.stock).color}`}>
                                            {getStockStatus(selectedProduct.stock).label}
                                        </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Buy Price
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            Kshs {selectedProduct.buyPrice}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            MSRP
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedProduct.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-2">
                                        Product Description
                                    </label>
                                    <p className="text-gray-900 leading-relaxed">
                                        {selectedProduct.productDescription}
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={closeViewModal}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>

                                    <button
                                        onClick={() => {
                                            closeViewModal();
                                            const productIndex = products.findIndex(p => p.productCode === selectedProduct.productCode);
                                            handleEdit(selectedProduct, productIndex);
                                        }}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                                    >
                                        <Edit size={16}/>
                                        <span>Edit Product</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        )





}

export default Products;