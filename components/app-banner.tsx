import { Button } from "@/components/ui/button"

export function AppBanner() {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-brand-blue">
      <div className="relative flex items-center justify-between p-6">
        <div className="z-10">
          <h2 className="text-2xl font-bold text-white">Download and Get App</h2>
          <p className="mt-1 text-blue-100">For an even better LiveScores experience on your mobile device.</p>
          <Button className="mt-4 bg-white text-brand-blue hover:bg-blue-50">Sign In</Button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/placeholder.svg?height=300&width=500&text=Players')] bg-cover bg-right-top bg-no-repeat opacity-30 md:opacity-80"></div>
      </div>
    </div>
  )
}
