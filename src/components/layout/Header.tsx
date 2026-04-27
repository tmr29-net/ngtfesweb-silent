"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

{/* 検定とマイページを削除 */}
const NavLinks = () => (
  <>
    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
      トップ
    </Link>
    <Link href="/booth" className="text-sm font-medium transition-colors hover:text-primary">
      模擬店
    </Link>
    <Link href="/display" className="text-sm font-medium transition-colors hover:text-primary">
      展示
    </Link>
    <Link href="/stage" className="text-sm font-medium transition-colors hover:text-primary">
      ステージ
    </Link>
    <Link href="/access" className="text-sm font-medium transition-colors hover:text-primary">
      アクセス
    </Link>
  </>
);

const MobileNavLinks = () => (
  <>
    <Link href="/" className="block py-2 text-base font-medium transition-colors hover:text-primary">
      トップ
    </Link>
    <Link href="/booth" className="block py-2 text-base font-medium transition-colors hover:text-primary">
      模擬店
    </Link>
    <Link href="/display" className="block py-2 text-base font-medium transition-colors hover:text-primary">
      展示
    </Link>
    <Link href="/stage" className="block py-2 text-base font-medium transition-colors hover:text-primary">
      ステージ
    </Link>
    <Link href="/access" className="block py-2 text-base font-medium transition-colors hover:text-primary">
      アクセス
    </Link>
  </>
);

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* PC用ロゴ & メニュー */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="w-10 lg:w-12">
              <figure>
                <Image src="/1772606843056.jpg" alt="Logo" width={48} height={48} className="w-full h-auto rounded-full" />
              </figure>
            </div>
            <span className="font-bold text-2xl limelight">SOLA</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavLinks />
          </nav>
        </div>

        {/* スマホ用ボタンエリア（ログイン＋三本線） */}
        <div className="flex items-center space-x-3 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[45%] min-w-[200px] p-0">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <nav className="flex flex-col space-y-5 mt-16 p-8">
                <MobileNavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* PC用右側エリア（ログインボタンのみ） */}
        <div className="hidden md:flex items-center space-x-2">
        </div>
      </div>
    </header>
  );
};
