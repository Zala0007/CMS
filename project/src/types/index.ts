export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professor' | 'student';
  avatar?: string;
}

export interface Classroom {
  id: string;
  name: string;
  building: string;
  capacity: number;
  currentOccupancy: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

export interface ClassSchedule {
  id: string;
  className: string;
  professorId: string;
  professorName: string;
  roomId: string;
  roomName: string;
  startTime: string;
  endTime: string;
  date: string;
  enrolledStudents: number;
  maxCapacity: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  isRead: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledClasses: string[];
}