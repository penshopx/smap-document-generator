import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function InstructorCoursesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
