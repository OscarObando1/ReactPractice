// Demo/mock data for the showcase. In a real app this would come from an API.

export const USER = {
  name: "Marta_st",
  email: "marta_12334@gmail.com",
  avatar: "https://i.pravatar.cc/120?img=47",
};

export const PROFILE = {
  firstName: "Marta",
  lastName: "Black",
  userName: "Marta_st",
  dateOfBirth: "01.01.2001",
  address: "123 Main Street, Boston, MA 02108, United States",
  email: "marta_12334@gmail.com",
  avatar: "https://i.pravatar.cc/160?img=47",
  active: true,
};

export const TRAININGS = [
  { id: 1, date: "01.01.2023", name: "JavaScript Course", type: "Webinar", student: "Marta Black", duration: "10 d" },
  { id: 2, date: "11.01.2023", name: "Course 2", type: "Webinar", student: "Student 1", duration: "10 d" },
  { id: 3, date: "13.01.2023", name: "Course 3", type: "Webinar", student: "Student 2", duration: "2 d" },
  { id: 4, date: "18.01.2023", name: "Course 4", type: "Course", student: "Student 3", duration: "5 d" },
];

export const TABLE_COLUMNS = [
  { key: "date", header: "Date" },
  { key: "name", header: "Training name" },
  {
    key: "type",
    header: "Type",
    render: (row) => <span className="table__badge">{row.type}</span>,
  },
  { key: "student", header: "Student name" },
  { key: "duration", header: "Duration" },
];
