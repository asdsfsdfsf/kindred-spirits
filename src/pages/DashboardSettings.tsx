import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Shield,
  Palette,
  Globe,
  Trash2,
  Clock,
} from "lucide-react";

const timezones = [
  { value: "UTC-12", label: "UTC-12:00 (Baker Island)" },
  { value: "UTC-8", label: "UTC-08:00 (Pacific Time)" },
  { value: "UTC-7", label: "UTC-07:00 (Mountain Time)" },
  { value: "UTC-6", label: "UTC-06:00 (Central Time)" },
  { value: "UTC-5", label: "UTC-05:00 (Eastern Time)" },
  { value: "UTC+0", label: "UTC+00:00 (London)" },
  { value: "UTC+1", label: "UTC+01:00 (Paris, Berlin)" },
  { value: "UTC+2", label: "UTC+02:00 (Cairo, Athens)" },
  { value: "UTC+3", label: "UTC+03:00 (Moscow)" },
  { value: "UTC+5:30", label: "UTC+05:30 (Mumbai)" },
  { value: "UTC+8", label: "UTC+08:00 (Singapore, Beijing)" },
  { value: "UTC+9", label: "UTC+09:00 (Tokyo)" },
  { value: "UTC+10", label: "UTC+10:00 (Sydney)" },
];

const DashboardSettings = () => {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Profile Section */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="hero">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>Customize your interface</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme across the app</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Timezone Section */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Timezone</CardTitle>
                <CardDescription>Set your preferred timezone</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Select defaultValue="UTC-8">
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Switch disabled />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-card border-destructive/50 mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <div>
                <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
