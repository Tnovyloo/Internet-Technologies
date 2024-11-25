import React from "react"
import Icon from "./icon"
import Card from "./card"
import { useEffect, useState } from "react"
import { Draggable } from "react-beautiful-dnd"


export default function Column({children, data, title, shadowClass, onClick}) {
  // Children of Card component only uses

  const icons = React.Children.toArray(children).filter(
    (child) => child.type === Icon // Get all Icon compononents
  )

  useEffect(() => {
    console.log(`${title} Column data: `, data)
  }, [])
  

  return(
    <div className="">
      <div className="flex flex-col gap-y-4 min-h-[300px]">
        { data && data !== undefined ? (
            // data.map((cardData, index) => {
            //   return (<Card shadowClass={shadowClass} cardData={cardData} key={index}/>)
            // })
          data.map((cardData, index) => {
            return (
              <Draggable key={cardData.id} draggableId={`${cardData.id}`} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card shadowClass={shadowClass} cardData={cardData} onClick={onClick}/>
                    </div>
                  )
                }}
              </Draggable>
            )
          })

        ) : (
          <div className="w-[300px] h-[600px]"></div>
        ) }
      </div>

    </div>
  )
}
