export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1 rounded-xs border border-hairline bg-canvas px-1.5 py-0.5 font-sans">
      {children}
    </kbd>
  )
}
