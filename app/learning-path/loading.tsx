import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <Skeleton className="h-10 w-full max-w-md mb-6" />

      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 lg:w-1/4 bg-muted p-6">
                <div className="space-y-4">
                  <Skeleton className="h-40 w-full rounded-md mb-4" />
                  <div>
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-full mb-4" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 lg:w-3/4 p-6">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-9 w-24" />
                </div>
                <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          {j < 3 && <Skeleton className="w-0.5 h-12 mx-auto" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <Skeleton className="h-5 w-48 mb-1" />
                              <div className="flex items-center gap-4 mt-1">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                            </div>
                            <Skeleton className="h-9 w-24 mt-2 md:mt-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
