export default function Alert({ type = 'info', title, children, className = '', ...props }) {
  const statusStyles = {
    info: 'from-slate-950/90 border-cyan-400/20 text-cyan-100',
    success: 'from-emerald-950/90 border-emerald-400/20 text-emerald-100',
    warning: 'from-amber-950/90 border-amber-400/20 text-amber-100',
    error: 'from-rose-950/90 border-rose-400/20 text-rose-100',
  }

  return (
    <div
      className={`glass-panel border ${statusStyles[type] || statusStyles.info} p-5 rounded-[1.75rem] shadow-glow ${className}`}
      {...props}
    >
      {title && <div className="mb-3 text-sm uppercase tracking-[0.28em] text-slate-400">{title}</div>}
      <div className="text-sm leading-7">{children}</div>
    </div>
  )
}
