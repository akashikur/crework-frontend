import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createTodo(formData: {
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
}) {
  axios
    .post(`${backendUrl}/todo/createTodo`, formData, {
      headers: { todo: localStorage.getItem("token") },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        // Safely access the error response
        alert(error.response.data.message || "An error occurred");
      } else {
        // Handle unknown error
        alert("An unknown error occurred");
      }
    });
}

export async function deleteTodo(id: any) {
  await axios
    .delete(`${backendUrl}/todo/deleteTodo/${id}`, {
      headers: { todo: localStorage.getItem("token") },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "An error occurred");
      } else {
        alert("An unknown error occurred");
      }
    });
}
