import React from 'react'

const Layout = ({children}) => {
  return (
    <section className="bg-body md:py-16 h-full relative">
    {/* main chat section */}
    <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
      {/* component */}
      <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[660px] overflow-hidden">
      <div className="relative flex flex-col justify-center h-full overflow-hidden">
        {children}
        </div>
        </div>
        </div>
              {/* aside section */}
      {/* <aside className="hidden md:block absolute right-[30rem] bottom-40 h-[300px] w-[264px] bg-white rounded-xl px-2 py-3">
        <div className="pt-4 mb-16">
          <p className="text-2xl">Visit my website</p>
          <img
            className="mx-auto h-[100pxx] w-[95px] mt-4"
            src={website}
            alt="website"
          />
        </div>
        <a
          href="#"
          className="bg-[#3E8A5F] text-white rounded-md py-3 relative block w-full"
        >
          Go to my vegan coach
        </a>
      </aside> */}
        </section>
  )
}

export default Layout