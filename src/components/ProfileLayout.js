import React from 'react'

const ProfileLayout = ({children}) => {
  return (
    <section className="bg-body p-4 md:p-0 md:py-16 relative">
    {/* main chat section */}
    <div className="xl:w-[860px] h-full bg-white mx-auto rounded-xl flex flex-col">
      <div className="h-[180px] bg-green-800 " />
      {children}
    </div>
    </section>
  )
}

export default ProfileLayout