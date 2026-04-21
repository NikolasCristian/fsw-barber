import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar"
import { Badge } from "../_components/ui/badge"
import { Card, CardContent } from "../_components/ui/card"

const BookingItem = () => {
  return (
    <>
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
                  src="/AvatarBaarber.png"
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
    </>
  )
}

export default BookingItem
