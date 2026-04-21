import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"

import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Nikolas!</h2>
        <p>Terça, 21 de Abril</p>

        <div className="mt-6 flex flex-row items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button className="h-8 w-8 p-0">
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-3 h-56 w-full overflow-hidden rounded-2xl">
          <Image
            src="/Banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <Card className="mt-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-bold">Corte de Cabelo</h3>
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

            <div className="border-muted flex flex-col items-center justify-center self-stretch border-l-2 pl-8">
              <p className="text-sm">Abril</p>
              <p className="text-2xl font-bold">21</p>
              <p className="text-muted-foreground text-sm">12:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
