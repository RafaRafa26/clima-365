import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import SearchBar from "./search-bar";
import { Button } from "@/components/ui/button";
import { Star, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ClimaPro
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <Link href="/favoritos">
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
                <span className="sr-only">Cidades Favoritas</span>
              </Button>
            </Link>
            <ModeToggle />
            <Button variant="outline">Entrar</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <SearchBar />
                <Link href="/favoritos">
                  <Button variant="outline" className="w-full">
                    <Star className="h-4 w-4 mr-2" />
                    Cidades Favoritas
                  </Button>
                </Link>
                <ModeToggle />
                <Button variant="outline" className="w-full">
                  Entrar
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
