"use client"

import { toast } from "sonner"
import { Button } from "./ui/button"
import { SmartphoneIcon } from "lucide-react"

interface PhoneItemsPropos {
  phone: string
}
const PhoneItems = ({ phone }: PhoneItemsPropos) => {
  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>

      <Button variant="premium" size="sm" onClick={() => copyPhone(phone)}>
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItems
