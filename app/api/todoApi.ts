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
      alert(error.response.data.message);
    });
}

export async function deleteTodo(activeCard: null, status: any) {
  await axios
    .put(`${backendUrl}/todo/deleteTodo/${activeCard}`, status, {
      headers: { todo: localStorage.getItem("token") },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}
