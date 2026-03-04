import ChatBox from "../components/ChatBox";

export default function CustomerSupport() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>
      <p className="text-gray-600 mb-6">
        Chat with our support team. We're here to help with any questions about orders, products, payments, and more.
      </p>
      <ChatBox />
    </div>
  );
}
