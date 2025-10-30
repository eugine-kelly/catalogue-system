import Sidebar from "../Sidebar/Sidebar.jsx";
import {useState} from "react";
import {Edit,Trash} from "lucide-react";


function Employees() {
    const [employees,setEmployees] = useState([
        {
            id: "001",
            name: "John",
            role: "Sales Representative",
            officeCode: "1234567890",
            email: "employee@gmail.com",
            reportsTo: "Employee B",
        },
        {
            id: "002",
            name: "John",
            role: "Sales Representative",
            officeCode: "1234567890",
            email: "employee@gmail.com",
            reportsTo: "Employee B",
        },
        ]);

  return (
      <div className="flex min-h-screen>">
          <Sidebar />
          <div className="flex-1 p-8 bg-gray-100">
              <div className="flex items-center justify-between mb-8">
                  <h1 className="text-4xl font-bold text-gray-950 mb-4">Customers</h1>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">Add Customer</button>
              </div>
              <div className="mb-4">
                  <input
                      type="text"
                      placeholder="Search customers"
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
                  />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                    {employees.map((employee) => (
                        <div key={employee.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
                            <p className="text-gray-700">Role: {employee.role}</p>
                            <p className="text-gray-700">Office Code: {employee.officeCode}</p>
                            <p className="text-gray-700">Email: {employee.email}</p>
                            <p className="text-gray-700">Reports To: {employee.reportsTo}</p>
                            <div className="flex space-x-2 mt-4">
                                <button className="text-blue-500 hover:text-blue-600">
                                    <Edit size={20} />
                                </button>
                                <button className="text-red-500 hover:text-red-600">
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
          </div>
      </div>
            </div>
  );
}

export default Employees;