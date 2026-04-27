import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar"
import { Badge } from "../_components/ui/badge"
import { Card, CardContent } from "../_components/ui/card"

const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-2">
            <Badge className="w-fit rounded-xl bg-blue-700">Confirmado</Badge>

            <h3 className="text-xl font-bold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarImage
                  src="/AvatarBaarber.png"
                  alt="Avatar do Vintage Barber"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p>Vintage Barber</p>
            </div>
          </div>

          <div className="min-w-22.5 flex flex-col items-center justify-center border-l border-border/100 pe-2 pl-5">
            <p className="text-sm">Abril</p>
            <p className="text-2xl font-bold">21</p>
            <p className="text-muted-foreground text-sm">12:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
