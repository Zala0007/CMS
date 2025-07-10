import { User, Classroom, ClassSchedule, Notification, Student } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Prof. A B Patel',
    email: 'abpatel@campus.edu',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    name: 'Prof. Vishvarsjinh Zala',
    email: 'vzala@campus.edu',
    role: 'professor',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    name: 'Minaxi Dave',
    email: 'mdave@student.campus.edu',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export const mockClassrooms: Classroom[] = [
  {
    id: '1',
    name: 'Room 1001',
    building: 'Annexe Building',
    capacity: 50,
    currentOccupancy: 42,
    equipment: ['Projector', 'Whiteboard', 'Audio System'],
    status: 'occupied'
  },
  {
    id: '2',
    name: 'Room 2005',
    building: 'Engineering Building',
    capacity: 35,
    currentOccupancy: 0,
    equipment: ['Interactive Board', 'Computers', 'Projector'],
    status: 'available'
  },
  {
    id: '3',
    name: 'Room 3001',
    building: 'Liberal Arts Building',
    capacity: 75,
    currentOccupancy: 75,
    equipment: ['Projector', 'Audio System', 'Microphone'],
    status: 'occupied'
  },
  {
    id: '4',
    name: 'Lab 1002',
    building: 'Science Building',
    capacity: 25,
    currentOccupancy: 0,
    equipment: ['Lab Equipment', 'Computers', 'Projector'],
    status: 'maintenance'
  }
];

export const mockSchedules: ClassSchedule[] = [
  {
    id: '1',
    className: 'Advanced Mathematics',
    professorId: '2',
    professorName: 'Prof. A B Patel',
    roomId: '1',
    roomName: 'Room 1001',
    startTime: '09:00',
    endTime: '10:30',
    date: '2025-01-15',
    enrolledStudents: 42,
    maxCapacity: 50
  },
  {
    id: '2',
    className: 'Computer Science Fundamentals',
    professorId: '2',
    professorName: 'Prof. Ketan Joshi',
    roomId: '2',
    roomName: 'Room 2005',
    startTime: '11:00',
    endTime: '12:30',
    date: '2025-01-15',
    enrolledStudents: 28,
    maxCapacity: 35
  },
  {
    id: '3',
    className: 'English Literature',
    professorId: '1',
    professorName: 'Dr. K Jani',
    roomId: '3',
    roomName: 'Room 3001',
    startTime: '14:00',
    endTime: '15:30',
    date: '2025-01-15',
    enrolledStudents: 75,
    maxCapacity: 75
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Room Change Alert',
    message: 'Computer Science Fundamentals class moved from Room 2005 to Room 2007',
    type: 'warning',
    timestamp: '2025-01-15T08:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'Maintenance Scheduled',
    message: 'Lab 1002 will be under maintenance from 2:00 PM to 4:00 PM today',
    type: 'info',
    timestamp: '2025-01-15T07:00:00Z',
    isRead: false
  },
  {
    id: '3',
    title: 'Class Cancelled',
    message: 'Physics Lab session scheduled for 3:00 PM has been cancelled',
    type: 'error',
    timestamp: '2025-01-15T10:15:00Z',
    isRead: true
  }
];

export const mockStudents: Student[] = [
  {
    id: '3',
    name: 'Minaxi Dave',
    email: 'mdave@student.campus.edu',
    enrolledClasses: ['1', '2']
  }
];