import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
  sidebarProps?: any;
  headerProps?: any;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Association Platform',
  showSidebar = true,
  showHeader = true,
  showFooter = true,
  className = '',
  sidebarProps = {},
  headerProps = {},
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {showHeader && <Header title={title} {...headerProps} />}
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar {...sidebarProps} />
        )}
        
        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''} ${showHeader ? 'pt-16' : ''}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
