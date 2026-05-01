import { BarberShop } from "@prisma/client"
import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarberShopItemProps {
  barbershop: BarberShop
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-40 overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md">
      <CardContent className="p-2 py-1">
        {/* IMAGEM */}
        <div className="relative h-36 w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            sizes="176px"
            className="rounded-xl object-cover"
          />

          <Badge className="absolute left-2 top-2 flex items-center gap-1 rounded-xl bg-gray-800 px-2 py-0.5 backdrop-blur-sm">
            <StarIcon size={12} className="fill-blue-400 stroke-blue-400" />
            <span className="text-xs font-semibold text-white">5,0</span>
          </Badge>
        </div>

        {/* INFO */}
        <div className="space-y-1 px-1 pb-2 pt-3">
          <h3 className="truncate text-sm font-semibold">{barbershop.name}</h3>

          <p className="text-muted-foreground truncate text-xs">
            {barbershop.address}
          </p>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-xs"
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
