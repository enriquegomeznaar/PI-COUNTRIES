import axios from "axios";
export async function postActivity(data) {
  const response = await axios.post("http://www.localhost:3001/activities",data);
  if (response.status == 200) return "Created";
  else console.log("error");
}
