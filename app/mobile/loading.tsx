import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MobileLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6 mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
          <Skeleton className="h-5 w-64" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Skeleton className="w-64 h-[500px] rounded-3xl" />
        </div>
      </div>

      <div className="my-16">
        <Skeleton className="h-10 w-64 mx-auto mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-6 w-6 rounded-full mt-1" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="my-16">
        <Skeleton className="h-10 w-64 mx-auto mb-6" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />

        <Skeleton className="h-10 w-80 mx-auto mb-8" />
        <div className="flex justify-center">
          <Skeleton className="w-64 h-[500px] rounded-3xl" />
        </div>
      </div>

      <div className="my-16">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <Skeleton className="h-5 w-96 mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>

      <div className="my-16">
        <Skeleton className="h-10 w-64 mx-auto mb-12" />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
