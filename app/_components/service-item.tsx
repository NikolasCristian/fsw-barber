import { BarberShopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Link from "next/link"

interface ServiceItemProps {
  service: BarberShopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGEM */}
        <div className="relative h-27.5 w-27.5 min-w-27.5">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* INFO */}
        <div className="w-full space-y-1">
          <h3 className="font-bold">{service.name}</h3>

          <p className="text-muted-foreground line-clamp-2 text-sm">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="font-bold text-blue-500">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button asChild variant="secondary" size="sm">
              <p>Reservar</p>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
