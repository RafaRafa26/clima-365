import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Clima 365. Todos os direitos reservados.
          </p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Termos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
