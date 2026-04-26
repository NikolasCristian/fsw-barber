import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import Image from "next/image"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

const SideBarButton = () => {
  return (
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
        className="border-white/ w-80 overflow-x-auto border bg-black/80 p-6 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-2 border-b border-solid py-5">
          <h2 className="text-lg">Olá, Faça seu login!</h2>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="secondary" size="icon">
                  <LogInIcon />
                </Button>
              }
            />

            <DialogContent className="rounded-2xl bg-black/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-lg">
              <DialogHeader className="text-center">
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>

              <Button variant="glass" className="flex items-center gap-2">
                <Image
                  src="/Google.svg"
                  width={18}
                  height={18}
                  alt="Fazer login com o Google"
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
          {/*<Avatar size="lg">
            <AvatarImage src="/AvatarBaarber.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold">Pedro Gonçalves</p>
            <p className="text-xs">pedrogoncalves@gmail.com</p>
          </div>*/}
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
  )
}

export default SideBarButton
