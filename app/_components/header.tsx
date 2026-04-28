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
            height={18}
            width={120}
          />
        </Link>

        <SideBarButton />
      </CardContent>
    </Card>
  )
}

export default Header
