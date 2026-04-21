import { db } from "@/app/_lib/prisma"
import { Button } from "../../_components/ui/button"
import Image from "next/image"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: Promise<{
    id: string
  }>
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params

  const barbershop = await db.barberShop.findUnique({
    where: { id },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-62.5 w-full">
        <Image
          src={barbershop?.imageUrl || ""}
          alt={barbershop?.name || "Barbershop Image"}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="premium"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon size={16} />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="premium"
          className="absolute top-4 right-4"
        >
          <MenuIcon size={16} />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-6 text-xl font-bold">{barbershop?.name}</h1>

        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-blue-600" size={16} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon fill="currentColor" className="text-blue-600" size={16} />
          <p className="text-sm">5,0 (100 avaliações)</p>
        </div>
      </div>

      <div className="border-b border-solid p-5">
        <h2 className="mb-2 text-xs font-bold text-gray-400 uppercase">
          SOBRE NÓS
        </h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
