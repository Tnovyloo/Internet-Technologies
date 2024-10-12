

export default function Card(props) {

  return(
    <div className="">
      <div className={`flex flex-row justify-between mb-4`}>
        <p className={`text-[22px] md:text-[26px] text-black font-[500] text-left w-full`}>{props.title}</p>
        <div className={`my-auto mr-5`}>
          <svg className={`stroke-gray-200`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className={`bg-white rounded-[34px] w-full flex flex-col justify-between`}>
        {/* Content */}

        {/* Head of card with name tag */}
        <div className={`flex flex-row mt-[20px] mx-[20px] justify-between skeleton-50`}>
          <div className={`rounded-[14px] bg-accentColor-100 border-accentColor-200 border-[2px]`}>
            <p className={`px-[15px] py-[3px] text-accentColor-400`}>Hello</p>
          </div>
          <div className={`my-auto mr-2`}>
            <svg className={`stroke-gray-200`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className={`h-11/12 min-h-[100px] bg-neutralGray-200/10 mt-[15px] mx-[13px] rounded-[21px] mb-[1.5em] skeleton`}>
          <p className={`text-[18px] md:text-[20px] w-11/12 mx-auto mt-[0.75em] mb-[0.75em]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum congue risus at dignissim. Proin vitae massa dapibus, porttitor purus non, auctor nisl. In euismod,</p>
        </div>

        {/* Footer of card */}
        <div className={`mx-[13px] mb-[13px]`}>
          <svg className={`stroke-gray-200`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </div>
      </div>
    </div>
  )
}