export function Footer() {
  return (
    <footer className="border-t py-6 px-8">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © 2024 EstimateHub. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
} 