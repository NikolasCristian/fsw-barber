import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SideBarButton from "./sidebar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo da barbearia"
            width={120}
            height={40}
            className="h-6 w-auto object-contain"
          />
        </Link>

        <SideBarButton />
      </CardContent>
    </Card>
  )
}

export default Header
