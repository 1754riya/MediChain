"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Copy, Plus } from 'lucide-react'

interface TimeSlot {
  start: string
  end: string
}

interface DaySchedule {
  enabled: boolean
  timeSlots: TimeSlot[]
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function AvailabilityScheduler() {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: {
        enabled: day !== "Saturday" && day !== "Sunday",
        timeSlots: [{ start: "09:00", end: "17:00" }],
      },
    }), {})
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Set your availability</h2>
        <p className="text-gray-600">
          Define ranges of time when you are available. You can customise all of this later in the availability page.
        </p>
        <div className="flex items-center gap-4 mt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded ${i === 3 ? "bg-blue-600" : "bg-gray-200"}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">Step 4 of 5</p>
      </div>

      <Card className="bg-white border border-gray-200">
        <div className="p-6 space-y-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-0"
            >
              <div className="w-32 flex items-center gap-2">
                <Switch
                  checked={schedule[day].enabled}
                  onCheckedChange={(checked) =>
                    setSchedule((prev) => ({
                      ...prev,
                      [day]: { ...prev[day], enabled: checked },
                    }))
                  }
                />
                <span className="text-gray-700">{day}</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Select
                  disabled={!schedule[day].enabled}
                  value={schedule[day].timeSlots[0].start}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${String(i).padStart(2, "0")}:00`}
                      >
                        {`${String(i).padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-500">-</span>
                <Select
                  disabled={!schedule[day].enabled}
                  value={schedule[day].timeSlots[0].end}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${String(i).padStart(2, "0")}:00`}
                      >
                        {`${String(i).padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!schedule[day].enabled}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!schedule[day].enabled}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full" size="lg">
        Next Step
      </Button>
    </div>
  )
}

