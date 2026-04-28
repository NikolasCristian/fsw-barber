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
            params?.title
              ? {
                  name: {
                    contains: params?.title,
                    mode: "insensitive",
                  },
                }
              : {},
            params.service
              ? {
                  services: {
                    some: {
                      name: {
                        contains: params?.service,
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : {},
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
          Resultados para &quot;{search || "todas"}&quot;
        </h2>

        {barbershops.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        ) : (
          <p className="pt-12 text-center text-sm text-gray-500">
            Nenhuma barbearia encontrada.
          </p>
        )}
      </div>
    </div>
  )
}

export default BarbershopsPage
