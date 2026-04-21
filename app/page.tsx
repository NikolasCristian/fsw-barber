import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import BarberShopItem from "./_components/ui/barbershop-item"

import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"

const Home = async () => {
  const barbershops = await db.barberShop.findMany()

  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
    take: 10,
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Nikolas!</h2>
        <p>Terça-feira, 21 de Abril.</p>

        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button variant="secondary" className="h-8 w-8 px-1.5">
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button variant="ghost" className="gap-2">
            <Image src="/Cabelo.svg" alt="Cabelo" height={16} width={16} />
            Cabelo
          </Button>

          <Button variant="ghost" className="gap-2">
            <Image src="/Barba.svg" alt="Barba" height={16} width={16} />
            Barba
          </Button>

          <Button variant="ghost" className="gap-2">
            <Image
              src="/Acabamento.svg"
              alt="Acabamento"
              height={16}
              width={16}
            />
            Acabamento
          </Button>

          <Button variant="ghost" className="gap-2">
            <FootprintsIcon size={16} />
            Pézinho
          </Button>

          <Button variant="ghost" className="gap-2">
            <EyeIcon size={16} />
            Sobrancelha
          </Button>
        </div>

        <div className="relative mt-6 h-45 w-full overflow-hidden rounded-2xl">
          <Image
            src="/Banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="text-xl font-bold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage
                    src="./AvatarBaarber.png"
                    alt="Avatar do Vintage Barber"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Vintage Barber</p>
              </div>
            </div>

            <div className="border-border/50 flex min-w-22.5 flex-col items-center justify-center border-l pl-4">
              <p className="text-sm">Abril</p>
              <p className="text-2xl font-bold">21</p>
              <p className="text-muted-foreground text-sm">12:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <footer>
        <Card>
          <CardContent className="flex items-center justify-between px-6 py-5">
            <p className="text-sm text-gray-400">
              ©2026 Copyright<span className="font-bold"> FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
