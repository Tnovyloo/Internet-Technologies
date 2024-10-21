import React from "react"
import Icon from "./icon"
import Card from "./card"
import { useEffect, useState } from "react"


export default function Column({children, data, title, shadowClass}) {
  // Children of Card component only uses

  const icons = React.Children.toArray(children).filter(
    (child) => child.type === Icon // Get all Icon compononents
  )

  useEffect(() => {
    console.log(`${title} Column data: `, data)

  }, [])
  

  return(
    <div className="">
      <div className={`flex flex-row justify-between mb-4 w-11/12 md:w-10/12 mx-auto`}>
        <p className={`text-[22px] md:text-[26px] text-black font-[500] text-left w-full select-none`}>{title}</p>
        <div className={`my-auto`}>
          {/* <svg className={`stroke-gray-200`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> */}

          {icons}
        </div>
      </div>
      
      <div className="bg-black flex flex-col gap-y-4">
        { data && data !== undefined ? (
            data.map((cardData, index) => {
              return (<Card shadowClass={shadowClass} cardData={cardData} key={index}/>)
            })
        ) : (
          <div>xD</div>
        ) }
      </div>

    </div>
  )
}