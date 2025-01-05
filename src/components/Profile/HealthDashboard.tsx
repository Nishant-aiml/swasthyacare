import React, { useState, useEffect } from 'react';
import { Activity, Heart, Scale, Brain, TrendingUp } from 'lucide-react';
import { Card } from "@/components/ui/Card"

interface HealthMetrics {
  bmi: number;
  activityScore: number;
  heartHealth: number;
  sleepQuality: number;
  chronicRiskScore: number;
}

interface HealthInsight {
  metric: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
}

export default function HealthDashboard() {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    bmi: 23.5,
    activityScore: 75,
    heartHealth: 85,
    sleepQuality: 70,
    chronicRiskScore: 15,
  });

  const [insights, setInsights] = useState<HealthInsight[]>([
    {
      metric: 'Activity',
      recommendation: 'Try to increase daily steps by 2000 to reach the optimal range',
      priority: 'medium',
    },
    {
      metric: 'Sleep',
      recommendation: 'Your sleep pattern shows irregularity. Consider maintaining a consistent sleep schedule',
      priority: 'high',
    },
  ]);

  // Simulated AI analysis - In production, this would call your AI service
  useEffect(() => {
    // Simulate API call for personalized insights
    const analyzeHealthData = async () => {
      // This would be replaced with actual AI analysis
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    analyzeHealthData();
  }, []);

  const getMetricColor = (value: number, type: string) => {
    if (type === 'risk') {
      return value <= 20 ? 'text-green-500' : value <= 50 ? 'text-yellow-500' : 'text-red-500';
    }
    return value >= 80 ? 'text-green-500' : value >= 60 ? 'text-yellow-500' : 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">BMI</p>
              <p className={`text-xl font-semibold ${getMetricColor(metrics.bmi, 'normal')}`}>
                {metrics.bmi}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Activity Score</p>
              <p className={`text-xl font-semibold ${getMetricColor(metrics.activityScore, 'normal')}`}>
                {metrics.activityScore}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Heart Health</p>
              <p className={`text-xl font-semibold ${getMetricColor(metrics.heartHealth, 'normal')}`}>
                {metrics.heartHealth}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-4">AI Health Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                insight.priority === 'high'
                  ? 'border-red-200 bg-red-50'
                  : insight.priority === 'medium'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{insight.metric}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    insight.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : insight.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                </span>
              </div>
              <p className="mt-2 text-gray-600">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

