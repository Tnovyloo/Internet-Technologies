import Image from "next/image";
import Card from "./components/card";
import Head from "next/head";
import Icon from "./components/icon";
import TasksComponent from "./components/tasksComponent";

// User page
export default async function Home() {
  const data = await fetch('http://localhost:5000/tasks', {method: "GET"})
    .then(res => res.json())
    .catch(err => console.log(err));


  console.log(data, Date.now().toLocaleString())

  return (
    <div>
      <TasksComponent initialData={data}/>
    </div>  
  );
}
