import Sidebar from "../Sidebar/Sidebar.jsx";
import {useState} from "react";
import {Edit, Eye, X} from "lucide-react";

function Orders() {

    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingIndex, setEditingIndex] = useState(-1);

    const [formData, setFormData] = useState({
        orderID: "",
        customerID: "",
        orderDate: "",
        requiredDate: "",
        shippingDate: "",
        orderStatus: "",
        comments: ""
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [orders, setOrders] = useState([
        {
            orderID: 1234567890,
            customerID: 1234567890,
            orderDate: "2021-01-01",
            requiredDate: "2021-01-01",
            shippingDate: "2021-01-01",
            orderStatus: "Shipped",
            comments: "Shipped on time"

        },
        {
            orderID: 1234567890,
            customerID: 1234567890,
            orderDate: "2021-01-01",
            requiredDate: "2021-01-01",
            shippingDate: "2021-01-01",
            orderStatus: "Cancelled",
            comments: "Cancelled by the customer"

        },
        {
            orderID: 1234567890,
            customerID: 1234567890,
            orderDate: "2021-01-01",
            requiredDate: "2021-01-01",
            shippingDate: "2021-01-01",
            orderStatus: "Pending",
            comments:"Waiting for the stock availability"

        }
        ]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "shipped":
                return {color: "text-green-600 bg-green-50", label: "Shipped"};

            case "pending" :
                return {color: "text-yellow-600 bg-yellow-50", label: "Pending"};

            case "cancelled" :
                return {color: "text-red-600 bg-red-50", label: "Cancelled"};

            case "processing" :
                return {color: "text-blue-600 bg-blue-50", label: "Processing"};

            default:
                return {color: "text-gray-600 bg-gray-50", label: status};
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //updating existing order
        if (isEditing) {
            const updatedOrders = [...orders];
            updatedOrders[editingIndex] = {
                ...formData,
                orderID: Number(formData.orderID),
                customerID: Number(formData.customerID),
                orderDate: formData.orderDate,
                requiredDate: formData.requiredDate,
                shippingDate: formData.shippingDate,
                orderStatus: formData.orderStatus,
                comments: formData.comments
            };
            setOrders(updatedOrders);
            setIsEditing(false);
            setEditingIndex(-1);

        } else {
            //creating a new order
            const newOrder = {
                orderID: Number(formData.orderID),
                customerID: Number(formData.customerID),
                orderDate: formData.orderDate,
                requiredDate: formData.requiredDate,
                shippingDate: formData.shippingDate,
                orderStatus: formData.orderStatus,
                comments: formData.comments
            };
            setOrders([...orders, newOrder]);

        }
        console.log("Form submitted: " , formData);
        setShowForm(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            orderID: "",
            customerID: "",
            orderDate: "",
            requiredDate: "",
            shippingDate: "",
            orderStatus: "",
            comments: ""
        });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditingIndex(-1);
        resetForm();
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    const handleEdit = (order, index) => {
        setFormData({
            orderID: order.orderID,
            customerID: order.customerID,
            orderDate: order.orderDate,
            requiredDate: order.requiredDate,
            shippingDate: order.shippingDate,
            orderStatus: order.orderStatus,
            comments: order.comments
        });
        setIsEditing(true);
        setEditingIndex(index);
        setShowForm(true);
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedOrder(null);
    };

    const filteredOrders = orders.filter(order => {
        return (
            order.orderID.toString().includes(searchTerm) ||
            order.customerID.toString().includes(searchTerm) ||
            order.orderDate.includes(searchTerm) ||
            order.requiredDate.includes(searchTerm) ||
            order.shippingDate.includes(searchTerm) ||
            order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="flex min-h-screen>">
            <Sidebar />
            <div className={`flex-1 p-8 bg-gray-100 transition-all duration-300 ${showForm || showViewModal ? 'blur-sm' : ''}`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-950 mb-4">Orders</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">Add Order</button>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search orders by ID, customer ID, order date, required date, shipping date, or status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
                    />
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer ID</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Order Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Required Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Shipping Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>

                    </tr>
                    </thead>

                        <tbody className="divide-y divide-gray-200">
                        {filteredOrders.map((order,index) => {
                            const statusInfo = getStatusColor(order.orderStatus);
                            return (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-4 px-6 text-sm text-gray-900 font-mono">{order.orderID}</td>
                                    <td className="py-4 px-6 text-sm text-gray-900 font-mono">{order.customerID}</td>
                                    <td className="py-4 px-6 text-sm text-gray-900">{order.orderDate}</td>
                                    <td className="py-4 px-6 text-sm text-gray-900">{order.requiredDate}</td>
                                    <td className="py-4 px-6 text-sm text-gray-900">{order.shippingDate}</td>
                                    <td className="py-4 px-6">
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                        {statusInfo.label}
                                    </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleView(order)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1">
                                                <Eye size={14}/>
                                                <span>View</span>
                                            </button>
                                            <button
                                                onClick={() => handleEdit(order, index)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1"
                                            >
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

            {/*Modal Form*/}
            {showForm && (
                <div className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Order' : 'Add New Order'}
                            </h2>
                            <button
                                onClick={closeForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order ID
                                    </label>
                                    <input
                                        type="number"
                                        name="orderID"
                                        value={formData.orderID}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Customer ID
                                    </label>
                                    <input
                                        type="number"
                                        name="customerID"
                                        value={formData.customerID}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Date
                                    </label>
                                    <input
                                        type="date"
                                        name="orderDate"
                                        value={formData.orderDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Required Date
                                    </label>
                                    <input
                                        type="date"
                                        name="requiredDate"
                                        value={formData.requiredDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shipping Date
                                    </label>
                                    <input
                                        type="date"
                                        name="shippingDate"
                                        value={formData.shippingDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Status
                                    </label>
                                    <select
                                        name="orderStatus"
                                        value={formData.orderStatus}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comments
                                </label>
                                <textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Add any comments or notes about this order..."
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
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
                                >
                                    {isEditing ? 'Update Order' : 'Add Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/*view order modal*/}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                            <button
                                onClick={closeViewModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Order ID</label>
                                    <p className="text-lg font-semibold text-gray-900 font-mono">{selectedOrder.orderID}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Customer ID</label>
                                    <p className="text-lg font-semibold text-gray-900 font-mono">{selectedOrder.customerID}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Order Date</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedOrder.orderDate}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Required Date</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedOrder.requiredDate}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Date</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedOrder.shippingDate}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.orderStatus).color}`}>
                                            {getStatusColor(selectedOrder.orderStatus).label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Comments</label>
                                <p className="text-gray-900 leading-relaxed">
                                    {selectedOrder.comments || 'No comments available'}
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
                                        const orderIndex = orders.findIndex(o => o.orderID === selectedOrder.orderID);
                                        handleEdit(selectedOrder, orderIndex);
                                    }}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                                >
                                    <Edit size={16} />
                                    <span>Edit Order</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )

            }
        </div>



    );



}



export default Orders;