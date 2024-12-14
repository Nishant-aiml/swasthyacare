import React, { useState } from 'react';
import NotificationCenter from '../components/Notifications/NotificationCenter';
import HealthRecordsVault from '../components/Profile/HealthRecordsVault';
import MembershipPlans from '../components/Profile/MembershipPlans';
import FamilyAccount from '../components/Profile/FamilyAccount';
import HealthHistoryAnalysis from '../components/Profile/HealthHistoryAnalysis';
import ProfileIDs from '../components/Profile/ProfileIDs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { FileText, Crown, Users, Activity, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('ids');
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your health records, family accounts, and subscription plans
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationCenter />
        </div>
      </div>

      <div data-tabs-value={activeTab}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center space-x-2 mb-8">
            <TabsTrigger
              value="ids"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'ids'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Health IDs</span>
            </TabsTrigger>

            <TabsTrigger
              value="records"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'records'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Health Records</span>
            </TabsTrigger>

            <TabsTrigger
              value="membership"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'membership'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Crown className="h-4 w-4" />
              <span>Membership</span>
            </TabsTrigger>

            <TabsTrigger
              value="family"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'family'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Family Account</span>
            </TabsTrigger>

            <TabsTrigger
              value="history"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Health History</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="ids">
              <ProfileIDs />
            </TabsContent>

            <TabsContent value="records">
              <HealthRecordsVault />
            </TabsContent>

            <TabsContent value="membership">
              <MembershipPlans />
            </TabsContent>

            <TabsContent value="family">
              <FamilyAccount />
            </TabsContent>

            <TabsContent value="history">
              <HealthHistoryAnalysis />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Contact Support
          </button>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-medium text-green-900 mb-2">Privacy Settings</h3>
          <p className="text-sm text-green-700">
            Review and update your privacy preferences and data sharing settings.
          </p>
          <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Manage Settings
          </button>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-medium text-purple-900 mb-2">Account Security</h3>
          <p className="text-sm text-purple-700">
            Enable two-factor authentication and manage your security preferences.
          </p>
          <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Security Settings
          </button>
        </div>
      </div>
    </div>
  );
}