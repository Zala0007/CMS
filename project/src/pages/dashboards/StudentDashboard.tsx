import React, { useState } from 'react';
import { BookOpen, Calendar, MapPin, Users, Clock, Bell } from 'lucide-react';
import { mockSchedules, mockClassrooms, mockStudents } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Common/Card';
import StatusBadge from '../../components/Common/StatusBadge';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const student = mockStudents.find(s => s.id === user?.id);
  const mySchedules = mockSchedules.filter(schedule => 
    student?.enrolledClasses.includes(schedule.id)
  );
  const todaySchedules = mySchedules.filter(schedule => schedule.date === selectedDate);

  const stats = [
    {
      name: 'Enrolled Classes',
      value: student?.enrolledClasses.length || 0,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Today\'s Classes',
      value: todaySchedules.length,
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      name: 'Active Rooms',
      value: new Set(mySchedules.map(s => s.roomId)).size,
      icon: MapPin,
      color: 'bg-purple-500'
    },
    {
      name: 'This Week',
      value: mySchedules.length,
      icon: Clock,
      color: 'bg-yellow-500'
    }
  ];

  const getNextClass = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return todaySchedules.find(schedule => {
      const [hours, minutes] = schedule.startTime.split(':');
      const scheduleTime = parseInt(hours) * 60 + parseInt(minutes);
      return scheduleTime > currentTime;
    });
  };

  const nextClass = getNextClass();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
        <p className="text-gray-600">Welcome back, {user?.name}! Here's your class schedule and room information.</p>
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
        {/* Next Class */}
        {nextClass && (
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Next Class</h3>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-blue-900 mb-2">{nextClass.className}</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    {nextClass.startTime} - {nextClass.endTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">{nextClass.roomName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Prof. {nextClass.professorName}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

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
                          {schedule.professorName}
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
      </div>

      {/* Room Occupancy for My Classes */}
      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">My Classroom Occupancy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="text-sm text-gray-600">
                  <p>Building: {room.building}</p>
                  <p>Equipment: {room.equipment.join(', ')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* All Enrolled Classes */}
      <Card className="p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">All Enrolled Classes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
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
                    {schedule.professorName}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;