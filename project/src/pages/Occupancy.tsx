import React, { useState, useEffect } from 'react';
import { MapPin, Users, AlertTriangle, Clock } from 'lucide-react';
import { mockClassrooms } from '../data/mockData';
import { Classroom } from '../types';
import Card from '../components/Common/Card';
import StatusBadge from '../components/Common/StatusBadge';

const Occupancy: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>(mockClassrooms);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');

  const buildings = ['all', ...new Set(classrooms.map(room => room.building))];

  const filteredClassrooms = selectedBuilding === 'all' 
    ? classrooms 
    : classrooms.filter(room => room.building === selectedBuilding);

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const getOccupancyStatus = (current: number, capacity: number) => {
    const percentage = getOccupancyPercentage(current, capacity);
    if (percentage === 0) return 'available';
    if (percentage === 100) return 'full';
    return 'occupied';
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setClassrooms(prev => prev.map(room => {
        if (room.status === 'maintenance') return room;
        
        const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
        const newOccupancy = Math.max(0, Math.min(room.capacity, room.currentOccupancy + change));
        
        return {
          ...room,
          currentOccupancy: newOccupancy,
          status: newOccupancy === 0 ? 'available' : 'occupied'
        };
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Classroom Occupancy</h1>
        <p className="text-gray-600">Real-time monitoring of classroom usage across campus</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{classrooms.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {classrooms.filter(room => room.status === 'available').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">
                {classrooms.filter(room => room.status === 'occupied').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {classrooms.filter(room => room.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Building
        </label>
        <select
          id="building"
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          className="block w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {buildings.map(building => (
            <option key={building} value={building}>
              {building === 'all' ? 'All Buildings' : building}
            </option>
          ))}
        </select>
      </div>

      {/* Classroom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => {
          const occupancyPercentage = getOccupancyPercentage(classroom.currentOccupancy, classroom.capacity);
          const status = getOccupancyStatus(classroom.currentOccupancy, classroom.capacity);

          return (
            <Card key={classroom.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                  <p className="text-sm text-gray-500">{classroom.building}</p>
                </div>
                <StatusBadge status={classroom.status === 'maintenance' ? 'maintenance' : status} />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Occupancy</span>
                  <span className="text-sm text-gray-900">
                    {classroom.currentOccupancy}/{classroom.capacity} ({occupancyPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      occupancyPercentage === 0 ? 'bg-green-500' :
                      occupancyPercentage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${occupancyPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Capacity: {classroom.capacity}</span>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <div>
                    <p>Equipment:</p>
                    <p className="text-xs">{classroom.equipment.join(', ')}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredClassrooms.length === 0 && (
        <Card className="p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No classrooms found for the selected building.</p>
        </Card>
      )}
    </div>
  );
};

export default Occupancy;