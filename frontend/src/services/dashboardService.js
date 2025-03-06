import axios from "axios";

const API_URL = `http://localhost:3000/api`; // Base API URL

// ✅ Helper function to get authentication headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored
    "Content-Type": "application/json",
  },
});

// ✅ Fetch dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard-stats`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching dashboard stats:", error);
    throw error;
  }
};

// ✅ Fetch students list
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/students`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return [];
  }
};

// ✅ Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/students`, studentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error adding student:", error);
    throw error;
  }
};

// ✅ Update student details
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/students/${id}`, studentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error updating student:", error);
    throw error;
  }
};

export const updateStudentDetails = async (formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/update`,
      formData,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating student profile:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/students/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting student:", error);
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/room`); // ✅ Correct API endpoint
    const data = await response.json();
    console.log("✅ Room Data Fetched:", data); // DEBUGGING
    return data;
  } catch (error) {
    console.error("❌ Error fetching rooms:", error);
    return [];
  }
};

export const assignStudentToRoom = async (roomId, rollNo) => {
  try {
    const response = await fetch(`${API_URL}/room/assign`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollNo, roomId }),
    });

    const data = await response.json();
    console.log("✅ Student Assigned:", data); // DEBUGGING
    return data;
  } catch (error) {
    console.error("❌ Error assigning student:", error);
  }
};


// ✅ Remove a student from a room
export const removeStudentFromRoom = async (roomId, studentRollNo) => {
  try {
    const response = await axios.put(
      `${API_URL}/room/remove`,
      { roomId, rollNo: studentRollNo },  // Send correct payload
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error removing student from room:", error);
    throw error;
  }
};

// ✅ Create Stripe Checkout Session (Updated for INR Payments)
export const createStripeCheckoutSession = async (rollNo, amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/payments/create-checkout-session`,
      { rollNo, amount }, // Send INR amount
      getAuthHeaders()
    );

    if (response.data?.url) {
      window.location.href = response.data.url; // Redirect to Stripe checkout
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error creating Stripe checkout session:", error.response?.data || error.message);
    return { success: false };
  }
};

// ✅ Fetch student payments
export const getStudentPayments = async (rollNo) => {
  try {
    const response = await axios.get(`${API_URL}/payments/student/${rollNo}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching student payments:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch all payments
export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_URL}/payments`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching payments:", error);
    return [];
  }
};

// ✅ Pay student fees manually
export const payStudentFees = async (rollNo, amount, paymentMethod) => {
  try {
    const response = await fetch(`http://localhost:3000/api/payments/pay`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rollNo, amount, paymentMethod }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Payment API Error:", error);
    return { message: "Payment failed due to API error." };
  }
};

export const recordStudentPayment = async (rollNo, amount, paymentMethod, transactionId) => {
  try {
    const response = await fetch(`/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rollNo, amount, paymentMethod, transactionId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error recording payment:", error);
    return { success: false, message: "Payment recording failed" };
  }
};

export const postAnnouncement = async (announcementData) => {
  try {
    const response = await axios.post(`${API_URL}/announcements/create`, announcementData);
    return response.data;
  } catch (error) {
    console.error("Error posting announcement:", error);
    throw error;
  }
};

// ✅ Fetch announcements
export const getAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_URL}/announcements`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching announcements:", error);
    return [];
  }
};

export const fetchStudentData = async (rollNo) => {
  try {
    const response = await fetch(`/student/dashboard/${rollNo}`);
    if (!response.ok) throw new Error("Failed to fetch student data");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchStudentData:", error);
    throw error;
  }
};


export const getStudentDashboardData = async (rollNo) => {
  try {
    const response = await axios.get(`${API_URL}/students/dashboard/${rollNo}`, getAuthHeaders());
    
    const totalFees = response.data.totalFees ?? 0; // ✅ Default to ₹0 (not ₹80,000)
    const paidAmount = response.data.paidAmount ?? 0; // ✅ Ensure paid amount is not null
    const pendingFees = Math.max(totalFees - paidAmount, 0); // ✅ Avoid negative values

    return {
      ...response.data,
      totalFees,
      pendingFees,
    };
  } catch (error) {
    console.error("❌ Error fetching student dashboard data:", error.response?.data || error.message);
    throw error;
  }
};

export const applyLeave = async (rollNo, leaveData) => {
  try {
    const response = await axios.post(`${API_URL}/leave/apply`,leaveData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error applying for leave:", error.response?.data || error.message);
    throw error;
  }
};

export const submitComplaint = async (title, description) => {
  try {
    const response = await axios.post(
      `${API_URL}/complaints/file`,  // ✅ Correct API endpoint
      { title, description },         // ✅ Sending correct fields
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("❌ API Error submitting complaint:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ Get Student's Complaints
export const getMyComplaints = async () => {
  try {
    const response = await axios.get(`${API_URL}/complaints/my-complaints`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching complaints:", error);
    return [];
  }
};

// ✅ Fetch complaints
export const getComplaints = async () => {
  try {
    const response = await axios.get(`${API_URL}/complaints`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return [];
  }
};

// ✅ Get Student's Leave Requests
export const getMyLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leave/my-leaves`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching leave requests:", error);
    return [];
  }
};

// ✅ Fetch leave requests
export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leave`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return [];
  }
};

// ✅ Update Complaint Status (Warden Only)
export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/complaints/${complaintId}/status`,
      { status }, 
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating complaint status:", error);
    throw error;
  }
};

// ✅ Update Leave Request Status (Warden Only)
export const updateLeaveStatus = async (leaveId, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/leave/${leaveId}/status`,
      { status }, 
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating leave status:", error);
    throw error;
  }
};
