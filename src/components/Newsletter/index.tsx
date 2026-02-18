import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="px-6 py-8 bg-white">
      <h2 className="text-base font-semibold uppercase tracking-[0.1em] text-primary text-center mb-6">
        Stay Connected
      </h2>
      {submitted ? (
        <p className="text-sm text-center text-gray-600">
          Thank you for subscribing!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-500 h-10 px-2.5 text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-500 h-10 px-2.5 text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-500 h-10 px-2.5 text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-[#153456] transition-colors"
          >
            Submit
          </button>
          <p className="text-xs text-gray-400 text-center">
            By subscribing, you agree to receive marketing communications. You can unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
