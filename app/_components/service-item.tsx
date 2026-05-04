"use client"

import { BarberShop, BarberShopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import { format, isBefore, set, startOfDay } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { signIn, useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { getBookings } from "../_actions/get-bookings"
import { Booking } from "@prisma/client"

interface ServiceItemProps {
  service: BarberShopService
  barbershop: Pick<BarberShop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const hasBookingOnCurrentTime = bookings.some((booking) => {
      const date = new Date(booking.date)

      return date.getHours() === hour && date.getMinutes() === minutes
    })

    return !hasBookingOnCurrentTime
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    undefined,
  )

  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!selectedDay) return

    const fetchBookings = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }

    fetchBookings()
  }, [selectedDay, service.id])

  const handlLoginWithGoogleClick = () => signIn("google")

  const disabledDays = (date: Date) => {
    return isBefore(date, startOfDay(new Date()))
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime((prev) => (prev === time ? undefined : time))
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      if (!data?.user?.id) {
        toast.error("Você precisa estar logado")
        return
      }

      const [hour, minute] = selectedTime.split(":").map(Number)

      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        userId: data.user.id,
        date: newDate.toISOString(),
      })

      const updatedBookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(updatedBookings)

      setSelectedTime(undefined)

      toast.success("Reserva criada com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex gap-4 p-3">
        {/* IMAGE */}
        <div className="relative h-28 w-28 min-w-28 overflow-hidden rounded-xl">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>

        {/* INFO */}
        <div className="flex w-full flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold">{service.name}</h3>

            <p className="text-muted-foreground line-clamp-2 text-sm">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="font-bold text-blue-500">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              {data?.user ? (
                <>
                  <SheetTrigger asChild>
                    <Button variant="glass" size="sm" className="px-4">
                      Reservar
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-80 overflow-x-auto bg-background px-0 [&::-webkit-scrollbar]:hidden"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-lg font-semibold">
                        Escolha a data
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 flex justify-center border-b border-solid pb-4">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={selectedDay}
                        onSelect={(date) => {
                          setSelectedDay(date)
                          setSelectedTime(undefined)
                        }}
                        disabled={disabledDays}
                        modifiersStyles={{
                          selected: {
                            backgroundColor: "#2563eb",
                            color: "white",
                            borderRadius: "9999px",
                          },
                          today: {
                            backgroundColor: "#1e1e1e",
                            fontWeight: "bold",
                            border: "2px solid gray",
                            borderRadius: "9999px",
                          },
                          disabled: {
                            opacity: 0.3,
                            cursor: "not-allowed",
                            textDecoration: "line-through",
                          },
                        }}
                        classNames={{
                          day: "rounded-full w-10 h-10 font-normal",
                          day_selected:
                            "bg-blue-600 text-white hover:bg-blue-700",
                          day_today: "font-bold border-2 border-gray-500",
                          day_disabled:
                            "opacity-30 cursor-not-allowed line-through",
                          day_button: "rounded-full",
                        }}
                        styles={{
                          day: {
                            borderRadius: "9999px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          button: {
                            borderRadius: "9999px",
                            transition: "all 0.2s",
                          },
                        }}
                      />
                    </div>

                    {selectedDay && (
                      <div className="border-b border-solid px-5 pb-4">
                        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                          {getTimeList(dayBookings).map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "secondary" : "outline"
                              }
                              className="min-w-[72px] flex-shrink-0 rounded-full"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedDay && selectedTime && (
                      <div className="p-5">
                        <Card>
                          <CardContent className="space-y-3 p-3">
                            <div className="flex items-center justify-between">
                              <h2 className="font-bold">{service.name}</h2>
                              <p className="text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(service.price))}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Data</h2>
                              <p className="text-sm">
                                {format(selectedDay, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">Horário</h2>
                              <p className="text-sm">{selectedTime}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <h2 className="text-sm text-gray-400">
                                Barbearia
                              </h2>
                              <p className="text-sm">{barbershop.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    <SheetFooter className="px-5">
                      <SheetClose asChild>
                        <Button
                          onClick={handleCreateBooking}
                          variant="secondary"
                          disabled={!selectedDay || !selectedTime}
                        >
                          Confirmar
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="glass" size="sm" className="px-4">
                      Reservar
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-black sm:max-w-sm">
                    <DialogHeader className="text-center">
                      <DialogTitle>Faça login</DialogTitle>
                      <DialogDescription>
                        Conecte-se com sua conta do Google para continuar
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="flex w-full items-center justify-center gap-2"
                        onClick={handlLoginWithGoogleClick}
                      >
                        <Image
                          src="/Google.svg"
                          width={18}
                          height={18}
                          alt="Google"
                        />
                        Entrar com Google
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
