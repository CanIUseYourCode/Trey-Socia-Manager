import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, FileText, Clock, MoreHorizontal, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Posts",
    value: "2,345",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Followers",
    value: "45.2k",
    change: "+850",
    trend: "up",
    icon: Users,
  },
  {
    title: "Pending Approval",
    value: "12",
    change: "-4",
    trend: "down",
    icon: Clock,
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Product Launch Teaser",
    channel: "Instagram",
    status: "Scheduled",
    date: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    id: 2,
    title: "Weekly Newsletter",
    channel: "LinkedIn",
    status: "Published",
    date: "Today, 9:00 AM",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
  },
  {
    id: 3,
    title: "Customer Spotlight",
    channel: "Twitter",
    status: "Draft",
    date: "Oct 24, 2:30 PM",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
  },
];

const Index = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 border-primary/20 hover:bg-primary/5">
            Download Report
          </Button>
          <Button className="h-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-none overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-green-500" />
                )}
                <span className="text-green-500 font-medium">{stat.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Recent Posts</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="glass-card border border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading font-semibold truncate">{post.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${post.status === "Published" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                          post.status === "Scheduled" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                            "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}>
                        {post.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                        {post.channel}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Area - Upcoming Schedule or Notifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-semibold">Team Members</h2>
          <Card className="glass-card border-none">
            <CardContent className="p-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">Sarah Designer</p>
                    <p className="text-xs text-muted-foreground truncate">Product Lead</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed border-primary/30 text-primary hover:bg-primary/5">
                <Plus className="w-4 h-4 mr-2" /> Add Member
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-gradient-primary relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
              <TrendingUp className="w-32 h-32" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-2 relative z-10">Pro Plan</h3>
            <p className="text-white/80 text-sm mb-4 relative z-10">
              Upgrade to unlock advanced analytics and unlimited scheduled posts.
            </p>
            <Button variant="secondary" className="w-full bg-white text-primary border-none hover:bg-white/90 relative z-10 shadow-lg">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
