import Sidebar from "../Sidebar/Sidebar.jsx";
import {useState} from "react";
import {Edit, Eye, Trash2, X} from "lucide-react";


function Payments() {

    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [editingIndex, setEditingIndex] = useState(-1);

    const [formData, setFormData] = useState({
        customerID: "",
        checkNumber: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "",
        customerName: "",
        description:""
    })

    const [searchTerm, setSearchTerm] = useState("");

    const [payments, setPayments] = useState ([
        {

            customerID: 1234567890,
            checkNumber: "1234567890",
            amount: "4500",
            paymentDate: "2021-01-01",
            paymentMethod: "Cash",
            customerName: "Gabriel",
            description: "Payment for product A"

        },
        {
            customerID: 1234567890,
            checkNumber: "1234567890",
            amount: "4500",
            paymentDate: "2021-01-01",
            paymentMethod: "Check",
            customerName: "Gabbby",
            description: "Payment for product B"

        },
        {
            customerID: 1234567890,
            checkNumber: "1234567890",
            amount: "4500",
            paymentDate: "2021-01-01",
            paymentMethod: "Bank Transfer",
            customerName: "Riri",
            description: "Payment for product C"
        }
    ]);

    const getPaymentStatus = (amount) => {
        const numAmount = parseFloat(amount);
        if (numAmount > 0) return {color: "text-green-600 bg-green-50", label: "Paid"};
        else if (numAmount === 0) return {color: "text-blue-600 bg-blue-50", label: "Pending"};
        else return {color: "text-red-600 bg-red-50", label: "Overdue"};
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            //update existing payment
            const updatedPayments = [...payments];
            updatedPayments[editingIndex] = {
                customerID: formData.customerID,
                checkNumber: formData.checkNumber,
                amount: formData.amount,
                paymentDate: formData.paymentDate,
                paymentMethod: formData.paymentMethod,
                customerName: formData.customerName,
                description: formData.description
            };
            setPayments(updatedPayments);
            setIsEditing(false);
            setEditingIndex(-1);

        } else {
            //creating new payment
            const newPayment = {
                customerID: formData.customerID,
                checkNumber: formData.checkNumber,
                amount: formData.amount,
                paymentDate: formData.paymentDate,
                paymentMethod: formData.paymentMethod,
                customerName: formData.customerName,
                description: formData.description
            };

            //Adding the new payment
            setPayments([...payments, newPayment]);
        }

        console.log('Form submitted: ', formData);
        setShowForm(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            customerID: "",
            checkNumber: "",
            amount: "",
            paymentDate: "",
            paymentMethod: "",
            customerName: "",
            description:""

        });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditingIndex(-1);
        resetForm();
    };

    const handleView = (payment) => {
        setSelectedPayment(payment);
        setShowViewModal(true);
    };

    const handleEdit = (payment, index) => {
        setFormData({
            customerID: payment.customerID,
            checkNumber: payment.checkNumber,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            paymentMethod: payment.paymentMethod,
            customerName: payment.customerName,
            description: payment.description
        });

        setIsEditing(true);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            const updatedPayments = payments.filter((payment, i) => i !== index);
            setPayments(updatedPayments);
        }
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedPayment(null);
    };

    const filteredPayments = payments.filter(payment => {
        const searchLower = searchTerm.toLowerCase();
        return (
            payment.customerName.toLowerCase().includes(searchLower) ||
                payment.checkNumber.toLowerCase().includes(searchLower) ||
                payment.amount.toLowerCase().includes(searchLower) ||
                payment.paymentDate.toLowerCase().includes(searchLower) ||
                payment.paymentMethod.toLowerCase().includes(searchLower) ||
                payment.description.toLowerCase().includes(searchLower)

        );
    });

    // const [searchTerm, setSearchTerm] = useState("");

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    return (
        <div className="flex min-h-screen">

            <Sidebar />


            <div className={`flex-1 p-8 transition-all duration-300 ${showForm ? 'blur-sm' : ''}`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-950 mb-4">Payments</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Add Payment</button>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search payments"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">

                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer ID</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer Name</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Check Number</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Payment Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Payment Method</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>


                    </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredPayments.map((payment,index) =>{
                        const paymentStatus = getPaymentStatus(payment.amount);
                        return(
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">

                            <td className="py-4 px-6 text-sm text-gray-900 font-mono">{payment.customerID}</td>
                            <td className="py-4 px-6">
                                <div className="text-sm font-semibold text-gray-900">
                                    {payment.customerName}
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="text-sm font-semibold text-gray-900">
                                    {payment.checkNumber}
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="flex items-center">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    Kshs {payment.amount}
                                                </span>
                                    <span className={`ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium ${paymentStatus.color}`}>
                                                    {paymentStatus.label}
                                                </span>
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="text-sm font-semibold text-gray-900">
                                    {formatDate(payment.paymentDate)}
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {payment.paymentMethod}
                                </span>
                            </td>

                            <td className="py-4 px-6">
                                <div className="text-sm text-gray-900">
                                    {payment.description}
                                </div>
                            </td>

                            <td className="py-4 px-6 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleView(payment)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1"
                                    >
                                        <Eye size={14} />
                                        <span>View</span>
                                    </button>

                                    <button
                                        onClick={() => handleEdit(payment, index)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1"
                                    >
                                        <Edit size={14} />
                                        <span>Edit</span>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1"
                                    >
                                        <Trash2 size={14} />
                                        <span>Delete</span>
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


        {/*payment form model*/}

            {showForm && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Payment' : 'Add New Payment'}
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
                                        Customer ID
                                    </label>
                                    <input
                                        type="text"
                                        name="customerID"
                                        value={formData.customerID}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Check Number
                                    </label>
                                    <input
                                        type="text"
                                        name="checkNumber"
                                        value={formData.checkNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Amount (Kshs)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Date
                                    </label>
                                    <input
                                        type="date"
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Check">Check</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Mobile Money">Mobile Money</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Payment description or notes..."
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
                                    {isEditing ? 'Update Payment' : 'Add Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}

            {/*view payment modal*/}

            {showViewModal && selectedPayment && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
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
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Customer ID
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900 font-mono">
                                        {selectedPayment.customerID}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Customer Name
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {selectedPayment.customerName}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Check Number
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {selectedPayment.checkNumber}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Amount
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-lg font-semibold text-gray-900">
                                            Kshs {selectedPayment.amount}
                                        </p>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatus(selectedPayment.amount).color}`}>
                                            {getPaymentStatus(selectedPayment.amount).label}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Payment Date
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatDate(selectedPayment.paymentDate)}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Payment Method
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {selectedPayment.paymentMethod}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Description
                                </label>
                                <p className="text-gray-900 leading-relaxed">
                                    {selectedPayment.description || 'No description provided'}
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
                                        const paymentIndex = payments.findIndex(p => p.customerID === selectedPayment.customerID && p.checkNumber === selectedPayment.checkNumber);
                                        handleEdit(selectedPayment, paymentIndex);
                                    }}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                                >
                                    <Edit size={16} />
                                    <span>Edit Payment</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>


            )}
        </div>


    );

}

export default Payments;