import { BarberShop } from "@prisma/client"
import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { StarIcon } from "lucide-react"

interface BarberShopItemProps {
  barbershop: BarberShop
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-40 overflow-hidden rounded-2xl">
      <CardContent className="px-1 pt-1">
        {/* IMAGEM */}
        <div className="relative h-36 w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
            sizes="176px"
          />

          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-blue-600 stroke-blue-600" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* INFO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>

          <p className="text-muted-foreground truncate text-sm">
            {barbershop.address}
          </p>

          <Button variant="ghost" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
