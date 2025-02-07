import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  BarChart,
  PieChart,
  Calendar,
  Package,
  Truck,
  DollarSign,
  Users,
  Settings,
  Plus,
} from "lucide-react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import AddServiceForm from "../components/AddServiceForm";
import AddProductForm from "../components/AddProductForm";
import Modal from "../components/Modal";
import { useAppContext } from "../components/AppContext";

// Mock data

const ordersByCategory = [
  { id: "Wedding", value: 45 },
  { id: "Car Decoration", value: 25 },
  { id: "Custom Bouquet", value: 20 },
  { id: "Event Floral", value: 10 },
];

const recentOrders = [
  {
    id: 1,
    customer: "John Doe",
    product: "Wedding Package",
    date: "2023-07-15",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Car Decoration",
    date: "2023-07-14",
    status: "In Progress",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    product: "Custom Bouquet",
    date: "2023-07-13",
    status: "Pending",
  },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const { services, products, path, render, setRender, orders, customers } =
    useAppContext();

  const sidebarItems = [
    { icon: BarChart, label: "Dashboard", value: "dashboard" },
    { icon: Package, label: "Products", value: "products" },
    { icon: Truck, label: "Services", value: "services" },
    { icon: Calendar, label: "Orders", value: "orders" },
    { icon: Users, label: "Customers", value: "customers" },
    { icon: Settings, label: "Settings", value: "settings" },
  ];

  //console.log(products, services);

  const getOrdersCountByMonth = (orders, month) => {
    // Define month names for mapping
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert the month string (if given) to a zero-based index
    let monthIndex =
      typeof month === "string" ? monthNames.indexOf(month) : month - 1; // If passed as number (1-12), convert to index (0-11)

    if (monthIndex < 0 || monthIndex > 11) {
      console.error("Invalid month provided.");
      return 0;
    }

    // Filter and count orders in the specified month
    return orders.filter((order) => {
      const orderMonth = new Date(order.orderDate).getMonth(); // Get month (0-11)
      return orderMonth === monthIndex;
    }).length;
  };

  const monthlyOrders = [
    { month: "Jan", orders: getOrdersCountByMonth(orders, 1) },
    { month: "Feb", orders: getOrdersCountByMonth(orders, 2) },
    { month: "Mar", orders: getOrdersCountByMonth(orders, 3) },
    { month: "Apr", orders: getOrdersCountByMonth(orders, 4) },
    { month: "May", orders: getOrdersCountByMonth(orders, 5) },
    { month: "Jun", orders: getOrdersCountByMonth(orders, 6) },
    { month: "Jul", orders: getOrdersCountByMonth(orders, 7) },
    { month: "Aug", orders: getOrdersCountByMonth(orders, 8) },
    { month: "Sep", orders: getOrdersCountByMonth(orders, 9) },
    { month: "Oct", orders: getOrdersCountByMonth(orders, 10) },
    { month: "Nov", orders: getOrdersCountByMonth(orders, 11) },
    { month: "Dec", orders: getOrdersCountByMonth(orders, 12) },
  ];

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      weekday: "short", // e.g., "Thu"
      day: "2-digit", // e.g., "23"
      month: "short", // e.g., "Jan"
      year: "numeric", // e.g., "2025"
      hour: "2-digit", // e.g., "08"
      minute: "2-digit", // e.g., "10"
      second: "2-digit", // e.g., "19"
      hour12: true, // AM/PM format
    });
  };

  const renderTable = (
    data,
    columns,
    deleteItem,
    updateOrderStatus,
    activeTab,
    formatDate
  ) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td
                  key={column}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {activeTab === "orders" && column === "orderDate"
                    ? formatDate(item[column]) // Corrected function call
                    : activeTab === "orders"
                    ? item[column]
                    : item[column.toLowerCase()]}
                </td>
              ))}
              <td className=" whitespace-nowrap text-sm text-gray-500">
                {activeTab === "orders" ? (
                  <div className="flex px-6 py-4 flex-col items-center justify-center group">
                    <h3 className="text-sm font-semibold text-gray-600  group-hover:hidden">
                      Update Status
                    </h3>
                    <div className="space-x-2 group-hover:flex hidden ">
                      <button
                        onClick={() => updateOrderStatus(item._id, "Pending")}
                        className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateOrderStatus(item._id, "Shipped")}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Shipped
                      </button>
                      <button
                        onClick={() => updateOrderStatus(item._id, "Completed")}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const deleteServiceById = async (id) => {
    try {
      const response = await axios.delete(`${path}services/${id}`);
      console.log("Item deleted successfully:", response.data);
      setRender(render + 1);
      // Optionally trigger a re-render or refresh data here
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const deleteProductById = async (id) => {
    try {
      const response = await axios.delete(`${path}products/${id}`);
      console.log("Item deleted successfully:", response.data);
      setRender(render + 1);
      // Optionally trigger a re-render or refresh data here
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(`${path}orders/${id}`, {
        orderStatus: status,
      });

      console.log("Order updated successfully:", response.data);
      setRender(render + 1); // Re-render to reflect changes
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const getTotalOrderAmount = (orders) => {
    return orders.reduce((total, order) => total + (order.orderStatus ==='Completed' ? order.totalAmount  || 0:0), 0);
  };

  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-40 md:w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-pink-600">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.value}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 w-full ${
                activeTab === item.value
                  ? "bg-pink-100 text-pink-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.value)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </h3>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">
                  $
                  { getTotalOrderAmount(orders) }
                </div>
                <p className="text-xs text-gray-500">+20.1% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    New Customers
                  </h3>
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">+{customers.length}</div>
                <p className="text-xs text-gray-500">+180.1% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Orders
                  </h3>
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">+{orders.length}</div>
                <p className="text-xs text-gray-500">+19% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Active Services
                  </h3>
                  <Truck className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold">+{services.length}</div>
                <p className="text-xs text-gray-500">+ since last hour</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Monthly Orders</h3>
                <div className="h-80">
                  <ResponsiveBar
                    data={monthlyOrders}
                    keys={["orders"]}
                    indexBy="month"
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "nivo" }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Month",
                      legendPosition: "middle",
                      legendOffset: 32,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Orders",
                      legendPosition: "middle",
                      legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Orders by Category
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Distribution of orders across different categories
                </p>
                <div className="h-80">
                  <ResponsivePie
                    data={ordersByCategory}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: "nivo" }}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkColor={{ from: "color" }}
                    sliceLabelsSkipAngle={10}
                    sliceLabelsTextColor="#333333"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <p className="text-sm text-gray-500 mb-4">
                Latest customer orders and their status
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left ">
                      <th className="pb-3 px-1  font-medium">Order ID</th>
                      <th className="pb-3 px-1 font-medium">Customer</th>
                      <th className="pb-3 px-1 font-medium">
                        Product / Service
                      </th>
                      <th className="pb-3 px-1 font-medium">Date</th>
                      <th className="pb-3 px-1 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice().reverse().map((order) => (
                      <tr key={order._id} className="border-t">
                        <td className="py-2">{order._id}</td>
                        <td className="py-2">{order.name}</td>
                        <td className="py-2">
                          {order.productId || order.serviceId}
                        </td>
                        <td className="py-2">{formatDate(order.orderDate)}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.orderStatus === "Completed"
                                ? "bg-green-200 text-green-800"
                                : order.orderStatus === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={() => setIsProductModalOpen(true)}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </button>
            </div>
            {renderTable(
              products,
              ["_Id", "Name", "Price", "Category"],
              deleteProductById
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Services</h2>
              <button
                onClick={() => setIsServiceModalOpen(true)}
                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Service
              </button>
            </div>
            {renderTable(
              services,
              ["_ID", "Name", "Price", "Category"],
              deleteServiceById
            )}
          </div>
        )}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Orders</h2>
            </div>
            {renderTable(
              orders.slice().reverse(),
              [
                "_id",
                "name",
                "totalAmount",
                "orderDate",
                "email",
                "phone",
                "orderType",
                "zipcode",
                "orderStatus",
              ],
              "",
              updateOrderStatus,
              activeTab,
              formatDate
            )}
          </div>
        )}
        {activeTab === "customers" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customers</h2>
            </div>
            {renderTable(
              customers,
              [
                "_id",
                "name",
                "email",
                "mobile",
                "address",
                "zipcode",
                "orders",
              ],
              "",
              updateOrderStatus,
              activeTab,
              formatDate
            )}
          </div>
        )}

        {["settings"].map(
          (tab) =>
            activeTab === tab && (
              <div key={tab} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </h2>
                <p className="text-gray-600">
                  This is the {tab} management section.
                </p>
                <p className="mt-4">
                  Content for {tab} will be implemented here.
                </p>
              </div>
            )
        )}
      </main>

      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title="Add New Product"
      >
        <AddProductForm />
      </Modal>

      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Add New Service"
      >
        <AddServiceForm />
      </Modal>
    </div>
  );
}
