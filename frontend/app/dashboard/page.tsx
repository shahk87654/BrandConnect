export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-text-secondary">Here's your dashboard overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-lg border border-primary/20">
          <div className="text-4xl font-bold text-primary mb-2">$2,450</div>
          <div className="text-text-secondary">Total Balance</div>
        </div>
        <div className="glass-card p-6 rounded-lg border border-secondary/20">
          <div className="text-4xl font-bold text-secondary mb-2">12</div>
          <div className="text-text-secondary">Active Campaigns</div>
        </div>
        <div className="glass-card p-6 rounded-lg border border-accent/20">
          <div className="text-4xl font-bold text-accent mb-2">8</div>
          <div className="text-text-secondary">Pending Offers</div>
        </div>
        <div className="glass-card p-6 rounded-lg border border-success/20">
          <div className="text-4xl font-bold text-success mb-2">4.8</div>
          <div className="text-text-secondary">Average Rating</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-8 rounded-lg border border-primary/20">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium">Campaign Created</p>
              <p className="text-sm text-text-secondary">Summer Collection 2025</p>
            </div>
            <span className="text-sm text-text-secondary">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium">Offer Accepted</p>
              <p className="text-sm text-text-secondary">From @influencer_name</p>
            </div>
            <span className="text-sm text-text-secondary">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Released</p>
              <p className="text-sm text-text-secondary">$500 to creator</p>
            </div>
            <span className="text-sm text-text-secondary">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
