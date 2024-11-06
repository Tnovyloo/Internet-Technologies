import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";
import Column from "@/components/column";
import ColumnHeader from "@/components/columnHeader";
import Icon from "@/components/icon";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";

export const getServerSideProps = (async (context) => {

  const aggregateByStatus = (data) => {
    return data.reduce((acc, item) => {
      const { status } = item;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(item);

      // Sort items
      acc[status].sort((a, b) => (a.columnIndex || 0) - (b.columnIndex || 0));
      return acc;
    }, {});
  };

  const { query } = context;
  const { sessionKey } = query
  console.log(sessionKey)

  try {
    const res = await fetch('http://backend:5000/tasks', { method: "GET", headers: {'x-session-key': sessionKey}})
    let data = await res.json();
    data = aggregateByStatus(data)
    console.log(data)
  
    return {
      props: {
        data, // Pass the fetched data to the component as a prop
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: "Error occured while trying to fetch data."
      }
    }
  }

})

export default function Home({ data }) {
  const [showPanel, setShowPanel] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [columns, setColumns] = useState({
    todo: {
      name: "TODO",
      items: data?.todo
    },
    inProgress: {
      name: "W trakcie",
      items: data?.inProgress
    },
    review: {
      name: "Review",
      items: data?.review
    },
    ended: {
      name: "Zakończone",
      items: data?.ended
    }
  });

  useEffect(() => {
    console.log("Lets render!")
    setIsReady(true);
  }, [])

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...(sourceColumn?.items || [])];
      const destItems = [...(destColumn?.items || [])];
      const [removed] = sourceItems.splice(source.index, 1);

      const movedItemId = result.draggableId
      const movedItemColumnDestination = destination.droppableId

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

      console.log(result, movedItemId)
      try {
        axios.put(`localhost:5000/tasks/${movedItemID}`, data={
          columnIndex: destination.index,
          status: destination.droppableId
        });
        console.log("Put request worked fine")
      } catch (error) {
        console.log(error)
      }

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  
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
        <div className={`w-full flex justify-between`}>
          <p className={`pt-6 pb-8 text-[26px] md:text-[30px] text-black font-[500]`}>Strona główna</p>
          <div className="my-auto">
            <Icon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13.5V7.5M9 10.5H15M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Icon>
          </div>
        </div>
      </div>
      { isReady && (

        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        
          <div className={`w-11/12 grid overflow-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-auto gap-x-2 gap-y-5 skeleton-75 pb-10`}>
            {/* Columns */}
            {/* TODO fetch it from backend and send proper card data to show it to user. */}
            <Droppable droppableId="todo" key="todo">
            {(provided, snapshot) => {
                return (
                  <div>
                    <ColumnHeader title={"TODO"}>
                        <Icon>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Icon>
                    </ColumnHeader>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`${ snapshot.isDraggingOver && "bg-slate-200"} transition duration-200 rounded-[28px]`}
                    >

                      <Column title={`TODO`} data={columns.todo.items && columns.todo.items} shadowClass={'geometric-shadow-red'}>
                        <Icon>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Icon>
                      </Column>

                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}

            </Droppable>


            <Droppable droppableId="inProgress" key="inProgress">
            {(provided, snapshot) => {
                return (
                  <div>
                    <ColumnHeader title={`W trakcie`}>
                        <Icon>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17L22 12L17 7M7 7L2 12L7 17M14 3L10 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Icon>
                    </ColumnHeader>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`${ snapshot.isDraggingOver && "bg-slate-200"} transition duration-200 rounded-[28px]`}
                    >
                      <Column title={`W trakcie`} data={columns?.inProgress.items && columns?.inProgress.items} shadowClass={`geometric-shadow-gray`}>
                        
                      </Column>

                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}

            </Droppable>

            <Droppable droppableId="review" key="review">
            {(provided, snapshot) => {
                return (
                  <div>
                    <ColumnHeader title={`Review`}>
                        <Icon>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M16 18L18 20L22 16M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Icon>
                    </ColumnHeader>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`${ snapshot.isDraggingOver && "bg-slate-200"} transition duration-200 rounded-[28px]`}
                    >
                      <Column title={`Review`} data={columns?.review.items && columns?.review.items} shadowClass={`geometric-shadow-gray`}>

                      </Column>

                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}

            </Droppable>


            <Droppable droppableId="ended" key="ended">
            {(provided, snapshot) => {
                return (
                  <div>
                    <ColumnHeader title={'Zakończone'}>
                        <Icon key={'svg'}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Icon>
                    </ColumnHeader>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`${ snapshot.isDraggingOver && "bg-slate-200"} transition duration-200 rounded-[28px]`}
                    >
                      <Column title={`Zakończone`} data={columns?.ended.items && columns?.ended.items} shadowClass={`geometric-shadow-green`}>
                        
                        <div key={'div'}>
                          Helllllo
                        </div>
                      </Column>

                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}

            </Droppable>
            

          </div>

        </DragDropContext>
      )}
      
    </div>
  );
}
