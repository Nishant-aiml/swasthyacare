import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { BellIcon, BellRingIcon } from 'lucide-react';

interface ReminderSystemProps {
  onUpdatePreferences?: (preferences: {
    email: boolean;
    sms: boolean;
    timeBeforeAppointment: string;
  }) => void;
}

export function ReminderSystem({ onUpdatePreferences }: ReminderSystemProps) {
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [smsEnabled, setSmsEnabled] = React.useState(false);
  const [timeBeforeAppointment, setTimeBeforeAppointment] = React.useState('24h');

  const handlePreferenceChange = () => {
    if (onUpdatePreferences) {
      onUpdatePreferences({
        email: emailEnabled,
        sms: smsEnabled,
        timeBeforeAppointment,
      });
    }
  };

  React.useEffect(() => {
    handlePreferenceChange();
  }, [emailEnabled, smsEnabled, timeBeforeAppointment]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRingIcon className="h-5 w-5" />
            Reminder Preferences
          </CardTitle>
          <CardDescription>
            Customize how and when you receive appointment reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-gray-500">
                Receive reminders via email
              </div>
            </div>
            <Switch
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">SMS Notifications</div>
              <div className="text-sm text-gray-500">
                Receive reminders via text message
              </div>
            </div>
            <Switch
              checked={smsEnabled}
              onCheckedChange={setSmsEnabled}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Reminder Time</label>
            <Select
              value={timeBeforeAppointment}
              onValueChange={setTimeBeforeAppointment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select when to receive reminders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 hour before</SelectItem>
                <SelectItem value="3h">3 hours before</SelectItem>
                <SelectItem value="12h">12 hours before</SelectItem>
                <SelectItem value="24h">24 hours before</SelectItem>
                <SelectItem value="48h">48 hours before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            Active Reminders
          </CardTitle>
          <CardDescription>
            Your upcoming appointment reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            No active reminders at the moment
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

