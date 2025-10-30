import {useState} from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";


function Offices() {

    const [offices,setEmployees] = useState([
        {
            officeName: "Office A",
            officeCode: "1234567890",
            city: "Nairobi",
            addressLine1: "Address Line A",
            addressLine2:"Address Line B",
            country: "Kenya",
            phone: "1234567890",
        },
        {
            officeName: "Office B",
            officeCode: "1234567890",
            city: "Nairobi",
            addressLine1: "Address Line A",
            addressLine2:"Address Line B",
            country: "Kenya",
            phone: "1234567890",
        },
    ]);

    return (
        <div className="flex min-h-screen>">
            <Sidebar />
            <div className="flex-1 p-8 bg-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-950 mb-4">Offices</h1>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">Add Office</button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search office"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">

                    {offices.map((office) => (
                        <div key={office.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{office.officeName}</h2>
                            <p className="text-gray-700">Office Code: {office.officeCode}</p>
                            <p className="text-gray-700">{office.city}</p>
                            <p className="text-gray-700">{office.addressLine1}</p>
                            <p className="text-gray-700">{office.addressLine2}</p>
                            <p className="text-gray-700">{office.city}</p>
                            <p className="text-gray-700">{office.phone}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Offices;