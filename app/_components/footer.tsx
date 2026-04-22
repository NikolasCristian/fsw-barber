import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="flex items-center justify-between px-6 py-5">
          <p className="text-sm text-gray-400">
            ©2026 Copyright<span className="font-bold"> FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
