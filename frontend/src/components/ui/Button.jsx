export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={"inline-flex items-center justify-center rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 " + className}
      {...props}
    >
      {children}
    </button>
  )
}
