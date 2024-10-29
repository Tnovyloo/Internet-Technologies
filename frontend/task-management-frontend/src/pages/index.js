import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";
import Column from "@/components/column";
import Icon from "@/components/icon";
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();
  
  
  const handleRedirect = (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const sessionKey = formData.get('sessionKey');

    if (username && sessionKey) {
      // Redirect with query parameters
      router.push({
        pathname: '/tasks',
        query: { username, sessionKey },
      });
    } else {
      // Optionally handle cases where form validation fails
      alert('All fields are required!');
    }
  };


  return (
    <div className="bg-neutralGray-300/50 min-h-[1200px]">
      <div className="flex w-full flex-wrap">
        <div className="flex-grow w-8 h-8 bg-accentColor-400 rounded-bl-[28px]"/>
        <div className="flex-grow w-8 h-8 bg-accentColor-300"/>
        <div className="flex-grow w-8 h-8 bg-accentColor-200"/>
        <div className="flex-grow w-8 h-8 bg-accentColor-100"/> 
        <div className="flex-grow w-8 h-8 bg-base-100"/>
        <div className="flex-grow w-8 h-8 bg-base-200"/>
        <div className="flex-grow w-8 h-8 bg-base"/>
        <div className="flex-grow w-8 h-8 bg-base-300"/>
        <div className="flex-grow w-8 h-8 bg-base-400 rounded-br-[28px]"/>
      </div>

      <div className="flex flex-col justify-center">
        <div className="w-11/12 lg:w-6/12 mx-auto flex flex-col gap-3">
          <p className={`pt-6 pb-8 text-[26px] md:text-[30px] text-black font-[500] text-center`}>Zespołowy Task Manager</p>
          <form onSubmit={handleRedirect} className="w-full h-full flex flex-col gap-3 mx-auto form-div">
            <input type="text" className="form-input" required={true} placeholder="username" name="username"/>
            <input type="text" className="form-input" required={true} placeholder="unique code" name="sessionKey"/>
            <button type="submit" className="w-1/2 py-2 mx-auto border-black border-2 bg-slate-400">Go to session</button>
          </form>
        </div>
      </div>

    </div>
  );
}
