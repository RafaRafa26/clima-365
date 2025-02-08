"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import NavbarSearch from "./navbar-search"; // Importe o NavbarSearch

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Clima 365
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {/* Use o NavbarSearch aqui */}
            <NavbarSearch
              onLocationSelect={(lat, lon) => {
                router.push(`/weather/${lat}/${lon}`);
              }}
            />
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
                <NavbarSearch
                  onLocationSelect={(lat, lon) => {
                    router.push(`/weather/${lat}/${lon}`);
                  }}
                />
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

