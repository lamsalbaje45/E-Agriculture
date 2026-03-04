export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#2F6F4F" opacity="0.1" />

      {/* Left leaf */}
      <path
        d="M 35 65 Q 30 50 35 35 Q 40 45 45 55"
        stroke="#2F6F4F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Center leaf */}
      <path
        d="M 50 75 Q 50 50 50 25 Q 55 45 55 65"
        stroke="#2F6F4F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Right leaf */}
      <path
        d="M 65 65 Q 70 50 65 35 Q 60 45 55 55"
        stroke="#2F6F4F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Soil/ground element */}
      <path
        d="M 30 68 Q 50 75 70 68"
        stroke="#6B4423"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Root hint */}
      <circle cx="50" cy="82" r="3" fill="#6B4423" />
      <circle cx="40" cy="80" r="2" fill="#6B4423" />
      <circle cx="60" cy="80" r="2" fill="#6B4423" />

      {/* Center circle accent */}
      <circle cx="50" cy="50" r="6" fill="#2F6F4F" />
    </svg>
  );
}
