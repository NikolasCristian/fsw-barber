import Header from "../_components/header"
import Search from "../_components/search"

import BarbershopItem from "../_components/ui/barbershop-item"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const params = await searchParams

  const search = params?.title || params?.service

  const barbershops = await db.barberShop.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              services: {
                some: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {},
  })

  return (
    <div className="pb-5">
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{params?.title || params?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
