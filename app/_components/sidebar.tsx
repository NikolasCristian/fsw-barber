"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
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
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const SideBarButton = () => {
  const { data } = useSession()
  const handlLoginWithGoogleClick = () => signIn("google")
  const handlLogoutClick = () => signOut()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="premium" className="cursor-pointer">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-white/ w-80 overflow-x-auto border bg-black/60 p-6 backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>

        <div className="border-b border-white/10 py-5">
          {data?.user ? (
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage
                  src={data?.user?.image ?? ""}
                  alt={data.user.name ?? "User"}
                />
                <AvatarFallback>{data.user.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-none">
                  {data.user.name}
                </p>
                <p className="max-w-45 truncate text-xs text-gray-400">
                  {data.user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <h2 className="text-base font-semibold">Faça login</h2>

              <p className="max-w-55 pb-5 text-xs text-gray-400">
                Conecte-se com sua conta do Google para continuar
              </p>

              <Button
                variant="glass"
                className="flex w-full items-center justify-center gap-2"
                onClick={handlLoginWithGoogleClick}
              >
                <Image src="/Google.svg" width={18} height={18} alt="Google" />
                Continuar com Google
              </Button>
            </div>
          )}
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
            <SheetClose key={option.title} asChild>
              <Button
                asChild
                key={option.title}
                variant="success"
                className="justify-start gap-2"
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={16}
                    width={12}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <div className="gap-1py-5 flex flex-col">
          <Button
            variant="success"
            className="justify-start gap-2"
            onClick={handlLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SideBarButton
