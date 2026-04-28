import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import BarberShopItem from "./_components/ui/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BookingItem from "./_constants/bookingtem"
import Search from "./_components/search"

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

        <div className="pt-4">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} variant="ghost" className="gap-2">
              <Image
                src={option.imageUrl}
                alt={option.title}
                height={16}
                width={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="h-45 relative mt-6 w-full overflow-hidden rounded-2xl">
          <Image
            src="/Banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
