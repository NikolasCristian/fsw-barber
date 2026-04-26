import { db } from "@/app/_lib/prisma"
import { Button } from "../../_components/ui/button"
import Image from "next/image"
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ServiceItem from "@/app/_components/service-item"
import PhoneItems from "@/app/_components/phone-item"
import SideBarButton from "@/app/_components/sidebar"

interface BarbershopPageProps {
  params: Promise<{
    id: string
  }>
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barberShop.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-65 w-full">
        <Image
          src={barbershop?.imageUrl || ""}
          alt={barbershop?.name || "Barbershop Image"}
          fill
          className="object-cover"
          priority
        />

        {/* Botão voltar */}
        <Button
          asChild
          size="icon"
          variant="premium"
          className="absolute top-4 left-4 z-10"
        >
          <Link href="/">
            <ChevronLeftIcon size={16} />
          </Link>
        </Button>

        {/* Botão menu */}
        <div className="absolute top-4 right-4 z-10">
          <SideBarButton />
        </div>
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

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">SERVIÇOS</h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phone.map((phone) => (
          <PhoneItems key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
