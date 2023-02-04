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
        </section>
  )
}

export default Layout