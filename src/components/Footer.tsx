export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface">
      <div className="w-full px-4 sm:px-8 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://suryaraj.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Surya Mangaraj
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
