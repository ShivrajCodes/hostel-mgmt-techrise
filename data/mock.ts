import { Student, Room, Fee, Complaint, Attendance, Notification } from "@/types";

export const mockStudents: Student[] = [
  { id: "S001", name: "Arjun Sharma", email: "arjun@example.com", phone: "9876543210", course: "B.Tech CSE", year: 2, roomId: "R101", roomNumber: "101", joinDate: "2024-07-01", status: "active", guardianName: "Rajesh Sharma", guardianPhone: "9876543200", address: "Delhi, India", feesPaid: 24000, feesTotal: 36000, avatar: "" },
  { id: "S002", name: "Priya Patel", email: "priya@example.com", phone: "9876543211", course: "B.Tech ECE", year: 3, roomId: "R102", roomNumber: "102", joinDate: "2023-07-01", status: "active", guardianName: "Suresh Patel", guardianPhone: "9876543201", address: "Gujarat, India", feesPaid: 36000, feesTotal: 36000, avatar: "" },
  { id: "S003", name: "Rahul Verma", email: "rahul@example.com", phone: "9876543212", course: "MCA", year: 1, roomId: "R103", roomNumber: "103", joinDate: "2024-07-15", status: "active", guardianName: "Mohan Verma", guardianPhone: "9876543202", address: "UP, India", feesPaid: 12000, feesTotal: 36000, avatar: "" },
  { id: "S004", name: "Sneha Roy", email: "sneha@example.com", phone: "9876543213", course: "B.Sc Physics", year: 2, roomId: "R104", roomNumber: "104", joinDate: "2023-07-01", status: "active", guardianName: "Bimal Roy", guardianPhone: "9876543203", address: "Kolkata, India", feesPaid: 36000, feesTotal: 36000, avatar: "" },
  { id: "S005", name: "Amit Singh", email: "amit@example.com", phone: "9876543214", course: "B.Tech ME", year: 4, roomId: "R105", roomNumber: "105", joinDate: "2022-07-01", status: "active", guardianName: "Harish Singh", guardianPhone: "9876543204", address: "Haryana, India", feesPaid: 30000, feesTotal: 36000, avatar: "" },
  { id: "S006", name: "Kavya Nair", email: "kavya@example.com", phone: "9876543215", course: "MBA", year: 1, roomId: "R106", roomNumber: "106", joinDate: "2024-07-20", status: "pending", guardianName: "Rajan Nair", guardianPhone: "9876543205", address: "Kerala, India", feesPaid: 0, feesTotal: 36000, avatar: "" },
  { id: "S007", name: "Rohan Gupta", email: "rohan@example.com", phone: "9876543216", course: "B.Tech CSE", year: 3, roomId: "R101", roomNumber: "101", joinDate: "2023-07-01", status: "active", guardianName: "Vinod Gupta", guardianPhone: "9876543206", address: "Rajasthan, India", feesPaid: 18000, feesTotal: 36000, avatar: "" },
  { id: "S008", name: "Ananya Das", email: "ananya@example.com", phone: "9876543217", course: "B.Sc Chemistry", year: 2, roomId: "R107", roomNumber: "107", joinDate: "2023-07-01", status: "inactive", guardianName: "Tapan Das", guardianPhone: "9876543207", address: "Assam, India", feesPaid: 36000, feesTotal: 36000, avatar: "" },
];

export const mockRooms: Room[] = [
  { id: "R101", number: "101", floor: 1, type: "double", capacity: 2, occupied: 2, amenities: ["WiFi", "AC", "Attached Bathroom"], status: "full", pricePerMonth: 3000, students: ["S001", "S007"] },
  { id: "R102", number: "102", floor: 1, type: "single", capacity: 1, occupied: 1, amenities: ["WiFi", "Fan", "Common Bathroom"], status: "full", pricePerMonth: 2500, students: ["S002"] },
  { id: "R103", number: "103", floor: 1, type: "triple", capacity: 3, occupied: 1, amenities: ["WiFi", "Fan", "Common Bathroom"], status: "available", pricePerMonth: 2000, students: ["S003"] },
  { id: "R104", number: "104", floor: 1, type: "single", capacity: 1, occupied: 1, amenities: ["WiFi", "AC", "Attached Bathroom", "Balcony"], status: "full", pricePerMonth: 3500, students: ["S004"] },
  { id: "R105", number: "105", floor: 1, type: "double", capacity: 2, occupied: 1, amenities: ["WiFi", "Fan", "Common Bathroom"], status: "available", pricePerMonth: 2800, students: ["S005"] },
  { id: "R106", number: "106", floor: 2, type: "single", capacity: 1, occupied: 1, amenities: ["WiFi", "AC", "Attached Bathroom"], status: "full", pricePerMonth: 3200, students: ["S006"] },
  { id: "R107", number: "107", floor: 2, type: "double", capacity: 2, occupied: 1, amenities: ["WiFi", "Fan", "Common Bathroom"], status: "available", pricePerMonth: 2600, students: ["S008"] },
  { id: "R201", number: "201", floor: 2, type: "dormitory", capacity: 6, occupied: 0, amenities: ["WiFi", "Fan", "Common Bathroom"], status: "available", pricePerMonth: 1500, students: [] },
  { id: "R202", number: "202", floor: 2, type: "triple", capacity: 3, occupied: 0, amenities: ["WiFi", "AC", "Attached Bathroom"], status: "maintenance", pricePerMonth: 2200, students: [] },
  { id: "R203", number: "203", floor: 3, type: "single", capacity: 1, occupied: 0, amenities: ["WiFi", "AC", "Attached Bathroom", "City View"], status: "available", pricePerMonth: 4000, students: [] },
];

