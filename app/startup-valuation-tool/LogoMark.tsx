// Young Ventures geometric mark (magenta / cyan / green triangles).
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" fill="#0a0a0a" />
      <polygon points="0,0 36,0 0,36" fill="#ff1a78" />
      <polygon points="36,0 36,36 18,18" fill="#22e6e6" />
      <polygon points="0,36 36,36 18,18" fill="#6bc34a" />
    </svg>
  );
}
