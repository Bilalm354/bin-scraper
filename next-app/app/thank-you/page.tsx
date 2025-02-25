import { FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-semibold text-green-600">Thank you!</h1>
      <p className="text-lg mt-2 text-gray-700">
        You have successfully signed up. We&apos;ll send you a text once
        everything is set up.
      </p>
    </div>
  );
}
