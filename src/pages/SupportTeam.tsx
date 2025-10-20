import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Plug, Clock, Users, CheckCircle } from "lucide-react";

export default function SupportTeam() {
  const stats = [
    {
      label: "Active Tickets",
      value: "24",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      label: "Avg Response Time",
      value: "12 min",
      icon: Clock,
      color: "text-emerald-600",
    },
    {
      label: "Team Members",
      value: "8",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Resolved Today",
      value: "45",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  const supportFeatures = [
    {
      title: "Live Chat",
      description: "Connect with customers in real-time through our integrated chat system",
      icon: MessageSquare,
      buttonText: "Open Chat Dashboard",
      color: "bg-blue-500/10 text-blue-700",
    },
    {
      title: "FAQ",
      description: "Manage frequently asked questions and self-service resources",
      icon: HelpCircle,
      buttonText: "Manage FAQs",
      color: "bg-emerald-500/10 text-emerald-700",
    },
    {
      title: "Integrations",
      description: "Connect with third-party tools and platforms for seamless support",
      icon: Plug,
      buttonText: "View Integrations",
      color: "bg-purple-500/10 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help with your orders, account, and more</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Features */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {supportFeatures.map((feature) => (
          <Card key={feature.title} className="overflow-hidden">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">{feature.buttonText}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Support Activity</CardTitle>
          <CardDescription>Latest tickets and customer interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                customer: "Ahmed Al-Mansouri",
                issue: "Order delivery status inquiry",
                time: "5 minutes ago",
                status: "In Progress",
              },
              {
                customer: "Fatima Al-Zahra",
                issue: "Payment method update request",
                time: "15 minutes ago",
                status: "Resolved",
              },
              {
                customer: "Omar Hassan",
                issue: "Product quality concern",
                time: "1 hour ago",
                status: "In Progress",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{activity.customer}</p>
                  <p className="text-sm text-muted-foreground">{activity.issue}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div>
                  {activity.status === "Resolved" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700">
                      Resolved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
