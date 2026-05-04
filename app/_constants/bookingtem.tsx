import { format, isFuture } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar"
import { Badge } from "../_components/ui/badge"
import { Card, CardContent } from "../_components/ui/card"
import { Prisma } from "@/generated/prisma/browser"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.bookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <Badge
              className="w-fit rounded-xl"
              variant={isConfirmed ? "destructive" : "outline"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <h3 className="text-xl font-bold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarImage
                  src={booking.service.barbershop.imageUrl}
                  alt="Avatar do Vintage Barber"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p>{booking.service.barbershop.name}</p>
            </div>
          </div>

          <div className="min-w-22.5 flex flex-col items-center justify-center border-l border-border/100 pe-2 pl-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl font-bold">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-muted-foreground text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
