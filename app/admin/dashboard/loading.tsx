import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardLoading() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-3 bg-muted rounded animate-pulse mt-2 w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Data...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
