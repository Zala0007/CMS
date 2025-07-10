import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  GraduationCap, 
  Bell, 
  User, 
  LogOut, 
  Home,
  Users,
  Calendar,
  MapPin,
  MessageSquare,
  Phone
} from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    const commonItems = [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Occupancy', path: '/occupancy', icon: MapPin },
      { name: 'Notifications', path: '/notifications', icon: Bell },
      { name: 'Contact', path: '/contact', icon: Phone }
    ];

    if (!isAuthenticated) return commonItems;

    const roleBasedItems = {
      admin: [
        { name: 'Dashboard', path: '/admin', icon: Users },
        { name: 'Schedules', path: '/admin/schedules', icon: Calendar }
      ],
      professor: [
        { name: 'Dashboard', path: '/professor', icon: User },
        { name: 'My Classes', path: '/professor/classes', icon: Calendar }
      ],
      student: [
        { name: 'Portal', path: '/student', icon: User },
        { name: 'My Classes', path: '/student/classes', icon: Calendar }
      ]
    };

    return [
      ...commonItems,
      ...(roleBasedItems[user?.role as keyof typeof roleBasedItems] || [])
    ];
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Campus Management System</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                    alt={user?.name}
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {getNavItems().map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;