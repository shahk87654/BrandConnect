import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-dark">
      {/* Sidebar - TODO: Create Sidebar component */}
      <aside className="w-64 bg-dark-lighter border-r border-border p-6 hidden lg:block">
        <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          BrandConnect
        </div>
        <nav className="space-y-4">
          {/* Navigation items will go here */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header - TODO: Create Header component */}
        <header className="bg-dark-lighter border-b border-border p-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* User menu will go here */}
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