export const mockFees: Fee[] = [
  { id: "F001", studentId: "S001", studentName: "Arjun Sharma", roomNumber: "101", amount: 3000, dueDate: "2025-01-05", paidDate: "2025-01-03", status: "paid", type: "rent", month: "January 2025" },
  { id: "F002", studentId: "S001", studentName: "Arjun Sharma", roomNumber: "101", amount: 3000, dueDate: "2025-02-05", status: "pending", type: "rent", month: "February 2025" },
  { id: "F003", studentId: "S002", studentName: "Priya Patel", roomNumber: "102", amount: 2500, dueDate: "2025-01-05", paidDate: "2025-01-02", status: "paid", type: "rent", month: "January 2025" },
  { id: "F004", studentId: "S003", studentName: "Rahul Verma", roomNumber: "103", amount: 2000, dueDate: "2025-01-05", status: "overdue", type: "rent", month: "January 2025" },
  { id: "F005", studentId: "S004", studentName: "Sneha Roy", roomNumber: "104", amount: 3500, dueDate: "2025-01-05", paidDate: "2025-01-01", status: "paid", type: "rent", month: "January 2025" },
  { id: "F006", studentId: "S005", studentName: "Amit Singh", roomNumber: "105", amount: 2800, dueDate: "2025-01-05", status: "pending", type: "rent", month: "January 2025" },
  { id: "F007", studentId: "S001", studentName: "Arjun Sharma", roomNumber: "101", amount: 1500, dueDate: "2025-01-10", paidDate: "2025-01-08", status: "paid", type: "mess", month: "January 2025" },
  { id: "F008", studentId: "S007", studentName: "Rohan Gupta", roomNumber: "101", amount: 3000, dueDate: "2025-01-05", status: "overdue", type: "rent", month: "January 2025" },
];

export const mockComplaints: Complaint[] = [
  { id: "C001", studentId: "S001", studentName: "Arjun Sharma", roomNumber: "101", category: "maintenance", title: "Leaking tap in bathroom", description: "The tap in the bathroom has been leaking for 3 days. It's wasting water and making noise at night.", status: "in-progress", priority: "medium", createdAt: "2025-01-10T10:00:00", updatedAt: "2025-01-11T09:00:00", assignedTo: "Maintenance Team" },
  { id: "C002", studentId: "S003", studentName: "Rahul Verma", roomNumber: "103", category: "food", title: "Poor quality food in mess", description: "The food quality has deteriorated significantly in the past week. Vegetables are not fresh.", status: "open", priority: "high", createdAt: "2025-01-12T08:30:00", updatedAt: "2025-01-12T08:30:00" },
  { id: "C003", studentId: "S002", studentName: "Priya Patel", roomNumber: "102", category: "noise", title: "Loud noise from adjacent room", description: "Room 103 occupant plays loud music late at night, disturbing sleep.", status: "resolved", priority: "medium", createdAt: "2025-01-05T22:00:00", updatedAt: "2025-01-07T10:00:00", resolvedAt: "2025-01-07T10:00:00" },
  { id: "C004", studentId: "S004", studentName: "Sneha Roy", roomNumber: "104", category: "security", title: "Main gate security concern", description: "The main gate security is not checking IDs properly, unknown persons are entering the premises.", status: "open", priority: "urgent", createdAt: "2025-01-13T14:00:00", updatedAt: "2025-01-13T14:00:00" },
  { id: "C005", studentId: "S005", studentName: "Amit Singh", roomNumber: "105", category: "cleanliness", title: "Hallway not cleaned regularly", description: "The hallway on floor 1 is not being cleaned daily. There is dust and litter.", status: "closed", priority: "low", createdAt: "2024-12-28T11:00:00", updatedAt: "2025-01-02T15:00:00", resolvedAt: "2025-01-02T15:00:00" },
];

export const mockAttendance: Attendance[] = [
  { id: "A001", studentId: "S001", studentName: "Arjun Sharma", date: "2025-01-15", checkIn: "22:30", checkOut: "08:00", status: "present" },
  { id: "A002", studentId: "S002", studentName: "Priya Patel", date: "2025-01-15", checkIn: "21:45", checkOut: "08:30", status: "present" },
  { id: "A003", studentId: "S003", studentName: "Rahul Verma", date: "2025-01-15", status: "absent" },
  { id: "A004", studentId: "S004", studentName: "Sneha Roy", date: "2025-01-15", checkIn: "00:30", status: "late" },
  { id: "A005", studentId: "S005", studentName: "Amit Singh", date: "2025-01-15", status: "leave" },
];

export const mockNotifications: Notification[] = [
  { id: "N001", title: "Fee Reminder", message: "February rent is due by 5th Feb. Please pay on time to avoid late fees.", type: "warning", target: "all", createdAt: "2025-01-25T09:00:00", read: false },
  { id: "N002", title: "Maintenance Work", message: "Water supply will be interrupted on 20th Jan from 10 AM to 2 PM for pipeline maintenance.", type: "info", target: "all", createdAt: "2025-01-18T10:00:00", read: true },
  { id: "N003", title: "Mess Menu Update", message: "Special menu for Republic Day - 26th January. Special lunch will be served.", type: "success", target: "all", createdAt: "2025-01-22T11:00:00", read: false },
];
