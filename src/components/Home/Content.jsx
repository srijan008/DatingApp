import React from 'react'

const Content = ({reverse,img,title,desc}) => {
  return (
    <div className={`my-4 w-full pt-16 flex flex-col ${ reverse ? "md:flex-row-reverse" : "md:flex-row"
    } items-center justify-center gap-5 md:gap-40`}>
      <div className='w-fit'>
      <img src={img} alt="img" className='md:h-[500px] h-[250px]' />
      </div>
      <div className='md:w-1/3 px-3'>
        <h1 className="text-3xl font-bold text-center md:text-left">{title}</h1>
        <p className="text-center text-lg md:text-left">{desc}</p>
      </div>
    </div>
  )
}

export default Content
