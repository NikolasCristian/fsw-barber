import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-3">
        <Image
          src="/logo.png"
          alt="Logo da barbearia"
          height={18}
          width={120}
        />

        <Sheet>
          <SheetTrigger
            render={
              <Button size="icon" variant="premium" className="cursor-pointer">
                <MenuIcon />
              </Button>
            }
          />

          <SheetContent
            side="right"
            className="w-80 overflow-x-auto border border-white/10 bg-black/90 p-6 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-2 border-b border-solid py-5">
              <Avatar size="lg">
                <AvatarImage src="/AvatarBaarber.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-bold">Pedro Gonçalves</p>
                <p className="text-xs">pedrogoncalves@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              <SheetClose>
                <Button
                  asChild
                  variant="secondary"
                  className="w-full justify-start gap-2"
                >
                  <Link href="/">
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>

              <Button variant="success" className="justify-start gap-2">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="success"
                  className="justify-start gap-2"
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={16}
                    width={12}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="gap-1py-5 flex flex-col">
              <Button variant="success" className="justify-start gap-2">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
