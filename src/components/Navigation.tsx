import { NavLink } from 'react-router-dom';
import { Home, FileCheck, CheckCircle2 } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/approval', icon: FileCheck, label: 'Approval' },
    { to: '/contents', icon: CheckCircle2, label: 'Contents' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:top-0 md:bottom-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActive
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
