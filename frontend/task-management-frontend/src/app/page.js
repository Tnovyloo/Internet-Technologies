"use client"

import Image from "next/image";
import Card from "./components/card";
import Head from "next/head";
import Icon from "./components/icon";
import { useEffect, useState } from "react";

export default function Home() {

  const [Hello, setHello] = useState('')

  useEffect(() => {
    console.log('Hello')

    setHello("yup")

    console.log(Hello)
  
    return () => {
      // second
    }
  }, [])
  

  return (
    <div className="bg-neutralGray-300/50 min-h-[1200px]">
      <Head>
        <title>Menadżer zadań</title>
        <meta property="og:title" content="Menadżer zadań na twoją miarę"/>
      </Head>

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

      <div className="w-11/12 h-full mx-auto">
        {/* Head text */}
        <div className={`w-full`}>
          <p className={`pt-6 pb-8 text-[26px] md:text-[30px] text-black font-[500]`}>Strona główna</p>
        </div>
      </div>

      <div className={`w-11/12 grid overflow-auto grid-cols-1 md:grid-cols-4 mx-auto gap-x-2 gap-y-5 skeleton-75 pb-10`}>

        {/* Columns */}
        {/* TODO fetch it from backend and send proper card data to show it to user. */}
        <Card title={`TODO`} shadowClass={'geometric-shadow-red'}>
          <Icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Icon>
        </Card>


        <Card title={`W trakcie`} shadowClass={`geometric-shadow-gray`}>
          <Icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 17L22 12L17 7M7 7L2 12L7 17M14 3L10 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Icon>
        </Card>


        <Card title={`Review`} shadowClass={`geometric-shadow-gray`}>
          <Icon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M16 18L18 20L22 16M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Icon>

        </Card>

        <Card title={`Zakończone`} data={null} shadowClass={`geometric-shadow-green`}>
          <Icon key={'svg'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Icon>

          <div key={'div'}>
            Helllllo
          </div>
        </Card>

      </div>
      
    </div>
  );
}
