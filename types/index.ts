export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: number;
  roomId?: string;
  roomNumber?: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  avatar?: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  feesPaid: number;
  feesTotal: number;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: "single" | "double" | "triple" | "dormitory";
  capacity: number;
  occupied: number;
  amenities: string[];
  status: "available" | "full" | "maintenance";
  pricePerMonth: number;
  students: string[];
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  type: "rent" | "mess" | "maintenance" | "deposit";
  month: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: "maintenance" | "food" | "security" | "noise" | "cleanliness" | "other";
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "leave";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  target: "all" | "specific";
  targetIds?: string[];
  createdAt: string;
  read: boolean;
}

export interface DashboardStats {
  totalStudents: number;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalFees: number;
  collectedFees: number;
  pendingFees: number;
  openComplaints: number;
  resolvedComplaints: number;
  todayAttendance: number;
}
