import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

interface TabContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabContext = React.createContext<TabContextValue | undefined>(undefined);

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <TabContext.Provider value={{ value, onValueChange }}>
      <div className="w-full" data-tabs-value={value}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '', onClick }: TabsTriggerProps) {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    context.onValueChange(value);
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      role="tab"
      aria-selected={context.value === value}
      data-state={context.value === value ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }

  if (context.value !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      data-state={context.value === value ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
} 