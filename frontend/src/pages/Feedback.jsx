import { useState, useEffect } from "react";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load feedbacks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("krishiconnect_feedbacks");
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    }
  }, []);

  const handleSubmitFeedback = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name,
      email,
      category,
      message,
      date: new Date(),
    };

    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem(
      "krishiconnect_feedbacks",
      JSON.stringify(updated)
    );

    // Reset form
    setName("");
    setEmail("");
    setCategory("general");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Customer Feedback</h1>
      <p className="text-gray-600 mb-6">
        We value your feedback! Help us improve by sharing your experience with KrishiConnect.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="bg-white shadow rounded-lg p-6 border">
          <h2 className="text-xl font-bold mb-4">Send Feedback</h2>

          {submitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              Thank you for your feedback!
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen"
            >
              <option value="general">General Feedback</option>
              <option value="product">Product Quality</option>
              <option value="delivery">Delivery Experience</option>
              <option value="payment">Payment Issue</option>
              <option value="feature">Feature Request</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen resize-none"
              rows="5"
            />
          </div>

          <button
            onClick={handleSubmitFeedback}
            className="w-full bg-forestGreen text-white px-6 py-2 rounded hover:bg-darkGreen"
          >
            Submit Feedback
          </button>
        </div>

        {/* Stats & Recent Feedback */}
        <div>
          <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
            <h3 className="font-bold text-lg mb-3">Feedback Stats</h3>
            <p className="text-3xl font-bold text-forestGreen mb-2">
              {feedbacks.length}
            </p>
            <p className="text-gray-600">Total feedback received</p>

            {feedbacks.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                {Object.entries(
                  feedbacks.reduce((acc, f) => {
                    acc[f.category] = (acc[f.category] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([cat, count]) => (
                  <p key={cat} className="text-gray-700">
                    <strong>{cat}:</strong> {count}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white shadow rounded-lg p-6 border">
            <h3 className="font-bold text-lg mb-4">Recent Feedback</h3>
            <div className="space-y-3">
              {feedbacks.length === 0 ? (
                <p className="text-gray-500 text-sm">No feedback yet.</p>
              ) : (
                feedbacks
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((fb) => (
                    <div
                      key={fb.id}
                      className="p-3 bg-gray-50 rounded border-l-4 border-forestGreen"
                    >
                      <p className="font-semibold text-sm">{fb.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {fb.category}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {fb.message}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
