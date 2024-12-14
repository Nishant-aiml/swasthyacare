import React, { useState } from 'react';
import HealthAIChat from '../components/AI/HealthAIChat';
import SymptomChecker from '../components/HealthAI/SymptomChecker';
import HealthPlanGenerator from '../components/HealthAI/HealthPlanGenerator';
import HealthRiskAssessment from '../components/HealthAI/HealthRiskAssessment';
import EmergencyAssistant from '../components/HealthAI/EmergencyAssistant';
import { MessageCircle, Stethoscope, ClipboardList, Activity, AlertCircle } from 'lucide-react';

type AITool = 'chat' | 'symptoms' | 'plan' | 'risk' | 'emergency';

export default function HealthAI() {
  const [selectedTool, setSelectedTool] = useState<AITool>('chat');

  const tools = [
    { 
      id: 'chat', 
      name: 'AI Chat', 
      description: 'Chat with our AI health assistant',
      icon: MessageCircle,
      color: 'from-emerald-400 to-teal-500',
      hoverColor: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'symptoms', 
      name: 'Symptom Checker', 
      description: 'Check your symptoms and get possible causes',
      icon: Stethoscope,
      color: 'from-blue-400 to-indigo-500',
      hoverColor: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'plan', 
      name: 'Health Plan', 
      description: 'Get a personalized health improvement plan',
      icon: ClipboardList,
      color: 'from-purple-400 to-pink-500',
      hoverColor: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'risk', 
      name: 'Risk Assessment', 
      description: 'Assess your health risks',
      icon: Activity,
      color: 'from-orange-400 to-red-500',
      hoverColor: 'from-orange-500 to-red-600'
    },
    { 
      id: 'emergency', 
      name: 'Emergency Assistant', 
      description: 'Get immediate guidance for medical emergencies',
      icon: AlertCircle,
      color: 'from-red-400 to-rose-500',
      hoverColor: 'from-red-500 to-rose-600'
    }
  ];

  const renderSelectedTool = () => {
    switch (selectedTool) {
      case 'chat':
        return <HealthAIChat />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'plan':
        return <HealthPlanGenerator />;
      case 'risk':
        return <HealthRiskAssessment />;
      case 'emergency':
        return <EmergencyAssistant />;
      default:
        return <HealthAIChat />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            AI Health Assistant
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access a suite of AI-powered health tools to help you make informed decisions about your health.
            Please note that these tools are for informational purposes only and should not replace professional medical advice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as AITool)}
              className={`relative group p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                selectedTool === tool.id
                  ? 'bg-gradient-to-br ' + tool.color + ' text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-gradient-to-br hover:' + tool.hoverColor + ' hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <tool.icon className={`h-6 w-6 ${
                  selectedTool === tool.id ? 'text-white' : 'text-gray-600 group-hover:text-white'
                }`} />
                <h3 className={`font-semibold ${
                  selectedTool === tool.id ? 'text-white' : 'text-gray-900 group-hover:text-white'
                }`}>
                  {tool.name}
                </h3>
              </div>
              <p className={`text-sm ${
                selectedTool === tool.id ? 'text-white/90' : 'text-gray-600 group-hover:text-white/90'
              }`}>
                {tool.description}
              </p>
              <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                selectedTool === tool.id
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              } pointer-events-none`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {renderSelectedTool()}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Our AI health tools use advanced models to provide health-related information.
            Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}