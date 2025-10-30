import Sidebar from "../Sidebar/Sidebar.jsx";
import {useState} from "react";
import {Eye,Edit, X} from 'lucide-react';

function Customer() {
    const [showForm, setShowForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingIndex, setEditingIndex] = useState(-1);

    const [formData, setFormData] = useState({
        name: "",
        customerID: "",
        firstName: "",
        lastName: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        salesRep: ""
    });

    const [searchTerm, setSearchTerm] = useState("");


    const [customers, setCustomers] = useState( [
        {
            name: "kelly",
            customerID: "1234567890",
            firstName: "Juan",
            lastName: "Perez",
            phone: "1234567890",
            address1: "address 1A",
            address2: "address 2A",
            city: "City A",
            state: "State A",
            salesRep: "001A"

        },
        {
            name: "Juan",
            customerID: "1234567890",
            firstName: "Juan",
            lastName: "Perez",
            phone: "1234567890",
            address1: "address 1A",
            address2: "address 2A",
            city: "City A",
            state: "State A",
            salesRep: "001A"
        },
        {
            name: "Juan",
            customerID: "1234567890",
            firstName: "Juan",
            lastName: "Perez",
            phone: "1234567890",
            address1: "address 1A",
            address2: "address 2A",
            city: "City A",
            state: "State A",
            salesRep: "001A"

        },
        {
            name: "Juan",
            customerID: "1234567890",
            firstName: "Juan",
            lastName: "Perez",
            phone: "1234567890",
            address1: "address 1A",
            address2: "address 2A",
            city: "City A",
            state: "State A",
            salesRep: "001A"
        }

    ]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedCustomers = [...customers];
            updatedCustomers[editingIndex] = formData;
            setCustomers(updatedCustomers);
            setIsEditing(false);
            setEditingIndex(-1);
        } else {
            setCustomers([...customers, formData]);
        }
        console.log('Form submitted:', formData);
        setShowForm(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            customerID: "",
            firstName: "",
            lastName: "",
            phone: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            salesRep: ""
        });
    };

    const closeForm = () => {
        setShowForm(false);
        setIsEditing(false);
        setEditingIndex(-1);
        resetForm();
    };

    const handleView = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    const handleEdit = (customer, index) => {
        setFormData({
            name: customer.name,
            customerID: customer.customerID,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            address1: customer.address1,
            address2: customer.address2,
            city: customer.city,
            state: customer.state,
            salesRep: customer.salesRep
        });
        setIsEditing(true);
        setEditingIndex(index);
        setShowForm(true);
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedCustomer(null);
    };

    const filteredCustomers = customers.filter(customer => {
        return (
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.customerID.toString().includes(searchTerm) ||
            customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm) ||
            customer.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.address2.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.salesRep.includes(searchTerm)
        );
    });

    return (
        <div className="flex min-h-screen>">

                <Sidebar />


            <div className={`flex-1 p-8 bg-gray-100 transition-all duration-300 ${showForm || showViewModal ? 'blur-sm' : ''}`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-950 mb-4">Customers</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Add Customer</button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search customers by name, ID, or other details"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
                        />
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer ID</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">First Name</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Name</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address 1</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address 2</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">City</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">State</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Sales Rep</th>
                        <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>

                    </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredCustomers.map((customer,index) =>(
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="py-4 px-6 text-sm text-gray-900 font-medium">{customer.name}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.customerID}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.firstName}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.lastName}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.phone}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.address1}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.address2}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.city}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.state}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{customer.salesRep}</td>
                            <td className="py-4 px-6 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                    onClick={() => handleView(customer)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1">
                                        <Eye size={14} />
                                        <span>View</span>

                                    </button>
                                    <button
                                        onClick={() => handleEdit(customer, index)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1">
                                        <Edit size={14} />
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            </div>
        </div>

            {/*modal form*/}
            {showForm && (
                <div className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Customer' : 'Add New Customer'}
                            </h2>
                            <button onClick={closeForm} className="text-gray-500 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sales Rep
                                    </label>
                                    <input
                                        type="text"
                                        name="salesRep"
                                        value={formData.salesRep}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address 1
                                    </label>
                                    <input
                                        type="text"
                                        name="address1"
                                        value={formData.address1}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address 2
                                    </label>
                                    <input
                                        type="text"
                                        name="address2"
                                        value={formData.address2}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                                    {isEditing ? 'Update Customer' : 'Add Customer'}
                                </button>
                            </div>
                            </form>
                    </div>


                    </div>
            )}

            {/*view customer modal*/}
            {showViewModal && selectedCustomer && (
                <div className="fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                            <button
                                onClick={closeViewModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Customer ID</label>
                                    <p className="text-lg font-semibold text-gray-900 font-mono">{selectedCustomer.customerID}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.firstName}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.lastName}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.phone}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Sales Rep</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.salesRep}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Address 1</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.address1}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Address 2</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.address2 || 'N/A'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.city}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedCustomer.state}</p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    onClick={closeViewModal}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                    Close
                                </button>

                                <button
                                    onClick={() => {
                                        closeViewModal();
                                        const customerIndex = customers.findIndex(c => c.customerID === selectedCustomer.customerID);
                                        handleEdit(selectedCustomer, customerIndex);
                                    }}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2">
                                    <Edit size={16} />
                                    <span>Edit Customer</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );

}

export default Customer