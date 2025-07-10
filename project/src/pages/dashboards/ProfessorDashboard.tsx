import React, { useState } from 'react';
import { Calendar, Users, MapPin, Clock, BookOpen, Plus } from 'lucide-react';
import { mockSchedules, mockClassrooms } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Common/Card';
import StatusBadge from '../../components/Common/StatusBadge';

const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const mySchedules = mockSchedules.filter(schedule => schedule.professorId === user?.id);
  const todaySchedules = mySchedules.filter(schedule => schedule.date === selectedDate);

  const stats = [
    {
      name: 'Today\'s Classes',
      value: todaySchedules.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Students',
      value: mySchedules.reduce((sum, schedule) => sum + schedule.enrolledStudents, 0),
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Rooms Assigned',
      value: new Set(mySchedules.map(s => s.roomId)).size,
      icon: MapPin,
      color: 'bg-purple-500'
    },
    {
      name: 'This Week',
      value: mySchedules.length,
      icon: Calendar,
      color: 'bg-yellow-500'
    }
  ];

  const updateOccupancy = (roomId: string, newOccupancy: number) => {
    // In a real app, this would make an API call
    console.log(`Updating room ${roomId} occupancy to ${newOccupancy}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}! Manage your classes and room assignments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-4">
            {todaySchedules.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No classes scheduled for this date</p>
            ) : (
              todaySchedules.map((schedule) => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{schedule.className}</h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{schedule.roomName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {schedule.enrolledStudents}/{schedule.maxCapacity}
                        </span>
                      </div>
                    </div>
                    <StatusBadge 
                      status={schedule.enrolledStudents === schedule.maxCapacity ? 'full' : 'available'} 
                      size="sm" 
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Room Occupancy Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Room Occupancy Control</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Update</span>
            </button>
          </div>

          <div className="space-y-4">
            {mySchedules.map((schedule) => {
              const room = mockClassrooms.find(r => r.id === schedule.roomId);
              if (!room) return null;

              const occupancyPercentage = Math.round((room.currentOccupancy / room.capacity) * 100);

              return (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <p className="text-sm text-gray-600">{schedule.className}</p>
                    </div>
                    <StatusBadge status={room.status} size="sm" />
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">Current Occupancy</span>
                      <span className="text-sm text-gray-900">
                        {room.currentOccupancy}/{room.capacity} ({occupancyPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          occupancyPercentage < 50 ? 'bg-green-500' :
                          occupancyPercentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${occupancyPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateOccupancy(room.id, Math.max(0, room.currentOccupancy - 1))}
                      className="flex-1 bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => updateOccupancy(room.id, Math.min(room.capacity, room.currentOccupancy + 1))}
                      className="flex-1 bg-green-100 text-green-600 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors duration-200"
                    >
                      +1
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Schedule Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mySchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {schedule.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.roomName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.startTime} - {schedule.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.enrolledStudents}/{schedule.maxCapacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={schedule.enrolledStudents === schedule.maxCapacity ? 'full' : 'available'} 
                      size="sm" 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProfessorDashboard;