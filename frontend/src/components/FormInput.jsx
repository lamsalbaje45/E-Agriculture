export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  error,
}) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-3 text-xl">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${icon ? "pl-11" : "px-4"} pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F6F4F] focus:border-transparent transition-all duration-300 bg-white text-[#1E293B] placeholder-[#64748B] ${
            error ? "border-red-500 ring-2 ring-red-200" : "border-[#E2E8F0]"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
